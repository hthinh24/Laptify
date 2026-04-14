import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import CustomInput from '@/components/custom/CustomInput.jsx';
import CustomSelect from '@/components/custom/CustomSelect.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';

// Mock data for orders with detailed information
const mockOrdersDetail = [
  {
    id: 1,
    orderId: 'ĐH123456',
    customerName: 'Nguyễn Văn A',
    phone: '0123456789',
    address: '123 Đường 45, Khu phố 6, Phường 7, TP HCM',
    orderDate: '12/02/2025',
    status: 'Đơn hàng mới',
    items: [
      {
        id: 1,
        productName: 'HI Gamepad',
        price: 550,
        quantity: 2,
        subtotal: 1100,
        image: 'gamepad.jpg',
      },
      {
        id: 2,
        productName: 'HI Gamepad',
        price: 550,
        quantity: 2,
        subtotal: 1100,
        image: 'gamepad.jpg',
      },
      {
        id: 3,
        productName: 'HI Gamepad',
        price: 550,
        quantity: 2,
        subtotal: 1100,
        image: 'gamepad.jpg',
      },
    ],
    subtotal: 3300,
    shipping: 0,
    total: 3300,
    userRole: 'admin', // 'admin' or 'user'
  },
  {
    id: 2,
    orderId: 'ĐH123457',
    customerName: 'Trần Thị B',
    phone: '0987654321',
    address: '456 Nguyễn Huệ, Quận 1, TP HCM',
    orderDate: '13/02/2025',
    status: 'Đang đóng gói',
    items: [
      {
        id: 1,
        productName: 'Laptop Dell',
        price: 15000000,
        quantity: 1,
        subtotal: 15000000,
        image: 'laptop.jpg',
      },
    ],
    subtotal: 15000000,
    shipping: 0,
    total: 15000000,
    userRole: 'admin',
  },
];

const orderStatuses = [
  'Đơn hàng mới',
  'Đang đóng gói',
  'Đang vận chuyển',
  'Đã giao',
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the order by id
  const orderData = mockOrdersDetail.find((order) => order.id === parseInt(id));

  if (!orderData) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>Không tìm thấy đơn hàng</p>
        <Button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
        >
          Quay lại
        </Button>
      </div>
    );
  }

  const isUserMode = orderData.userRole === 'user';
  const isAdmin = orderData.userRole === 'admin';

  // Check if order is editable
  const isPending = orderData.status === 'Đơn hàng mới';
  const isPackaging = orderData.status === 'Đang đóng gói';
  const isEditable =
    (!isUserMode && isPending) || (isAdmin && (isPending || isPackaging));

  const [formData, setFormData] = useState({
    orderId: orderData.orderId,
    customerName: orderData.customerName,
    phone: orderData.phone,
    address: orderData.address,
    orderDate: orderData.orderDate,
    status: orderData.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    // TODO: Call API to update order
    console.log('Saving order:', formData);
    alert('Cập nhật đơn hàng thành công');
  };

  const handleDelete = () => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      // TODO: Call API to delete order
      console.log('Deleting order:', id);
      alert('Xóa đơn hàng thành công');
      navigate(-1);
    }
  };

  return (
    <div className='mx-auto'>
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
          <h1 className='text-3xl font-bold text-gray-900'>Quản lý đơn hàng</h1>
          <p className='text-gray-500 text-sm'>Chi tiết đơn hàng</p>
        </div>
      </div>

      {/* Order Information Section */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          {/* Column 1 */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Mã đơn hàng
              </label>
              <input
                type='text'
                name='orderId'
                value={formData.orderId}
                disabled
                className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tên khách hàng
              </label>
              <input
                type='text'
                name='customerName'
                value={formData.customerName}
                onChange={handleInputChange}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                  isEditable
                    ? 'bg-white text-gray-900 cursor-text'
                    : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Số điện thoại
              </label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                  isEditable
                    ? 'bg-white text-gray-900 cursor-text'
                    : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                }`}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Địa chỉ giao hàng
              </label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                  isEditable
                    ? 'bg-white text-gray-900 cursor-text'
                    : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Ngày đặt hàng
              </label>
              <input
                type='text'
                name='orderDate'
                value={formData.orderDate}
                disabled
                className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tình trạng
              </label>
              <select
                name='status'
                value={formData.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                  isEditable
                    ? 'bg-white text-gray-900 cursor-pointer'
                    : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                }`}
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Sản phẩm</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-300'>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Sản phẩm
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Giá
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Số lượng
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Tổng cộng
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {orderData.items.map((item) => (
                <tr key={item.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {item.productName}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    ${item.price}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    {item.quantity}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900 font-semibold'>
                    ${item.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection
        subtotal={orderData.subtotal}
        shipping={orderData.shipping}
        total={orderData.total}
        showShipping={true}
      />

      {/* Button Group */}
      <div className=' flex justify-end gap-4'>
        {isUserMode && isPending && (
          <>
            <Button
              onClick={handleCancel}
              className='px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition font-medium'
            >
              Hủy đơn hàng
            </Button>
            <Button
              onClick={handleSave}
              className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium'
            >
              Cập nhật thông tin
            </Button>
          </>
        )}

        {isAdmin && (
          <>
            {(isPending || isPackaging) && (
              <>
                <Button
                  onClick={handleDelete}
                  className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
                >
                  Xóa đơn hàng
                </Button>
                <Button
                  onClick={handleSave}
                  className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium'
                >
                  Cập nhật thông tin
                </Button>
              </>
            )}
            {!isPending && !isPackaging && (
              <Button
                onClick={handleCancel}
                className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium'
              >
                Xem chi tiết
              </Button>
            )}
          </>
        )}

        {!isUserMode && !isAdmin && (
          <Button
            onClick={handleCancel}
            className='px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition font-medium'
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
}
