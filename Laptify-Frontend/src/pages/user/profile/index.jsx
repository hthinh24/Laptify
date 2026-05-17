import UserDetailSection from '@/pages/common/profile/UserDetailSection.jsx';
import UserOrderSection from '@/pages/common/profile/UserOrderSection.jsx';
import {
  getSelfOrdersDisPlayForUser,
  deleteOrderById,
} from '@/services/orderApi.js';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/lib/axiosClient.js';
import { toast } from 'sonner';

export default function UserAccountPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // Redirect to login if not authenticated
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

  const handleUpdateProfile = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await userService.updateProfile(formData);
      console.log('Updating profile:', formData);
      // Show success message
      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Cập nhật hồ sơ thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

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
            <span className='text-gray-900 font-medium'>Tài khoản của tôi</span>
          </div>
          <div className='text-sm text-gray-600'>
            Chào mừng!{' '}
            <span className='text-red-600 font-medium'>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-md p-6 sticky top-8'>
              <nav className='space-y-2'>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'profile'
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Hồ sơ của tôi
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'orders'
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Đơn hàng đã mua
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-3'>
            {activeTab === 'profile' && (
              <UserDetailSection user={user} onUpdate={handleUpdateProfile} />
            )}
            {activeTab === 'orders' && (
              <UserOrderSection
                orders={userOrders}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onDeleteOrder={handleDeleteOrder}
                onEditOrder={handleEditOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
