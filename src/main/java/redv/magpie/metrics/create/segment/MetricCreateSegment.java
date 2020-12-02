package redv.magpie.metrics.create.segment;

import redv.magpie.ixns.SegmentJson;
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
public class MetricCreateSegment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;

  private Timestamp segmentStart;
  private Timestamp segmentEnd;

  private Timestamp timestamp;


  public MetricCreateSegment(long segmentId, SegmentJson segment) {
    this.segmentId = segmentId;
    this.rfiId = segment.getRfiId();
    this.exploitDateId = segment.getExploitDateId();
    this.targetId = segment.getTargetId();
    this.segmentStart = segment.getStartTime();
    this.segmentEnd = segment.getEndTime();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
