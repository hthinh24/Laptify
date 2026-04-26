import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "@/services/auth/authService.js";
import { loginSuccess } from "@/feature/auth/authSlice.js";
import { AlertCircle, CheckCircle } from "lucide-react";
import signUpImage from "@/assets/thumbnail.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Validate password strength

  const validatePassword = (password) => {
    const rules = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      // Đã loại bỏ các dấu gạch chéo ngược không cần thiết
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };

    return {
      isValid: Object.values(rules).every((rule) => rule),
      rules,
    };
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else {
      const validation = validatePassword(formData.password);
      if (!validation.isValid) {
        const missingRules = [];
        if (!validation.rules.minLength) missingRules.push("8 ký tự");
        if (!validation.rules.hasUpperCase) missingRules.push("chữ hoa");
        if (!validation.rules.hasLowerCase) missingRules.push("chữ thường");
        if (!validation.rules.hasNumber) missingRules.push("số");
        if (!validation.rules.hasSpecialChar)
          missingRules.push("ký tự đặc biệt");
        newErrors.password = `Mật khẩu phải chứa: ${missingRules.join(", ")}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setNotification(null); // Clear thông báo cũ trước khi gửi request mới

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Thành công
      dispatch(
        loginSuccess({
          user: response.user,
          accessToken: response.accessToken,
        }),
      );

      setNotification({
        type: "success",
        message: "Đăng nhập thành công! Đang chuyển hướng...",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      // Lấy đúng message "Email hoặc mật khẩu không chính xác" từ Backend
      setNotification({
        type: "error",
        message: error.message,
      });

      // Xóa bớt mật khẩu đã nhập để người dùng nhập lại từ đầu (tăng tính an toàn)
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cyan-100 p-8 max-h-[80vh] self-center rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={signUpImage}
              alt="Shopping cart illustration"
              className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain block"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Đăng nhập vào Laptify
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập thông tin của bạn
              </p>
            </div>

            {/* Notification */}
            {notification && (
              <div
                className={`flex items-center gap-3 rounded-lg p-4 ${
                  notification.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                )}
                <p
                  className={
                    notification.type === "success"
                      ? "text-sm text-green-700"
                      : "text-sm text-red-700"
                  }
                >
                  {notification.message}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-red-500 py-2.5 font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center text-sm">
              <Link
                to="/forgot-password"
                className="font-semibold text-red-500 hover:text-red-600 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-foreground hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
