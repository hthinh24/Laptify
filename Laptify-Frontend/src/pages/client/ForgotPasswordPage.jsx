import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import signUpImage from "@/assets/thumbnail.png";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Validate email
  const validateEmail = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    try {
      // Placeholder for password recovery API call
      // await passwordService.requestPasswordReset({ email });

      setNotification({
        type: "success",
        message:
          "Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.",
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message:
          error.message ||
          "Không thể gửi email khôi phục. Vui lòng thử lại sau.",
      });
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
            {/* Back Button */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại đăng nhập
            </Link>

            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Khôi phục mật khẩu
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập email của bạn để nhận liên kết khôi phục mật khẩu
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
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
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

            {!submitted && (
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
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-red-500 py-2.5 font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang gửi..." : "Gửi liên kết khôi phục"}
                </button>
              </form>
            )}

            {submitted && (
              <div className="text-center space-y-4 py-8">
                <p className="text-sm text-muted-foreground">
                  Vui lòng kiểm tra email của bạn để tiếp tục quy trình khôi phục mật khẩu.
                </p>
                <p className="text-xs text-muted-foreground">
                  Đang chuyển hướng về trang đăng nhập...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
