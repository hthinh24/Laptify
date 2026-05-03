package fit.iuh.laptify_backend.cart.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private List<Item> items;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Getter
    public static class Item{
        private int quantity;
        private String skuCode;
    }
}
