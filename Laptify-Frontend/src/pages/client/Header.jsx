import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import UserMenuDropdown from "./components/UserMenuDropdown";
import MobileMenu from "./components/MobileMenu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(
        `/products/search?keyword=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery("");
    }
  };

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Liên hệ", path: "/contact" },
    { label: "Về chúng tôi", path: "/about" },
    { label: "Đăng ký", path: "/register" },
  ];

  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black py-2 text-center text-sm text-white animate-fade-in">
        <p>
          Ưu đãi hè: Giảm 50% tất cả chuột ASUS & Miễn phí giao hàng hỏi tốc!{" "}
          <Link
            to="/shop"
            className="ml-1 font-semibold underline underline-offset-2 transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            Mua ngay
          </Link>
        </p>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-background z-40 relative">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center rounded-md p-2 text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
            aria-label="Toggle menu"
          >
            <Menu className="size-5 transition-transform duration-300" style={{
              transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }} />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-foreground transition-all duration-200 hover:scale-110">
            Laptify
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-12 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground hover:text-muted-foreground"
                  }`
                }
                children={({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground animate-underline-expand" />
                    )}
                  </>
                )}
              />
            ))}
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Bạn đang tìm kiếm sản phẩm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="h-10 w-64 rounded-md border border-input bg-background px-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-transform duration-200 lg:w-80"
              />
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
            </div>

            {/* Authenticated User - Icons and Menu */}
            {isAuthenticated ? (
              <>
                {/* Wishlist Icon */}
                <Link
                  to="/wish-list"
                  className="flex size-10 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
                  aria-label="Yêu thích"
                >
                  <Heart className="size-5 transition-colors duration-200" />
                </Link>

                {/* Cart Icon */}
                <Link
                  to="/cart"
                  className="flex size-10 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
                  aria-label="Giỏ hàng"
                >
                  <ShoppingCart className="size-5 transition-colors duration-200" />
                </Link>

                {/* User Menu Dropdown */}
                <UserMenuDropdown user={user} />
              </>
            ) : (
              /* Login Button - for unauthenticated users */
              <Link
                to="/login"
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:opacity-80 hover:scale-105"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;
