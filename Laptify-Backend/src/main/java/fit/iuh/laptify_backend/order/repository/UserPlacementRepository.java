package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.entity.UserPlacementInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPlacementRepository extends JpaRepository<UserPlacementInfo, Long> {
}
