package redv.magpie.ixns;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class IxnJson {
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;
  private String exploitAnalyst;
  private Timestamp time;
  private String activity;
  private String trackAnalyst;
  private String status;
  private String checker;
  private String trackNarrative;
  private String note;
  private String approvalStatus;

  public IxnJson(long rfiId, long exploitDateId, long targetId, long segmentId, String exploitAnalyst, Timestamp time,
                 String activity, String trackAnalyst, String status, String checker,
                 String trackNarrative, String note, String approvalStatus) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.segmentId = segmentId;
    this.exploitAnalyst = exploitAnalyst;
    this.time = time;
    this.activity = activity;
    this.trackAnalyst = trackAnalyst;
    this.status = status;
    this.checker = checker;
    this.trackNarrative = trackNarrative;
    this.note = note;
    this.approvalStatus = approvalStatus;
  }
}
