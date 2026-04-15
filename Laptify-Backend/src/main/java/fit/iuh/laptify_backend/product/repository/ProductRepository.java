package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @EntityGraph(attributePaths = "skus")
    Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "ORDER BY s.totalPurchases DESC, p.id ASC")
    @EntityGraph(attributePaths = "skus")
    Page<Product> findBestSellerProducts(Pageable pageable);
}
