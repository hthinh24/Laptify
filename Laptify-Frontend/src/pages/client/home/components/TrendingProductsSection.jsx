import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/pages/common/product/ProductCard";
import { mockSearchProducts } from "@/data/mockSearchProducts";
import { getRandomProducts } from "../utils/homePageUtils";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const TrendingProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Get 8 random products for trending (2 rows x 4 columns)
  const trendingProducts = getRandomProducts(mockSearchProducts, 8);

  // Display all 8 products in 2 rows at once
  const itemsPerRow = 4;
  const pageSize = itemsPerRow * 2; // 8 items per page (2 rows)
  const totalPages = Math.ceil(trendingProducts.length / pageSize);

  const startIdx = currentPage * pageSize;
  const visibleProducts = trendingProducts.slice(startIdx, startIdx + pageSize);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const headerRef = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  const containerRef = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-scale",
  });

  const buttonRef = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  return (
    <div className="mb-12">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between mb-6 opacity-0"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-8 bg-red-600 rounded"></div>
            <span className="text-red-600 font-semibold text-sm">Sản phẩm</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Khám phá</h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid - 2 rows */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 opacity-0"
      >
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className={`animate-stagger-${(index % 5) + 1}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link
          ref={buttonRef}
          to="/products"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 opacity-0"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default TrendingProductsSection;
