package redv.magpie.metrics.change.rfiPriority;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface MetricChangeRfiPriorityRepository extends JpaRepository<MetricChangeRfiPriority, Long> {
  @Query("SELECT DISTINCT prioritization.datetime FROM MetricChangeRfiPriority prioritization " +
    "WHERE prioritization.datetime BETWEEN ?1 AND ?2")
  List<MetricChangeRfiPriority> findAllUniquePrioritizationsDuringWeek(Date weekStart, Date weekEnd);
}
