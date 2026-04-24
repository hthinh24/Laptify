import React from "react";
import { Truck, Headphones, Shield } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const BenefitCard = ({ benefit, index }) => {
  const Icon = benefit.icon;

  const cardRef = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
    animationClass: `animate-stagger-${(index % 5) + 1}`,
  });

  return (
    <div
      ref={cardRef}
      className="group text-center p-8 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md opacity-0"
    >
      {/* Icon Container */}
      <div className="flex justify-center mb-6">
        {/* Đã xóa group-hover:bg-red-600, chỉ giữ lại group-hover:scale-110 */}
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      {/* Đã xóa group-hover:text-red-600 để giữ nguyên màu text-gray-900 */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 transition-colors duration-300">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
        {benefit.description}
      </p>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển cho những đơn hàng trên 1.500.000đ",
    },
    {
      icon: Headphones,
      title: "Chăm sóc khách hàng 24/7",
      description:
        "Hỗ trợ chăm sóc khách hàng hàng thân thiện và trực tuyến 24/7",
    },
    {
      icon: Shield,
      title: "Cam kết hoàn tiền",
      description: "Hoàn tiền trong vòng 30 ngày",
    },
  ];

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, idx) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
