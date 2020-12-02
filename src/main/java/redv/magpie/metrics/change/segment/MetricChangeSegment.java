package redv.magpie.metrics.change.segment;

import redv.magpie.ixns.SegmentJson;
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
public class MetricChangeSegment implements TimestampMetric {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long segmentId;
  private Timestamp newSegmentStart;
  private Timestamp newSegmentEnd;
  private Timestamp timestamp;

  public MetricChangeSegment(SegmentJson segment) {
    this.segmentId = segment.getId();
    this.newSegmentStart = segment.getStartTime();
    this.newSegmentEnd = segment.getEndTime();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
