import React from 'react';

const LoadingSpinner = ({ className = '' , description}) => {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <div
        className={`w-6 h-6 animate-spin rounded-full border-b-2 border-blue-600 `}
      />
      <p className='text-center'>{description}</p>
    </div>
  );
};

export default LoadingSpinner;
