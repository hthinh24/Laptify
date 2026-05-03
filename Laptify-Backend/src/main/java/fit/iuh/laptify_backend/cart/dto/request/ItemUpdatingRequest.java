package fit.iuh.laptify_backend.cart.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ItemUpdatingRequest {
    private String skuCode;
    private int quantity;
}
