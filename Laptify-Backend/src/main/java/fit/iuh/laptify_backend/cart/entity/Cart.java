package fit.iuh.laptify_backend.cart.entity;

import fit.iuh.laptify_backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
public class Cart {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "cart")
    private List<CartDetail> cartDetails;

    public Cart(User user) {
        this.user = user;
    }

    public void addItem(CartDetail cartDetail){
        this.cartDetails.add(cartDetail);
    }
}
