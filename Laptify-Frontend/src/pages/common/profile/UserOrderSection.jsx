import React from 'react';
import OrderTable from '@/pages/admin/order-page/OrderTable';
import Pagination from '@/components/custom/Paganation';

export default function UserOrderSection({
  orders = [],
  isLoading = false,
  currentPage = 1,
  totalPages = 0,
  onPageChange,
  onDeleteOrder,
  onEditOrder,
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-8'>
      <h2 className='text-2xl font-bold text-red-600 mb-6'>Đơn hàng đã mua</h2>

      {orders.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Bạn chưa có đơn hàng nào</p>
        </div>
      ) : (
        <>
          <OrderTable
            isLoading={isLoading}
            orders={orders}
            onDelete={onDeleteOrder}
            onEdit={onEditOrder}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
