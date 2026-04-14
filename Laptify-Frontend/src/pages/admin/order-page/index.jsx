import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Plus } from 'lucide-react';

import Pagination from '@/components/custom/Paganation.jsx';
import OrderTable from '@/pages/admin/order-page/OrderTable.jsx';
import OrderFilter from '@/pages/admin/order-page/OrderFilter.jsx';

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    orderId: 'ĐH123456',
    customerName: 'Laptop Lenovo',
    phone: 'Rimmel',
    orderDate: '12/12/2026',
    total: 21000000,
    status: 'Đang đóng gói',
  },
  {
    id: 2,
    orderId: 'ĐH123456',
    customerName: 'Laptop Lenovo',
    phone: 'Rimmel',
    orderDate: '12/12/2026',
    total: 21000000,
    status: 'Đơn hàng mới',
  },
  {
    id: 3,
    orderId: 'ĐH123456',
    customerName: 'Laptop Lenovo',
    phone: 'Rimmel',
    orderDate: '12/12/2026',
    total: 21000000,
    status: 'Đang vận chuyển',
  },
  {
    id: 4,
    orderId: 'ĐH123456',
    customerName: 'Laptop Lenovo',
    phone: 'Rimmel',
    orderDate: '12/12/2026',
    total: 21000000,
    status: 'Đang đóng gói',
  },
  {
    id: 5,
    orderId: 'ĐH123456',
    customerName: 'Laptop Lenovo',
    phone: 'Rimmel',
    orderDate: '12/12/2026',
    total: 21000000,
    status: 'Đang đóng gói',
  },
];

const orderStatuses = [
  'Đơn hàng mới',
  'Đang đóng gói',
  'Đang vận chuyển',
  'Đã giao',
];

const OrderManagementPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    orderId: '',
    phone: '',
    status: '',
    orderDate: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      const matchOrderId =
        filters.orderId === '' ||
        order.orderId.toLowerCase().includes(filters.orderId.toLowerCase());
      const matchPhone =
        filters.phone === '' ||
        order.phone.toLowerCase().includes(filters.phone.toLowerCase());
      const matchStatus =
        filters.status === '' ||
        order.status.toLowerCase().includes(filters.status.toLowerCase());
      const matchOrderDate =
        filters.orderDate === '' || order.orderDate.includes(filters.orderDate);

      return matchOrderId && matchPhone && matchStatus && matchOrderDate;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      orderId: '',
      phone: '',
      status: '',
      orderDate: '',
    });
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      const updated = orders.filter((o) => o.id !== id);
      setOrders(updated);
      setFilteredOrders(
        updated.filter((order) => {
          const matchOrderId =
            filters.orderId === '' ||
            order.orderId.toLowerCase().includes(filters.orderId.toLowerCase());
          const matchPhone =
            filters.phone === '' ||
            order.phone.toLowerCase().includes(filters.phone.toLowerCase());
          const matchStatus =
            filters.status === '' ||
            order.status.toLowerCase().includes(filters.status.toLowerCase());
          const matchOrderDate =
            filters.orderDate === '' ||
            order.orderDate.includes(filters.orderDate);

          return matchOrderId && matchPhone && matchStatus && matchOrderDate;
        })
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/order-detail/${id}`);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Quản lý đơn hàng
      </h1>

      <OrderFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
        orderStatuses={orderStatuses}
      />

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Danh sách đơn hàng
        </h2>
        <Button
          onClick={() => {}}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          <Plus size={20} />
          Thêm sản phẩm
        </Button>
      </div>

      <OrderTable
        orders={filteredOrders}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OrderManagementPage;
