package fit.iuh.laptify_backend.cart.controller;

import fit.iuh.laptify_backend.cart.dto.request.CartAdditionRequest;
import fit.iuh.laptify_backend.cart.dto.request.ItemUpdatingRequest;
import fit.iuh.laptify_backend.cart.service.CartService;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/carts")
public class CartController {
    private final CartService cartService;

    @GetMapping("")
    public ResponseEntity<?> getSelfCart(
            @AuthenticationPrincipal(expression = "id") Long userId
    ){
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }

    @GetMapping("/items")
    public ResponseEntity<?> getSelfProductsCart(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        PageRequest request = new PageRequest(page, size);
        return ResponseEntity.ok(cartService.getUserProductsCart(userId ,request));
    }

    @PostMapping("")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @RequestBody CartAdditionRequest request

    ){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cartService.addToCart(userId, request));
    }

    @DeleteMapping("/{skuCode}")
    public void removeItemFromCart(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @PathVariable String skuCode
    ){
        cartService.deleteItem(userId, skuCode);
    }

    @PutMapping("")
    public ResponseEntity<?> updateItemInCart(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @RequestBody ItemUpdatingRequest request
            ){
        return ResponseEntity.ok(cartService.updateItemQuantity(userId, request));
    }
}
