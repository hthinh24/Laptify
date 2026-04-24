package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.dto.response.ProductSummaryResponse;
import fit.iuh.laptify_backend.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @EntityGraph(attributePaths = "skus")
    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE s.stockQuantity >= 1 " +
           "ORDER BY p.createdAt DESC")
    Page<Product> findNewProducts(Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Optional<Product> findById(Long id);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "ORDER BY " +
           "CASE WHEN s.stockQuantity > 0 THEN 1 ELSE 0 END DESC, " +
           "s.stockQuantity DESC")
    Page<Product> findAllProducts(Pageable pageable);

    @EntityGraph(attributePaths = "skus")
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE p.category.id = :categoryId AND p.id <> :productId " +
           "AND s.stockQuantity >= 1" +
           "ORDER BY s.totalPurchases DESC, p.createdAt DESC")
    @EntityGraph(attributePaths = "skus")
    Page<Product> findRelatedProduct(Long categoryId, Long productId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p " +
           "LEFT JOIN FETCH p.skus s " +
           "WHERE s.stockQuantity >= 1" +
           "ORDER BY s.totalPurchases DESC, p.id ASC")
    @EntityGraph(attributePaths = "skus")
    Page<Product> findBestSellerProducts(Pageable pageable);

    @Query(value = "SELECT \n" +
            "    p.id,\n" +
            "    p.name,\n" +
            "    c.id AS category_id,\n" +
            "    c.name AS category_name,\n" +
            "    b.id AS brand_id,\n" +
            "    b.name AS brand_name,\n" +
            "    CAST(SUM(s.stock_quantity) AS SIGNED) AS total_stock,\n" +
            "    s_min.price\n" +
            "FROM products p\n" +
            "JOIN skus s ON p.id = s.product_id\n" +
            "JOIN categories c ON p.category_id = c.id\n" +
            "JOIN brands b ON p.brand_id = b.id\n" +
            "\n" +
            "LEFT JOIN (\n" +
            "    SELECT s1.product_id, s1.price\n" +
            "    FROM skus s1\n" +
            "    JOIN (\n" +
            "        SELECT product_id, MIN(sku_code) AS min_code\n" +
            "        FROM skus\n" +
            "        GROUP BY product_id\n" +
            "    ) t ON s1.product_id = t.product_id AND s1.sku_code = t.min_code\n" +
            ") s_min ON s_min.product_id = p.id\n" +
            "\n" +
            "GROUP BY \n" +
            "    p.id, p.name,\n" +
            "    c.id, c.name,\n" +
            "    b.id, b.name,\n" +
            "    s_min.price", nativeQuery = true)
    Page<ProductSummaryResponse> findAllProductsSummary(Pageable pageable);
}
