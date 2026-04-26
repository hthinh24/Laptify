import { login } from "@/services/authApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth/authService.js";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = (await login(data)).data.data;
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Đăng ký thất bại");
    }
  },
);
