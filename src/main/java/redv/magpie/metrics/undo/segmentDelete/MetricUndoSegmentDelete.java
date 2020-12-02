package redv.magpie.metrics.undo.segmentDelete;

import redv.magpie.metrics.TimestampMetric;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricUndoSegmentDelete implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long segmentId;
  private Timestamp timestamp;

  public MetricUndoSegmentDelete(long segmentId) {
    this.segmentId = segmentId;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
