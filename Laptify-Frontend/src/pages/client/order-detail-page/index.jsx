import { getErrorMessage } from '@/lib/axiosClient.js';
import { getOrderByTrackingCode } from '@/services/orderApi.js';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';



const orderStatuses = [
  'Đơn hàng mới',
  'Đang đóng gói',
  'Đang vận chuyển',
  'Đã giao',
];
const OrderDetailClientPage = () => {
  const { trackingCode } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find the order by id
  useEffect(() => {
    const fetchOrder = async () => {
      if (trackingCode) {
        try {
          const res = (await getOrderByTrackingCode(trackingCode)).data;
          setOrder(res);
        } catch (e) {
          const message = getErrorMessage(e, 'Lấy đơn hàng thất bại');
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrder();
  }, [trackingCode]);

  if (!order) {
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

  const [formData, setFormData] = useState({
    id: order.id,
    customerName: order.customer?.customerName,
    phone: order.customer?.phoneNumber,
    address: order.customer?.address,
    orderDate: order.orderDate,
    status: order.status,
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

//   const handleSave = () => {
//     // TODO: Call API to update order
//     console.log('Saving order:', formData);
//     alert('Cập nhật đơn hàng thành công');
//   };

//   const handleDelete = () => {
//     if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
//       // TODO: Call API to delete order
//       console.log('Deleting order:', id);
//       alert('Xóa đơn hàng thành công');
//       navigate(-1);
//     }
//   };

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
                value={formData.id}
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
                className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 cursor-text`}
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
                className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 cursor-text`}
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
                className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 cursor-text`}
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
                className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 cursor-pointer`}
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
      <OrderItemSection items={order.orderDetails} />

      {/* Pricing Section */}
      <PricingSection
        subtotal={order.totalPrice}
        shipping={order.shippingFee}
        total={order.totalDue}
        showShipping={true}
      />
    </div>
  );
}

export default OrderDetailClientPage;
