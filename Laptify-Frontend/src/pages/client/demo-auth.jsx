import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/feature/auth/authSlice.js";

const DemoLoginPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleDemoLogin = () => {
    dispatch(loginSuccess({
      name: "Demo User",
      email: "demo@example.com"
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">Demo Auth Test</h1>
        
        <div className="rounded-lg border border-input bg-background shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Current Auth State:</h2>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
              {user && (
                <>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-input pt-4 space-y-2">
            {!isAuthenticated ? (
              <button
                onClick={handleDemoLogin}
                className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Demo Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
              >
                Demo Logout
              </button>
            )}
          </div>

          <div className="border-t border-input pt-4 text-sm text-muted-foreground">
            <p>This page tests the Redux auth state. Click the button above to toggle authentication, then check the header to see the state change in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLoginPage;
