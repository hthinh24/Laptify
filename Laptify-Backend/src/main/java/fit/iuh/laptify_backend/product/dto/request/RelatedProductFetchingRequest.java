package fit.iuh.laptify_backend.product.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RelatedProductFetchingRequest {
    Long categoryId;
    Long productId;
}
