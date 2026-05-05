import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';
import OrderItemSection from '@/pages/common/order-management/OrderItemSection.jsx';
import {
  getOrderById,
  updateOrderForAdmin,
  updateOrderStatusForAdmin,
} from '@/services/orderApi.js';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/axiosClient.js';
import LoadingSpinner from '@/components/custom/LoadingSpinner.jsx';
import CustomSelect from '@/components/custom/CustomSelect.jsx';
import { orderStatuses } from '@/utils/orderHelper.js';

// Mock data for orders with detailed information


export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 1,
    customerName: '',
    phoneNumber: '',
    address: '',
    orderDate: '',
    status: '',
  });
  // Find the order by id

  const setOrderInfo = useCallback(
    (order) => {
      setOrder(order);
      const { status, orderDate } = order;
      console.log(status);

      const { customerName, phoneNumber, address } = order.customer;
      setFormData({
        id: id,
        customerName: customerName,
        phoneNumber: phoneNumber,
        address: address,
        orderDate: orderDate,
        status: status,
      });
    },
    [id]
  );
  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const res = (await getOrderById(id)).data;
          setOrderInfo(res);
        } catch (e) {
          const message = getErrorMessage(e, 'Lấy đơn hàng thất bại');
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrder();
  }, [id, setOrderInfo]);

  if (isLoading) {
    return (
      <div className=''>
        <LoadingSpinner description={'Đang tải đơn hàng'} />
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

  const orderStatusLabels = orderStatuses.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    const updatOrderStatus = async () => {
      if (id) {
        try {
          const res = (await updateOrderStatusForAdmin({ status: value }, id))
            .data;
          setOrderInfo(res);
          toast.success('Cập nhật trang thái đơn hàng thành công');
        } catch (e) {
          const message = getErrorMessage(
            e,
            'Cập nhật trạng thái đơn hàng thất bại'
          );
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    updatOrderStatus();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    const updateOrder = async () => {
      if (id) {
        try {
          const requestData = {
            customerName: formData.customerName,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
          };
          const res = (await updateOrderForAdmin(requestData, id)).data;
          setOrderInfo(res);
          toast.success('Cập nhật đơn hàng thành công');
        } catch (e) {
          const message = getErrorMessage(e, 'Cập nhật đơn hàng thất bại');
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    updateOrder();
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
                name='phoneNumber'
                value={formData.phoneNumber}
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

            <CustomSelect
              label='Tình trạng'
              placeholder='Chọn tình trạng'
              value={formData.status}
              onChange={handleStatusChange}
              options={orderStatusLabels}
            />
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <OrderItemSection items={order.orderDetails} />

      {/* Pricing Section */}
      <PricingSection
        subTotal={order.totalPrice}
        shipping={order.shippingFee}
        total={order.totalDue}
        showShipping={true}
      />

      {/* Button Group */}
      <div className=' flex justify-end gap-4'>
        <Button
          onClick={handleDelete}
          className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          Xóa đơn hàng
        </Button>
        <Button
          onClick={handleUpdate}
          className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium'
        >
          Cập nhật thông tin
        </Button>
      </div>
    </div>
  );
}
