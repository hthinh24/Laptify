package fit.iuh.laptify_backend.cart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private List<CartDetailInfo> cartDetails;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartDetailInfo{
        private String productName;
        private String skuColor;
        private int quantity;
        private BigDecimal price;
        private Instant createdAt;
    }
}
