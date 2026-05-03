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
    private List<String> itemSkuCodes;
}
