import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 1. Request interceptor: Tự động đính kèm Access Token vào Header
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response interceptor: Xử lý làm mới Token khi gặp lỗi 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi 401 (Unauthorized) và chưa từng thử refresh (_retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi endpoint Refresh Token
        // Sử dụng axios bản gốc để tránh bị lặp vô tận (infinite loop) qua interceptor này
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh-token",
          {},
          { withCredentials: true },
        );

        // Backend trả về AuthResponse chứa { accessToken, userSession }
        const { accessToken, user } = response.data;

        // Cập nhật lại Storage
        localStorage.setItem("accessToken", accessToken);
        if (user) {
          // Lưu thành 'user' để khớp với logic các trang khác trong Frontend
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Thay đổi Header Authorization của request cũ và thực hiện lại
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn hoặc lỗi -> Đăng xuất người dùng
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Tránh redirect liên tục nếu đang ở trang login
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Hàm helper để lấy message lỗi từ Backend
 */
export const getErrorMessage = (err, defaultMessage) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};
