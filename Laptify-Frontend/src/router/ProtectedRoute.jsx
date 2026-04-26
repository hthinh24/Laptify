import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Nếu chưa đăng nhập -> Đẩy về trang Login
  // state={{ from: location }} giúp sau khi login xong có thể quay lại trang cũ
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Nếu đã đăng nhập nhưng Role không nằm trong danh sách cho phép
  // Ví dụ: User cố tình gõ /admin
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Đẩy về trang chủ hoặc trang 403
  }

  // 3. Thoả mãn hết thì cho vào
  return children;
};

export default ProtectedRoute;
