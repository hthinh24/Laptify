import { axiosClient } from "@/lib/axiosClient.js";

export const authService = {
  register: async (userData) => {
    try {
      const response = await axiosClient.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosClient.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  },

  logout: async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đăng xuất thất bại");
    }
  },
};
