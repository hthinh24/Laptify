import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, navItems }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-background shadow-lg animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-input px-4 py-4">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-foreground transition-all duration-200 hover:bg-accent hover:rotate-90"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className="block rounded-md px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent hover:translate-x-1 animate-fade-in"
              onClick={onClose}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
