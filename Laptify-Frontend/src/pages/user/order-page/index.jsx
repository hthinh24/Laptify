import { getErrorMessage } from '@/lib/axiosClient.js';
import UserOrderSection from '@/pages/common/profile/UserOrderSection.jsx';
import { deleteOrderById, getSelfOrdersDisPlayForUser } from '@/services/orderApi.js';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function UserOrderPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const res = (
            await getSelfOrdersDisPlayForUser({
              page: currentPage - 1,
              size: itemsPerPage,
            })
          ).data;
          setUserOrders(res.data || res);
          setTotalPages(
            res.totalPages || Math.ceil((res.data || res).length / itemsPerPage)
          );
        } catch (error) {
          console.error('Fetch user orders error:', error);
          toast.error(getErrorMessage(error, 'Không thể tải danh sách đơn hàng'));
        } finally {
          setIsLoading(false);
        }
      };
  
      if (user) {
        fetchOrders();
      }
    }, [user, currentPage]);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrderById(orderId);
      setUserOrders((prev) => prev.filter((order) => order.id !== orderId));
      toast.success('Xóa đơn hàng thành công!');
    } catch (error) {
      console.error('Error deleting order:', error);
      const message = getErrorMessage(error, 'Xóa đơn hàng thất bại!');
      toast.error(message);
    }
  };



  const handleEditOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className=' border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <a href='/' className='hover:text-gray-900 transition'>
              Trang chủ
            </a>
            <span>/</span>
            <span className='text-gray-900 font-medium'>Lịch sử mua hàng</span>
          </div>
          <div className='text-sm text-gray-600'>
            Chào mừng!{' '}
            <span className='text-red-600 font-medium'>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
          {/* Main Content Area */}
          <div className=''>
            <UserOrderSection
              orders={userOrders}
              isLoading={isLoading}
              onDeleteOrder={handleDeleteOrder}
              onEditOrder={handleEditOrder}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
    </div>
  );
}
