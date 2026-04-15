package fit.iuh.laptify_backend.cart.entity;

import fit.iuh.laptify_backend.product.entity.Sku;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_details")
@Getter
@Setter
@NoArgsConstructor
@IdClass(CartDetail.CartDetailId.class)
public class CartDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @Id
    @ManyToOne
    @JoinColumn(name = "sku_code")
    private Sku sku;

    private int quantity;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    static class CartDetailId{
        private Long cart;
        private String sku;
    }

    public CartDetail(Sku sku, Cart cart, int quantity) {
        this.sku = sku;
        this.cart = cart;
        this.quantity = quantity;
    }
}
