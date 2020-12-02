package redv.magpie.metrics.delete.segment;

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
public class MetricDeleteSegment implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long segmentId;
  private boolean hadIxns;
  private Timestamp timestamp;

  public MetricDeleteSegment(long segmentId, boolean hadIxns) {
    this.segmentId = segmentId;
    this.hadIxns = hadIxns;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
