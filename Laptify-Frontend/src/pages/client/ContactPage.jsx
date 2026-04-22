import React, { useState } from "react";
import { Phone, Mail, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Vietnamese phone number validation
  // Valid prefixes: 03, 02, 07, 09, 06, 05 with 10 total digits
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|02|07|09|06|05)\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Họ và tên chỉ được chứa chữ cái và khoảng trắng";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone =
        "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (03/02/07/09/06/05 theo sau là 8 chữ số)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập thắc mắc của bạn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      // Show success modal
      setShowSuccessModal(true);

      // Auto-close modal after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="text-sm text-muted-foreground font-poppins">
            {/* 2. Thay span bằng Link để có thể click quay về trang chủ */}
            <Link
              to="/"
              className="cursor-pointer hover:text-foreground transition-colors"
            >
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Liên hệ</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section - Contact Info */}
          <div className="space-y-8">
            {/* Call Us Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-white">
                  <Phone className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Gọi cho chúng tôi
                </h3>
              </div>
              <div className="space-y-2 pl-13">
                <p className="text-sm text-muted-foreground">
                  Luôn sẵn sàng hỗ trợ 24/7.
                </p>
                <p className="text-sm font-medium text-foreground">
                  Điện thoại: +84 111 222 333
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Email Us Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-white">
                  <Mail className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Liên hệ qua email
                </h3>
              </div>
              <div className="space-y-2 pl-13">
                <p className="text-sm text-muted-foreground">
                  Điền vào biểu mẫu và chúng tôi sẽ liên hệ lại trong vòng 24
                  giờ.
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Emails: laptify@gmail.com
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Emails: support@laptify.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên*"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-ring"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-input focus:ring-ring"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-input focus:ring-ring"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Thắc mắc của bạn*"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full resize-none rounded-md border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-ring"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-12 py-3 font-medium text-white transition-colors hover:bg-red-600"
                >
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="size-6" />
            </button>

            {/* Content */}
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="size-16 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Gửi tin nhắn thành công!
              </h2>
              <p className="text-sm text-muted-foreground">
                Cảm ơn bạn đã liên hệ với Laptify. Chúng tôi sẽ phản hồi lại
                trong vòng 24 giờ.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-md bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
