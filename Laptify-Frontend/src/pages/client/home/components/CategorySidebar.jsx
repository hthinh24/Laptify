import React from "react";
import { Link } from "react-router-dom";
import { searchBrands } from "@/data/mockSearchProducts";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const CategorySidebar = () => {
  const containerRef = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-slide-up",
  });

  return (
    <div ref={containerRef} className="w-48 opacity-0">
      <ul className="space-y-0">
        {searchBrands.map((category, index) => (
          <li key={category.id} className={`animate-stagger-${(index % 5) + 1}`}>
            <Link
              to={`/products/search?category=${category.value}`}
              className="block text-gray-900 hover:text-red-600 transition-colors py-2 text-base hover:scale-105 inline-block"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
