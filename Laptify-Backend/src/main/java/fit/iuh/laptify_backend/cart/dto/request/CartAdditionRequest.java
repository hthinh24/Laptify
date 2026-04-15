package fit.iuh.laptify_backend.cart.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartAdditionRequest {
    private Long productId;
    private String skuCode;
    private int quantity;
}
