import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/custom/Paganation.jsx';
import ProductTable from '@/pages/admin/product-page/ProductTable.jsx';
import ProductFilter from '@/pages/admin/product-page/ProductFilter.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus } from 'lucide-react';
import {
  getProductSummaries,
  searchProductsByProductsByCriteria,
} from '@/services/productApi.js';
import { getErrorMessage } from '@/lib/axiosClient.js';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/custom/LoadingSpinner.jsx';
import { brands, categories } from '@/data/mockProducts.js';

const ProductManagementPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [brands, setBrands] = useState([])
  // const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductSummaries({
          page: currentPage - 1,
          size: itemsPerPage,
        });
        const { data, totalPages: pages } = response.data;
        setProducts(data);
        setFilteredProducts(data);
        setTotalPages(pages);
      } catch (e) {
        const message = getErrorMessage(e, 'Lấy dánh sách sản phẩm thất bại');
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    // const fetchCategories = async () => {
    //   try {
    //     const res = (await getCategories()).data;
    //     setCategories(res);
    //   } catch (e) {
    //     const message = getErrorMessage(e, 'Lấy dánh sách sản phẩm thất bại');
    //     toast.error(message);
    //   }
    // };

    // const fetchBrands = async () => {
    //   try {
    //     const res = (await getBrands()).data;
    //     setBrands(res);
    //   } catch (e) {
    //     const message = getErrorMessage(e, 'Lấy dánh sách sản phẩm thất bại');
    //     toast.error(message);
    //   }
    // };
    // fetchBrands();
    // fetchCategories();
    fetchProducts();
  }, [currentPage, itemsPerPage]);

  // useEffect(() => {
  //   const fetchCategories = async() =>{
  //     try{
  //       const res = (await getCategories()).data
  //       setCategories(res)
  //     }catch(e){
  //       const message = getErrorMessage(e, 'Lấy dánh sách sản phẩm thất bại');
  //       toast.error(message);
  //     }
  //   }

  //   const fetchBrands = async () => {
  //     try {
  //       const res = (await getBrands()).data;
  //       setBrands(res);
  //     } catch (e) {
  //       const message = getErrorMessage(e, 'Lấy dánh sách sản phẩm thất bại');
  //       toast.error(message);
  //     }
  //   };
  //   fetchBrands()
  //   fetchCategories()
  // }, [])

  const [filters, setFilters] = useState({
    productCode: '',
    productName: '',
    category: '',
    manufacturer: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      // Thêm pagination
      params.append('page', (currentPage - 1).toString());
      params.append('size', itemsPerPage.toString());

      // Thêm các filter nếu có giá trị
      if (filters.productCode) params.append('id', filters.productCode);
      if (filters.productName) params.append('name', filters.productName);
      if (filters.category) params.append('categoryId', filters.category);
      if (filters.manufacturer) params.append('brandId', filters.manufacturer);

      const res = (
        await searchProductsByProductsByCriteria({ params: params.toString() })
      ).data;
      setProducts(res.data);
      // setFilteredProducts(res.data);
      setTotalPages(res.totalPages);
      setCurrentPage(1);
      toast.success('Tìm kiếm sản phẩm thành công');
    } catch (e) {
      console.log(e);
      const message = getErrorMessage(e, 'Tìm kiếm sản phẩm thất bại');
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFilters({
      productCode: '',
      productName: '',
      category: '',
      manufacturer: '',
    });
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      setFilteredProducts(
        updated.filter((product) => {
          const matchCode =
            filters.productCode === '' ||
            product.code
              .toLowerCase()
              .includes(filters.productCode.toLowerCase());
          const matchName =
            filters.productName === '' ||
            product.name
              .toLowerCase()
              .includes(filters.productName.toLowerCase());
          const matchCategory =
            filters.category === '' ||
            product.category
              .toLowerCase()
              .includes(filters.category.toLowerCase());
          const matchManufacturer =
            filters.manufacturer === '' ||
            product.manufacturer
              .toLowerCase()
              .includes(filters.manufacturer.toLowerCase());

          return matchCode && matchName && matchCategory && matchManufacturer;
        })
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/product-updating/${id}`);
  };

  // const brandData = useCallback(() => {
  //   var arr =  brands.map(item =>  ({value : item.id, label: item.name}));

  //   return arr.sort((a, b) =>
  //     a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
  //   );

  // }, [brands])

  // const categoriesData = useCallback(() => {
  //   return categories.map((item) => ({ value: item.id, label: item.name }));
  // }, [categories]);

  if (isLoading) {
    return (
      <div className=''>
        <LoadingSpinner description={'Đang tải dữ liệu sản phẩm'} />
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Quản lý sản phẩm
      </h1>

      <ProductFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
        brands={brands}
        categories={categories}
      />

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Danh sách sản phẩm
        </h2>
        <Button
          onClick={() => navigate('/admin/product-addition')}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          <Plus />
          Thêm sản phẩm
        </Button>
      </div>

      <ProductTable
        products={products}
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

export default ProductManagementPage;
