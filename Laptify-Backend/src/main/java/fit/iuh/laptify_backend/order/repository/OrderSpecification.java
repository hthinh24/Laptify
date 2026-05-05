package fit.iuh.laptify_backend.order.repository;

import fit.iuh.laptify_backend.order.dto.request.OrderFilter;
import fit.iuh.laptify_backend.order.entity.Order;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

public class OrderSpecification {

    public static Specification<Order> getSpecification(OrderFilter orderFilter){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (orderFilter.getOrderId() != null && !orderFilter.getOrderId().isEmpty()) {
                Long orderId = Long.parseLong(orderFilter.getOrderId());
                predicates.add(criteriaBuilder.equal(root.get("id"), orderId));
            }

            if (orderFilter.getPhoneNumber() != null && !orderFilter.getPhoneNumber().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("userInfoPlacement").get("phoneNumber"), orderFilter.getPhoneNumber()));
            }

            if (orderFilter.getStatus() != null && !orderFilter.getStatus().isEmpty()) {
                OrderStatus status = OrderStatus.valueOf(orderFilter.getStatus().toUpperCase());
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (orderFilter.getOrderDate() != null) {
                LocalDate targetDate = orderFilter.getOrderDate();
                Instant startOfDay = targetDate.atStartOfDay(ZoneOffset.UTC).toInstant();
                Instant endOfDay = targetDate.plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();

                predicates.add(criteriaBuilder.between(root.get("orderDate"), startOfDay, endOfDay));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
