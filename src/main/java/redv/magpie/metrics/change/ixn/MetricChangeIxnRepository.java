package redv.magpie.metrics.change.ixn;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface MetricChangeIxnRepository extends JpaRepository<MetricChangeIxn, Long> {
  List<MetricChangeIxn> findByNewDataEquals(String status);
  @Query("SELECT metric FROM MetricChangeIxn metric WHERE metric.field = 'status' AND metric.newData = 'COMPLETED'")
  List<MetricChangeIxn> findAllStatusChangeToComplete();

  @Query("SELECT metric FROM MetricChangeIxn metric WHERE metric.field = 'approval_status' AND metric.ixnId = ?1 AND " +
          "metric.timestamp > ?2")
  List<MetricChangeIxn> findRejectionOrAcceptanceByIxnIdAfterTime(long ixnId, Timestamp timestamp);
}
