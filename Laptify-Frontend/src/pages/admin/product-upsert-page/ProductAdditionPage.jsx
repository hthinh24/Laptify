import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import ProductInfo from './ProductInfo.jsx';
import CategoryTable from './CategoryTable.jsx';
import { categories, brands } from '@/data/mockProducts.js';
import { createProduct } from '@/services/productApi.js';
import { uploadImage, generateFilePath } from '@/services/mediaApi.js';
import { getErrorMessage } from '@/lib/axiosClient.js';
import { toast } from 'sonner';

const ProductAdditionPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
    categoryId: '',
    description: '',
  });

  const [variants, setVariants] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVariantAdd = (variantData) => {
    console.log(variantData)
    setVariants((prev) => [...prev, { ...variantData, id: Date.now()}]);
  };

  const handleVariantEdit = (updatedVariant) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === updatedVariant.id ? updatedVariant : v))
    );
  };

  const handleVariantDelete = (variantId) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  const uploadSingleImage = async (imageData) => {
    if (imageData.src?.startsWith('data:')) {
      const res = await fetch(imageData.src);
      const blob = await res.blob();

      const file = new File([blob], imageData.name || 'image.jpg', {
        type: blob.type,
      });

      const filePath = generateFilePath(file);
      const uploadRes = (await uploadImage(file, filePath)).data;
      console.log(uploadRes);
      return {
        url: uploadRes.url,
        publicId: uploadRes.publicId,
        width: uploadRes.width,
        height: uploadRes.height,
        format: uploadRes.format,
      };
    }

    if (imageData.url) return imageData;

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skus = await Promise.all(
        variants.map(async (variant) => {
          const images = await Promise.all(
            (variant.images || []).map(uploadSingleImage)
          );

          return {
            color: variant.color,
            price: variant.price,
            stockQuantity: variant.quantity,
            images: images.filter(Boolean),
          };
        })
      );

      const payload = {
        name: formData.name,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        brandId: Number(formData.brandId),
        skus,
      };
    
      console.log(payload);

      const res = (await createProduct(payload)).data.data;
      
      toast.success('Tạo sản phẩm thành công');
      navigate(`/admin/product-updating/${res.productId}`);
    } catch (e) {
      toast.error(getErrorMessage(e));
      console.error(e);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div>
      {/* Header */}
      <div className='flex items-center gap-4 mb-6'>
        <button
          onClick={handleCancel}
          className='p-2 hover:bg-gray-100 rounded-md transition'
          title='Quay lại'
        >
          <ChevronLeft size={24} className='text-gray-700' />
        </button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Quản lý sản phẩm</h1>
          <p className='text-gray-500 text-sm'>Thêm sản phẩm</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Product Info Section */}
        <ProductInfo
          mode='addition'
          formData={formData}
          onInputChange={handleInputChange}
          categories={categories}
          brands={brands}
        />

        {/* Category Table Section */}
        <CategoryTable
          variants={variants}
          onAddVariant={handleVariantAdd}
          onEdit={handleVariantEdit}
          onDelete={handleVariantDelete}
        />

        {/* Action Buttons */}
        <div className='flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium'
          >
            Làm mới
          </button>
          <button
            type='submit'
            className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdditionPage;
