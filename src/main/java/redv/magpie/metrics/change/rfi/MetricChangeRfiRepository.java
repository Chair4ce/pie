package redv.magpie.metrics.change.rfi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface MetricChangeRfiRepository extends JpaRepository<MetricChangeRfi, Long> {
  default MetricChangeRfi findStatusChangeToOpenByRfiNum(String rfiNum) {
    List<MetricChangeRfi> list = findStatusChangesToOpenByRfiNum(rfiNum);
    if (list.size() > 0) {
      return list.get(list.size() - 1);
    }
    return null;
  }

  default MetricChangeRfi findStatusChangeToClosedByRfiNum(String rfiNum) {
    List<MetricChangeRfi> list = findStatusChangesToClosedByRfiNum(rfiNum);
    if (list.size() > 0) {
      return list.get(list.size() - 1);
    }
    return null;
  }

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'OPEN' AND " +
    "metric.rfiNum = ?1")
  List<MetricChangeRfi> findStatusChangesToOpenByRfiNum(String rfiNum);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'CLOSED' AND " +
    "metric.rfiNum = ?1")
  List<MetricChangeRfi> findStatusChangesToClosedByRfiNum(String rfiNum);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'CLOSED' AND " +
    "metric.datetime BETWEEN ?1 AND ?2")
  List<MetricChangeRfi> findStatusChangeToClosedBetweenDateRange(Date start, Date end);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'OPEN'")
  List<MetricChangeRfi> findAllStatusChangeToOpen();
}
