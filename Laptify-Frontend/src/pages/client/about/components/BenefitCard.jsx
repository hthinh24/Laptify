import React from "react";

const BenefitCard = ({ benefit }) => {
  const Icon = benefit.icon;

  return (
    <div className="group text-center p-8 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md">
      {/* Icon Container */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
        {benefit.description}
      </p>
    </div>
  );
};

export default BenefitCard;
