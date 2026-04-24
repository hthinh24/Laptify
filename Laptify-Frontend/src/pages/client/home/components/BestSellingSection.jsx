import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/pages/common/product/ProductCard";
import { mockSearchProducts } from "@/data/mockSearchProducts";
import { getRandomProducts } from "../utils/homePageUtils";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const BestSellingSection = () => {
  // Get 4 random products for best-selling
  const bestSellingProducts = getRandomProducts(mockSearchProducts, 4);

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

  return (
    <div className="mb-12">
      {/* Header with section title and View All button */}
      <div
        ref={headerRef}
        className="flex items-center justify-between mb-6 opacity-0"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-8 bg-red-600 rounded"></div>
            <span className="text-red-600 font-semibold text-sm">
              Trong tháng này
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sản phẩm bán nhiều nhất
          </h2>
        </div>
        <Link
          to="/products"
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Products Grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0"
      >
        {bestSellingProducts.map((product, index) => (
          <div
            key={product.id}
            className={`animate-stagger-${(index % 5) + 1}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingSection;
