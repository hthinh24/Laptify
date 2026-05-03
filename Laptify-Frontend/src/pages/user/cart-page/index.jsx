import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import CartTable from '@/pages/user/cart-page/CartTable.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';
import { setItems } from '@/feature/checkout/checkoutSlice.js';
import LoadingSpinner from '@/components/custom/LoadingSpinner.jsx';
import { getItemsUserCart, updateItemQuantity } from '@/services/cartApi.js';
import { getErrorMessage } from '@/lib/axiosClient.js';
import { toast } from 'sonner';
import { removeItemBySkuCode } from '@/feature/cart/cartThunk.js';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  const [cart, setCart] = useState([
    {
      productId: 1777040101109,
      productName: '',
      image: '',
      skuCode: '',
      skuColor: '',
      quantity: 0,
      price: 0,
      createdAt: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getItemsUserCart({ size: 5, page: 0 });
        setCart(res.data.data);
      } catch (e) {
        const message = getErrorMessage(e, 'Lấy giỏ hàng thất bại');
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate totals based on selected items
  const calculateTotals = () => {
    if (selectedItems.length === 0) {
      return { subtotal: 0, total: 0 };
    }

    const subtotal = cart
      .filter((item) => selectedItems.includes(item.skuCode))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shipping = 0;
    return {
      subtotal,
      total: subtotal + shipping,
    };
  };

  const handleSelectItem = (selectedSkuCode) => {
    setSelectedItems((prev) =>
      prev.includes(selectedSkuCode)
        ? prev.filter((skuCode) => skuCode !== selectedSkuCode)
        : [...prev, selectedSkuCode]
    );
  };

  const handleSelectAll = (selectAll) => {
    if (selectAll) {
      setSelectedItems(cart.map((item) => item.skuCode));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteItem = (skuCode) => {
    dispatch(removeItemBySkuCode(skuCode));
    setCart((prev) => prev.filter((item) => item.skuCode !== skuCode));
    setSelectedItems((prev) => prev.filter((skuCode) => skuCode !== skuCode));
    toast.success("Xóa sản phẩm khỏi giỏ hàng thành công")
  };

  const handleQuantityChange = async (selectedSkuCode, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await updateItemQuantity({
        skuCode: selectedSkuCode,
        quantity: newQuantity,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.skuCode === selectedSkuCode ? response.data : item
        )
      );
    } catch (e) {
      const message = getErrorMessage(e, 'Cập nhật số lượng thất bại');
      toast.error(message);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    // Get selected items data
    const selected = cart
      .filter((item) => selectedItems.includes(item.skuCode))
      .map((item) => ({
        id: item.id,
        skuCode: item.skuCode,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        subTotal: item.price * item.quantity,
        imageUrl: item.image,
      }));

    // Dispatch to Redux
    dispatch(setItems(selected));

    // Navigate to checkout
    navigate('/checkout');
  };

  const totals = calculateTotals();

  return (
    <div className='my-8'>
      {isLoading && (
        <LoadingSpinner
          className=''
          description={'Đang tải danh sách giỏ hàng'}
        />
      )}
      {!isLoading && (
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Giỏ hàng</h1>
            <p className='text-gray-600'>
              {cart.length} sản phẩm
              {selectedItems.length > 0 &&
                ` • ${selectedItems.length} được chọn`}
            </p>
          </div>

          {/* Cart Table */}
          <CartTable
            items={cart}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDeleteItem={handleDeleteItem}
            onQuantityChange={handleQuantityChange}
          />

          {/* Pricing and Checkout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              {/* Additional info or promotions can go here */}
            </div>

            <div className='lg:col-span-1'>
              <PricingSection
                subtotal={totals.subtotal}
                shipping={0}
                total={totals.total}
                showShipping={true}
              />

              <Button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className='w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Thanh toán ngay ({selectedItems.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
