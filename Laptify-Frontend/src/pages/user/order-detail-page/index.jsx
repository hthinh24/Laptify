import CustomInput from '@/components/custom/CustomInput.jsx';
import { Button } from '@/components/ui/button.jsx';
import { getErrorMessage } from '@/lib/axiosClient.js';
import OrderItemSection from '@/pages/common/order-management/OrderItemSection.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';
import { getOrderById } from '@/services/orderApi.js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';


const OrderDetailUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    customerName: '',
    phone: '',
    address: '',
    orderDate: '',
    status: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const res = (await getOrderById(id)).data;
          setOrder(res);
          setFormData({
            id: res?.id,
            customerName: res?.customer?.customerName,
            phone: res?.customer?.phoneNumber,
            address: res?.customer?.address,
            orderDate: res?.orderDate,
            status: res?.status,
          });
        } catch (e) {
          const message = getErrorMessage(e, 'Lấy đơn hàng thất bại');
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>Đang tìm kiếm đơn hàng</p>
        <Button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
        >
          Quay lại
        </Button>
      </div>
    );
  }

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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleStatusChange = (value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     status: value,
  //   }));
  // };

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
    <div className='mx-auto max-w-7xl'>
      {/* Header */}
      <div className='my-6'>
        <h1 className='text-3xl text-center font-bold text-gray-900'>
          Chi tiết đơn hàng
        </h1>
      </div>

      {/* Order Information Section */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          {/* Column 1 */}
          <div className='space-y-4'>
            <CustomInput
              label='Mã đơn hàng'
              value={formData.id}
              disabled={true}
            />
            <CustomInput
              label='Tên khách hàng'
              value={formData.customerName}
              disabled={true}
            />
          </div>

          {/* Column 2 */}
          <div className='space-y-4'>
            <CustomInput
              label='Số điện thoại'
              value={formData.phoneNumber}
              disabled={true}
            />
            <CustomInput
              label='Địa chỉ giao hàng'
              value={formData.address}
              disabled={true}
            />
          </div>

          {/* Column 3 */}
          <div className='space-y-4'>
            <CustomInput
              label='Ngày đặt hàng'
              value={formData.orderDate}
              disabled={true}
            />
            <CustomInput
              label='Tình trạng đơn hàng'
              value={formData.status}
              disabled={true}
            />
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
      <div className='flex justify-center my-6'>
        <Button className={'px-6 py-4'}>
          <Link to={'/'}>Trở về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailUserPage;
