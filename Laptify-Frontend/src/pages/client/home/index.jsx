import React from "react";
import { Link } from "react-router-dom";
import CategorySidebar from "./components/CategorySidebar";
import FeaturedShowcase from "./components/FeaturedShowcase";
import BestSellingSection from "./components/BestSellingSection";
import KeyboardShowcase from "./components/KeyboardShowcase";
import TrendingProductsSection from "./components/TrendingProductsSection";
import BenefitsSection from "./components/BenefitsSection";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const HomePage = () => {
  const heroBrandRef = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  const heroTitleRef = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  const heroCTARef = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  const heroImageRef = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-slide-in-right",
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section 1: Hero + Category Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Category Sidebar */}
          <CategorySidebar />

          {/* Hero Banner - ASUS ROG Promo */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden flex items-center justify-between h-full relative hover:shadow-2xl transition-shadow duration-300">
              {/* Left Content */}
              <div className="z-10 text-white flex-1 p-8 md:p-12">
                {/* Brand Header: Logo + Text */}
                <div
                  ref={heroBrandRef}
                  className="flex items-center gap-3 mb-4 opacity-0 opacity-90 hover:opacity-100 transition-opacity"
                >
                  {/* Logo Container */}
                  <img
                    src="/src/assets/rog-strix-logo.png"
                    alt="ROG Logo"
                    className="w-8 h-8 object-contain"
                  />
                  {/* Brand Text */}
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    ASUS Rog Strix Scar
                  </span>
                </div>

                {/* Main Headline */}
                <h2
                  ref={heroTitleRef}
                  className="text-4xl md:text-5xl font-bold mb-6 leading-tight opacity-0"
                >
                  Voucher giảm
                  <br />
                  đến 10%
                </h2>

                {/* CTA Button */}
                <Link
                  ref={heroCTARef}
                  to="/products/search"
                  className="inline-flex items-center text-white font-semibold text-base hover:text-red-500 transition-all duration-300 hover:scale-110 opacity-0 group"
                >
                  Mua ngay
                  <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Right Image Container */}
              <div
                ref={heroImageRef}
                className="hidden md:block relative flex-1 h-full opacity-0"
              >
                <img
                  src="/src/assets/asus-rog-strix.png"
                  alt="ASUS ROG Strix Scar"
                  className="absolute -right-21 top-1/2 -translate-y-1/2 h-[120%] w-auto max-w-none object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Featured Showcase */}
        <FeaturedShowcase />

        {/* Section 3: Best Selling Products */}
        <BestSellingSection />

        {/* Section 4: Keyboard Showcase */}
        <KeyboardShowcase />

        {/* Section 5: Trending/Random Products */}
        <TrendingProductsSection />

        {/* Section 6: Benefits */}
        <BenefitsSection />
      </div>
    </div>
  );
};

export default HomePage;
