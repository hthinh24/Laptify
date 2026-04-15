package fit.iuh.laptify_backend.order.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreationRequest {
    private String customerName;
    private String address;
    private String phoneNumber;
    private String email;
    private boolean isSaved;
    private List<ProductInfo> products;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductInfo{
        private Long productId;
        private String skuCode;
        private int quantity;
    }
}
