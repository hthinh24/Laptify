import React from 'react';

const ColorVariantSelector = ({ variants, selectedVariant, onVariantChange }) => {
  if (!variants || variants.length === 0 || selectedVariant === null) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3'>
      <label className='font-semibold text-gray-800'>Màu sắc</label>
      <div className='flex gap-3 flex-wrap'>
        {variants.map((variant) => (
          <button
            key={variant.skuCode}
            onClick={() => onVariantChange(variant)}
            className={`px-4 py-2 rounded border-2 text-sm font-medium transition ${selectedVariant.skuCode === variant.skuCode
              ? 'border-gray-800 bg-gray-100 text-gray-800'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
          >
            {variant.color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorVariantSelector;
