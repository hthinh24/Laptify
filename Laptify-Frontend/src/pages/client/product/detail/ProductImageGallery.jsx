import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className='bg-gray-100 rounded-lg h-96 flex items-center justify-center'>
        <p className='text-gray-500'>No images available</p>
      </div>
    );
  }

  const mainImage = images[mainImageIndex];

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Image */}
      <div className='bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden'>
        <img
          src={mainImage.url}
          alt={mainImage.name || 'Product Image'}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className='flex gap-3'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${mainImageIndex === index
                  ? 'border-gray-800'
                  : 'border-gray-200 hover:border-gray-400'
                }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
