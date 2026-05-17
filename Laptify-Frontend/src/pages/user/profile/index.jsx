import UserDetailSection from '@/pages/common/profile/UserDetailSection.jsx';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function UserProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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

  
  if(isLoading){
    return <div className="">Đang tải thông tin người dùng</div>
  }

  if (!user) {
    return <div className=''>Không tìm thông tin người dùng</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 max-w-7xl mx-auto '>
      <div className=' border-gray-200'>
        <div className='bg-white px-4 py-4 flex items-center justify-between'>
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

      <div className='max-w-7xl mx-auto px-4 py-8 bg-white'>
        <UserDetailSection user={user} onUpdate={handleUpdateProfile} />
      </div>
    </div>
  );
}
