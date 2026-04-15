package fit.iuh.laptify_backend.product.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageRequest {
    private Integer page;
    private Integer size;

    public PageRequest(String page, String size) {
        try {
            this.page = Integer.parseInt(page);
        } catch (NumberFormatException e) {
            this.page = 0;
        }

        try {
            this.size = Integer.parseInt(size);
        } catch (NumberFormatException e) {
            this.size = 48;
        }
    }
}
