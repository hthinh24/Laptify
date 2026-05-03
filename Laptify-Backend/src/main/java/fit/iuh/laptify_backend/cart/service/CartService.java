package fit.iuh.laptify_backend.cart.service;

import fit.iuh.laptify_backend.cart.dto.request.CartAdditionRequest;
import fit.iuh.laptify_backend.cart.dto.request.ItemUpdatingRequest;
import fit.iuh.laptify_backend.cart.dto.response.CartResponse;
import fit.iuh.laptify_backend.cart.dto.response.ItemInCartResponse;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;

import java.util.List;

public interface CartService {
    ItemInCartResponse addToCart(Long userId, CartAdditionRequest request);
    PageResponse<List<ItemInCartResponse>> getUserProductsCart(Long userId, PageRequest request);
    CartResponse getUserCart(Long userId);
    void deleteItem(Long userId, String skuCode);
    ItemInCartResponse updateItemQuantity(Long userId, ItemUpdatingRequest request);
}
