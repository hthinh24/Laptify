import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/feature/store.js";
import { router } from "@/router/router.jsx";
import { logout, isTokenValid } from "@/feature/auth/authSlice";
import { Toaster } from "sonner";

function AppContent() {
  const dispatch = useDispatch();
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      if (!isTokenValid(accessToken)) {
        dispatch(logout());
        return;
      }

      const interval = setInterval(() => {
        if (!isTokenValid(accessToken)) {
          dispatch(logout());
          alert("Phiên đăng nhập đã hết hạn!");
          clearInterval(interval);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [accessToken, isAuthenticated, dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <div className=''>
      {/* <Toaster  /> */}
      <Provider store={store}>
        <Toaster richColors />
        <AppContent />
      </Provider>
    </div>
  );
}

export default App;
