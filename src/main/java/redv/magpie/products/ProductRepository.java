package redv.magpie.products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findAllByRfiIdAndDeletedIsNotNull(long rfiId);
  List<Product> findAllByRfiId(long rfiId);
  List<Product> findAllByDeletedIsNotNull();
  Product findByRfiIdAndDeletedIsNull(long rfiId);
  Product findByRfiId(long rfiId);
}
