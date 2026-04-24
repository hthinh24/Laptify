import React from "react";
import { Link } from "react-router-dom";
import { Zap, Sliders, Music, Palette } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const KeyboardShowcase = () => {
  const containerRef = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
    animationClass: "animate-fade-in-scale",
  });

  const features = [
    { icon: Zap, label: "Hiệu suất" },
    { icon: Sliders, label: "Tùy chỉnh" },
    { icon: Music, label: "Âm thanh" },
    { icon: Palette, label: "LED RGB" },
  ];

  return (
    <div className="mb-12">
      <div
        ref={containerRef}
        className="bg-black rounded-lg p-8 md:p-12 lg:p-16 flex items-center justify-between overflow-hidden opacity-0 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="text-white flex-1 max-w-md">
          <div className="text-xs font-semibold text-emerald-400 mb-2 tracking-widest">
            Danh mục
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Nâng cấp trải nghiệm gõ phím của bạn
          </h2>

          <div className="flex gap-4 mb-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700 group hover:bg-emerald-500 hover:border-emerald-400 transition-all duration-300 hover:scale-110"
              >
                <feature.icon className="text-emerald-400 group-hover:text-white group-hover:animate-rotate-icon transition-colors" size={20} />
              </div>
            ))}
          </div>

          <Link
            to="/products/search"
            className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 hover:scale-105"
          >
            Mua ngay
          </Link>
        </div>

        {/* Right side - keyboard image */}
        <div className="hidden lg:block flex-1 relative min-h-[300px]">
          <img
            src="/src/assets/magic-keyboard.png"
            alt="Magic Keyboard"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[550px] h-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default KeyboardShowcase;
