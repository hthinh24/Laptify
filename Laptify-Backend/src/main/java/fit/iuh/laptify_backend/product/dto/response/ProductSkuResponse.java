package fit.iuh.laptify_backend.product.dto.response;

import fit.iuh.laptify_backend.product.entity.MediaMetadata;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductSkuResponse {
    private String skuCode;
    private String color;
    private BigDecimal price;
    private Integer totalPurchases;
    private Integer stockQuantity;
    private List<MediaMetadataResponse> mediaMetadataList;
}
