import CustomInput from '@/components/custom/CustomInput.jsx';

export default function CustomerInfoSection({
  formData,
  handleChange,
  handleCheckboxChange,
  errors = {},
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Thông tin giao hàng
      </h2>

      <div className='grid grid-cols-2 gap-4 mb-4'>
        {/* Name */}
        <CustomInput
          label='Họ và tên*'
          placeholder='Nhập họ và tên'
          value={formData.customerName || ''}
          onChange={(e) => handleChange('customerName', e.target.value)}
          error={errors.customerName}
        />

        {/* Email */}
        <CustomInput
          label='Email*'
          placeholder='Nhập email'
          type='email'
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />

        {/* Specific Address */}
        <CustomInput
          label='Địa chỉ cụ thể*'
          placeholder='Nhập địa chỉ'
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          error={errors.address}
        />

        {/* Phone Number */}
        <CustomInput
          label='Số điện thoại*'
          placeholder='Nhập số điện thoại'
          value={formData.phoneNumber || ''}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          error={errors.phoneNumber}
        />
      </div>

      {/* Checkbox */}
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='saveInfo'
          checked={formData.isSaved || false}
          onChange={(e) => handleCheckboxChange('isSaved', e.target.checked)}
          className='w-4 h-4 text-red-500 rounded focus:ring-red-500 cursor-pointer'
        />
        <label
          htmlFor='saveInfo'
          className='text-sm text-gray-700 cursor-pointer'
        >
          Lưu thông tin cho lần thanh toán sau
        </label>
      </div>
    </div>
  );
}
