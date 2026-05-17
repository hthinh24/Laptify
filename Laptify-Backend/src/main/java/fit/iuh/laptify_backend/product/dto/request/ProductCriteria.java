package fit.iuh.laptify_backend.product.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductCriteria {
    private String id;
    private String name;
    private String brandId;
    private String categoryId;
}
