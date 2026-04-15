package fit.iuh.laptify_backend.product.repository;

import fit.iuh.laptify_backend.product.entity.Sku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkuRepository extends JpaRepository<Sku, String> {
    @Query("""
    SELECT sku FROM Sku sku
    JOIN FETCH sku.product p
    WHERE sku.skuCode IN (:skuCodes)
    ORDER BY sku.skuCode
""")
    List<Sku> findSkusWithProductByCode(@Param("skuCodes") List<String> skuCodes);

}
