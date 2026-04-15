package fit.iuh.laptify_backend.product.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductFilter {
    private String keyword;
    private String brandCode;
    private String categoryId;
    private Double minPrice;
    private Double maxPrice;
}
