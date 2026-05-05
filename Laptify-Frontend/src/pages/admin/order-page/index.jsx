import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Plus } from 'lucide-react';

import Pagination from '@/components/custom/Paganation.jsx';
import OrderTable from '@/pages/admin/order-page/OrderTable.jsx';
import OrderFilter from '@/pages/admin/order-page/OrderFilter.jsx';
import {
  deleteOrderById,
  getOrdersDisPlayForAdmin,
  searchOrderByFilter,
} from '@/services/orderApi.js';
import { orderStatuses } from '@/utils/orderHelper.js';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/axiosClient.js';

// Mock data for orders

const OrderManagementPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fecthOrders = async () => {
      const res = (
        await getOrdersDisPlayForAdmin({
          size: itemsPerPage,
          page: currentPage - 1,
        })
      ).data;
      console.log(res.data);
      setOrders(res.data);
      setFilteredOrders(res.data);
      setTotalPages(res.totalPages);
    };
    fecthOrders();
  }, [currentPage]);

  const [filters, setFilters] = useState({
    id: '',
    phoneNumber: '',
    status: '',
    orderDate: '',
  });

  const handleFilterChange = (filterName, value) => {
    console.log(filterName + ' ' + value);
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = () => {
    const searchOrder = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: (currentPage - 1).toString(),
          size: itemsPerPage.toString(),
        });

        console.log(filters.id);

        // Thêm các filter vào params nếu có giá trị
        if (filters.id) params.append('orderId', filters.id);
        if (filters.phoneNumber)
          params.append('phoneNumber', filters.phoneNumber);
        if (filters.status) params.append('status', filters.status);
        if (filters.orderDate) params.append('orderDate', filters.orderDate);

        const res = (await searchOrderByFilter({ params: params.toString() }))
          .data;

        setFilteredOrders(res.data);
        setTotalPages(res.totalPages);
        setCurrentPage(1);
        toast.success('Tìm kiếm đơn hàng thành công');
      } catch (e) {
        const message = getErrorMessage(e, 'Tìm kiếm đơn hàng thất bại');
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    searchOrder();
  };

  const handleClear = () => {
    setFilters({
      id: '',
      phoneNumber: '',
      status: '',
      orderDate: '',
    });
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      await deleteOrderById(id)
      const updated = orders.filter((o) => o.id !== id);
      setOrders(updated);
      setFilteredOrders(
        updated.filter((order) => {
          const matchOrderId =
            filters.id === '' ||
            order.id.toLowerCase().includes(filters.id.toLowerCase());
          const matchPhone =
            filters.phoneNumber === '' ||
            order.phoneNumber
              .toLowerCase()
              .includes(filters.phoneNumber.toLowerCase());
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
    navigate(`/admin/orders/${id}`);
  };

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
        isLoading={isLoading}
        orders={filteredOrders}
        onDelete={handleDelete}
        onEdit={handleEdit}
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
