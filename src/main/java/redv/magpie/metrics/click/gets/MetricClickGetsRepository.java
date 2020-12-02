package redv.magpie.metrics.click.gets;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetricClickGetsRepository extends JpaRepository<MetricClickGets, Long> {
  List<MetricClickGets> findAllByStatus(String status);
}
