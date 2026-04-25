export default function OrderItemSection({ items = [] }) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Danh sách sản phẩm
      </h2>
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
            {items.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className='flex px-4 py-4 text-sm text-gray-900 items-center gap-2'>
                  <img src={item.imageUrl} alt='' className='w-8' />
                  <div className='flex flex-col'>
                    <div className="text-[15px]">
                    {item.productName}
                    </div>
                    <div className="text-gray-500 text-[13px]">
                      Màu sắc: {item.color}
                    </div>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.quantity}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900 font-semibold'>
                  {item.subTotal.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
