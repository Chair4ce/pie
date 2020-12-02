package redv.magpie.ixns;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Getter
@Setter
public class SegmentJson {
  private long id;

  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private Timestamp startTime;
  private Timestamp endTime;

  public SegmentJson(long id,
                     long rfiId,
                     long exploitDateId,
                     long targetId,
                     Timestamp startTime,
                     Timestamp endTime) {
    this.id = id;
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public SegmentJson(long rfiId,
                     long exploitDateId,
                     long targetId,
                     Timestamp startTime,
                     Timestamp endTime) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
