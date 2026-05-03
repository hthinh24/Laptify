package fit.iuh.laptify_backend.cart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ItemInCartResponse {
    private Long productId;
    private String productName;
    private String image;
    private String skuCode;
    private String skuColor;
    private int quantity;
    private BigDecimal price;
    private LocalDateTime createdAt;
}
