package fit.iuh.laptify_backend.cart.service.impl;

import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.cart.dto.request.CartAdditionRequest;
import fit.iuh.laptify_backend.cart.dto.request.ItemUpdatingRequest;
import fit.iuh.laptify_backend.cart.dto.response.CartResponse;
import fit.iuh.laptify_backend.cart.dto.response.ItemInCartResponse;
import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.cart.entity.CartDetail;
import fit.iuh.laptify_backend.cart.repository.CartRepository;
import fit.iuh.laptify_backend.cart.service.CartService;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.entity.Product;
import fit.iuh.laptify_backend.product.entity.Sku;
import fit.iuh.laptify_backend.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    @Override
    public CartResponse getUserCart(Long userId) {
        Cart cart = cartRepository.getCartByUser_Id(userId);
        return mapCartDetailToItemResponse(cart.getCartDetails());
    }

    @Override
    public PageResponse<List<ItemInCartResponse>> getUserProductsCart(Long userId, PageRequest request) {
        Pageable pageable = toPageable(request);
        Page<ItemInCartResponse> page = cartRepository.findCartItemsByUserId(userId, pageable);
        return PageResponse.<List<ItemInCartResponse>>builder()
                .size(page.getSize())
                .page(page.getNumber())
                .totalPages(page.getTotalPages())
                .data(page.getContent())
                .build();
    }

    @Override
    @Transactional
    public ItemInCartResponse updateItemQuantity(Long userId, ItemUpdatingRequest request) {
        cartRepository.updateQuantityByUserIdAndSkuCode(userId, request.getSkuCode(), request.getQuantity());
        return cartRepository.findCartItemByUserIdAndSkuCode(userId, request.getSkuCode());
    }

    @Override
    @Transactional
    public CartResponse deleteItem(Long userId, String skuCode) {
        cartRepository.deleteItemByUserIdAndSkuCode(userId, skuCode);
        return mapCartDetailToItemResponse(cartRepository.getCartByUser_Id(userId).getCartDetails());
    }

    private org.springframework.data.domain.PageRequest toPageable(PageRequest pageRequest) {
        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), Sort.unsorted());
    }


    @Override
    @Transactional
    public CartResponse addToCart(Long userId, CartAdditionRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        Sku sku = product.getSkus().stream()
                .filter(item -> item.getSkuCode().equalsIgnoreCase(request.getSkuCode()))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Sku not found"));

        if(request.getQuantity() > sku.getStockQuantity()){
            throw new IllegalArgumentException("Sku stock isn't enough");
        }

        Cart cart = cartRepository.getCartByUser_Id(userId);

        CartDetail cartDetail = new CartDetail(
                sku,
                cart,
                request.getQuantity()
        );

        cart.addItem(cartDetail);

        Cart savedCart = cartRepository.saveAndFlush(cart);

        return mapCartDetailToItemResponse(savedCart.getCartDetails());
    }

    private CartResponse mapCartDetailToItemResponse(List<CartDetail> cartDetails){
        List<CartResponse.Item> items = cartDetails.stream()
                .map(cd -> CartResponse.Item.builder()
                    .quantity(cd.getQuantity())
                    .skuCode(cd.getSku().getSkuCode())
                    .build())
                .toList();

        return new CartResponse(items);
    }
}
