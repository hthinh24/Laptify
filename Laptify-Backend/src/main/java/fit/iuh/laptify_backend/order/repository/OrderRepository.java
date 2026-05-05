package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByTrackingCode(String trackingCode);

    @Query(value = "SELECT " +
            "o.id, " +
            "upi.customer_name, " +
            "upi.phone_number, " +
            "o.order_date, " +
            "o.total_price, " +
            "o.status " +
            "FROM orders o " +
            "JOIN user_placement_infos upi ON o.user_placement_info_id = upi.id " +
            "ORDER BY o.order_date DESC",
            countQuery = "SELECT COUNT(*) FROM orders",
            nativeQuery = true)
    Page<OrderDisplayResponse> findAllOrdersWithPagination(Pageable pageable);
}
