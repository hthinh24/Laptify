package fit.iuh.laptify_backend.product.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MediaMetadataResponse {
    private String url;
    private Integer width;
    private Integer height;
    private String format;
}
