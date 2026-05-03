package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.dto.response.CustomerOrderInfoResponse;
import fit.iuh.laptify_backend.order.entity.UserPlacementInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPlacementRepository extends JpaRepository<UserPlacementInfo, Long> {
    @Query(value = """
    SELECT 
        upi.customer_name AS customerName,
        upi.phone_number AS phoneNumber,
        upi.email AS email,
        upi.address AS address
    FROM user_placement_infos upi
    JOIN orders o ON o.user_placement_info_id = upi.id
    WHERE upi.user_id = :userId 
      AND upi.is_saved = true
    ORDER BY o.order_date DESC
    LIMIT 1
""", nativeQuery = true)
    Optional<CustomerOrderInfoResponse> getLatestSavedCustomerPlacementInfo(@Param("userId") Long userId);
}
