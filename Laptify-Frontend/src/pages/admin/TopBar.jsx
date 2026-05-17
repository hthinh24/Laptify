import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className='flex items-center justify-between h-16 bg-gray-800 text-white px-6 shadow-md'>
      <h1 className='text-2xl font-bold'>QUẢN LÝ</h1>
      <div className='flex items-center gap-4'>
        <Link className='p-2 hover:bg-gray-700 rounded-md transition flex gap-3' to={"/"}>
          <LogOut size={24} /> Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default TopBar
