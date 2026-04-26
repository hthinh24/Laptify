import { useNavigate, Link } from "react-router-dom";
import { registerThunk } from "@/feature/auth/authThunk";
import { AlertCircle, CheckCircle, Lock } from "lucide-react";
import signUpImage from "@/assets/thumbnail.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Truy cập bị chặn
          </h2>
          <p className="mb-6 text-muted-foreground">
            Bạn đã đăng nhập vào hệ thống Laptify. Vui lòng đăng xuất trước khi
            muốn tạo tài khoản mới hoặc đăng nhập bằng tài khoản khác.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-full rounded-md bg-red-500 py-2.5 font-semibold text-white transition-colors hover:bg-red-600"
            >
              Quay lại trang chủ
            </button>
            <p className="text-xs text-muted-foreground italic">
              Tự động chuyển hướng sau vài giây...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Validate password strength
  const validatePassword = (password) => {
    const rules = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    } else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Họ và tên chỉ được chứa chữ cái và khoảng trắng";
    }

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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const resultAction = await dispatch(
      registerThunk({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    );

    if (registerThunk.fulfilled.match(resultAction)) {
      setNotification({
        type: "success",
        message: "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setNotification({
        type: "error",
        message: resultAction.payload || "Đăng ký thất bại. Vui lòng thử lại.",
      });
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
                Tạo tài khoản
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
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-foreground"
                >
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.fullName && (
                  <span className="text-xs text-red-500">
                    {errors.fullName}
                  </span>
                )}
              </div>

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
                {loading ? "Đang xử lý..." : "Tạo tài khoản"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-foreground hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
