import { Trash2, Edit3 } from 'lucide-react';
import { orderStatuses } from '../../../utils/orderHelper';
import { formatDate } from '@/utils/convertHelper.js';
import { ConfirmDialog } from '@/components/custom/ConfirmDialog.jsx';

export default function OrderTable({ orders, onDelete, onEdit }) {
  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find((s) => s.value === status);
    return statusObj?.color || 'bg-gray-100 text-gray-800';
  };
    const getStatusLabel = (status) => {
      const statusObj = orderStatuses.find((s) => s.value === status);
      return statusObj?.label || 'Không xác định';
    };
  const currentItems = orders;

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-orange-600 text-white'>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Mã đơn hàng
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Tên khách hàng
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Số điện thoại
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Ngày đặt hàng
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Tổng tiền
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Tình trạng
              </th>
              <th className='px-6 py-3 text-center text-sm font-semibold'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan='7' className='px-6 py-4 text-center text-gray-500'>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              currentItems.map((order) => (
                <tr key={order.id} className='hover:bg-gray-50 transition'>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {order.id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {order.customerName}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {order.phoneNumber}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {formatDate(order.orderDate)}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {order.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-6 py-4 text-sm'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <ConfirmDialog 
                      title='Xóa đơn hàng'
                      description='Bạn có chắc chắn muốn cóa đơn hàng này không?'
                      onConfirm={() => onDelete(order.id)}>
                        <button
                          className='p-2 text-red-600 hover:bg-red-50 rounded-md transition'
                        >
                          <Trash2 size={18} />
                        </button>
                      </ConfirmDialog>
                      <button
                        onClick={() => onEdit(order.id)}
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-md transition'
                        title='Chỉnh sửa'
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
