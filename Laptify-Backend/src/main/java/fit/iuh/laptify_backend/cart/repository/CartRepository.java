package fit.iuh.laptify_backend.cart.repository;

import fit.iuh.laptify_backend.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
