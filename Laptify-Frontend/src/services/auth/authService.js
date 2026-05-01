import { axiosClient } from "@/lib/axiosClient.js";

export const authService = {
  register: async (userData) => {
    try {
      const response = await axiosClient.post("/v1/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosClient.post("/v1/auth/login", credentials);

      // Backend trả về field tên là 'user', không phải 'userSession'
      const { accessToken, user } = response.data;

      if (!accessToken || !user) {
        console.error("Cấu trúc trả về từ Backend không khớp!", response.data);
        throw new Error("Dữ liệu phản hồi không hợp lệ");
      }

      return {
        // Map trực tiếp user từ backend vào object trả về cho Redux
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Đảm bảo backend trả về field 'role' chứ không phải 'roleName'
        },
        accessToken: accessToken,
      };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Đăng nhập thất bại";
      throw new Error(errorMsg);
    }
  },

  logout: async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch {
      console.warn(
        "Backend logout failed, but clearing client storage anyway.",
      );
    } finally {
      // Quan trọng nhất là xóa dữ liệu ở Client
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },
};
