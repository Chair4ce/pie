package redv.magpie.ixns;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "data_segment")
public class Segment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private Timestamp startTime;
  private Timestamp endTime;
  private Timestamp deleted;

  public Segment(SegmentJson segmentJson) {
    this.rfiId = segmentJson.getRfiId();
    this.exploitDateId = segmentJson.getExploitDateId();
    this.targetId = segmentJson.getTargetId();
    this.startTime = segmentJson.getStartTime();
    this.endTime = segmentJson.getEndTime();
  }
}
