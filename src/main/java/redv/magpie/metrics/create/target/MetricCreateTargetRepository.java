package redv.magpie.metrics.create.target;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface MetricCreateTargetRepository extends JpaRepository<MetricCreateTarget, Long> {
  @Query("SELECT metric from MetricCreateTarget metric WHERE metric.timestamp BETWEEN ?1 AND ?2")
  List<MetricCreateTarget> findTargetsCreatedBetweenDateRange(Date start, Date end);
}
