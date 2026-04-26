import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Trả về true nếu thời gian hết hạn (exp) lớn hơn thời gian hiện tại
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const token = localStorage.getItem("accessToken");
const isValid = isTokenValid(token);

const initialState = {
  isAuthenticated: isValid,
  user: isValid ? getUserFromStorage() : null,
  accessToken: isValid ? token : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login action
    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.loading = false;
      state.error = null;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    // Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    // Update user info
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export { isTokenValid };
export const {
  loginSuccess,
  loginStart,
  loginFailure,
  logout,
  updateUser,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
