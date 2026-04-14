import CustomInput from '@/components/custom/CustomInput.jsx';
import CustomSelect from '@/components/custom/CustomSelect.jsx';
import { Button } from '@/components/ui/button.jsx';

export default function OrderFilter({
  filters,
  onFilterChange,
  onSearch,
  onClear,
  orderStatuses = [],
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h3 className='text-lg font-semibold text-red-600 mb-4'>
        Tìm kiếm đơn hàng
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div className='space-y-4'>
          <CustomInput
            label='Mã đơn hàng'
            placeholder='Nhập mã đơn hàng'
            value={filters.orderId}
            onChange={(e) => onFilterChange('orderId', e.target.value)}
          />
          <CustomSelect
            label='Tình trạng'
            placeholder='Chọn tình trạng'
            value={filters.status}
            onChange={(value) => onFilterChange('status', value)}
            options={orderStatuses}
          />
        </div>

        <div className='space-y-4'>
          <CustomInput
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            value={filters.phone}
            onChange={(e) => onFilterChange('phone', e.target.value)}
          />
          <CustomInput
            label='Thời gian đặt hàng'
            placeholder='Nhập thời gian đặt hàng'
            type='date'
            value={filters.orderDate}
            onChange={(e) => onFilterChange('orderDate', e.target.value)}
          />
        </div>
      </div>

      <div className='flex gap-4 justify-end'>
        <Button
          onClick={onClear}
          variant='secondary'
          className='px-6 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition font-medium'
        >
          Làm mới
        </Button>
        <Button
          onClick={onSearch}
          className='px-8 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
