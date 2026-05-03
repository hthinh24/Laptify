package fit.iuh.laptify_backend.cart.repository;

import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.cart.dto.response.ItemInCartResponse;
import fit.iuh.laptify_backend.cart.entity.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart getCartByUser_Id(Long userId);

    @Query(value = """
            SELECT p.id as productId, p.name as productName, JSON_UNQUOTE(JSON_EXTRACT(s.media_metadata, '$[0].url')) as image ,s.sku_code as skuCode ,s.color as skuColor, cd.quantity, s.price, cd.created_at as createdAt
            FROM cart_details cd
            JOIN skus s ON cd.sku_code = s.sku_code
            JOIN products p ON s.product_id = p.id
            JOIN carts c ON cd.cart_id = c.id
            WHERE c.user_id = :userId
            ORDER BY cd.created_at DESC
            """, nativeQuery = true)
    Page<ItemInCartResponse> findCartItemsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Modifying
    @Query(
            value = """
            DELETE cd FROM cart_details cd
            JOIN carts c ON cd.cart_id = c.id
            WHERE c.user_id = :userId AND cd.sku_code = :skuCode
            """, nativeQuery = true)
    void deleteItemByUserIdAndSkuCode(@Param("userId") Long userId, @Param("skuCode") String skuCode);

    @Modifying
    @Query(
            value = """
            UPDATE cart_details cd
            JOIN carts c ON cd.cart_id = c.id
            SET cd.quantity = :quantity
            WHERE c.user_id = :userId AND cd.sku_code = :skuCode
            """, nativeQuery = true)
    void updateQuantityByUserIdAndSkuCode(@Param("userId") Long userId, @Param("skuCode") String skuCode, @Param("quantity") int quantity);

    @Query(value = """
            SELECT p.id as productId, p.name as productName,JSON_UNQUOTE(JSON_EXTRACT(s.media_metadata, '$[0].url')) as image,s.sku_code as skuCode , s.color as skuColor, cd.quantity, s.price, cd.created_at as createdAt
            FROM cart_details cd
            JOIN skus s ON cd.sku_code = s.sku_code
            JOIN products p ON s.product_id = p.id
            JOIN carts c ON cd.cart_id = c.id
            WHERE c.user_id = :userId AND cd.sku_code = :skuCode
            """, nativeQuery = true)
    ItemInCartResponse findCartItemByUserIdAndSkuCode(@Param("userId") Long userId, @Param("skuCode") String skuCode);
}
