import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, maxQuantity, onQuantityChange }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className='p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
      >
        <Minus size={16} className='text-gray-600' />
      </button>
      <input
        type='number'
        value={quantity}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          if (val >= 1 && val <= maxQuantity) {
            onQuantityChange(val);
          }
        }}
        className='w-16 text-center border border-gray-300 rounded py-1 focus:outline-none focus:ring-2 focus:ring-red-500'
      />
      <button
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        className='p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
      >
        <Plus size={16} className='text-gray-600' />
      </button>
    </div>
  );
};

export default QuantitySelector;
