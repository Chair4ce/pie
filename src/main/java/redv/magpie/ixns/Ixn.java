package redv.magpie.ixns;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_ixn")
public class Ixn {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;
  private String exploitAnalyst;
  private Timestamp time;
  private String activity;
  private String track;
  private String trackAnalyst;
  private String status;
  private String checker;
  private String approvalStatus;

  @Column(length = 65535)
  private String trackNarrative;
  private String note;

  public Ixn(long rfiId, long exploitDateId, long targetId, long segmentId, String exploitAnalyst, Timestamp time,
             String activity, String track, String trackAnalyst, String status, String checker,
             String approvalStatus) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.segmentId = segmentId;
    this.exploitAnalyst = exploitAnalyst;
    this.time = time;
    this.activity = activity;
    this.track = track;
    this.trackAnalyst = trackAnalyst;
    this.status = status;
    this.checker = checker;
    this.trackNarrative = "";
    this.note = "";
    this.approvalStatus = approvalStatus;
  }

  public Ixn(IxnJson ixnJson) {
    this.rfiId = ixnJson.getRfiId();
    this.exploitDateId = ixnJson.getExploitDateId();
    this.targetId = ixnJson.getTargetId();
    this.segmentId = ixnJson.getSegmentId();
    this.exploitAnalyst = ixnJson.getExploitAnalyst();
    this.time = ixnJson.getTime();
    this.activity = ixnJson.getActivity();
    this.track = "";
    this.trackAnalyst = ixnJson.getTrackAnalyst();
    this.status = ixnJson.getStatus();
    this.checker = ixnJson.getChecker();
    this.trackNarrative = ixnJson.getTrackNarrative();
    this.note = ixnJson.getNote();
    this.approvalStatus = ixnJson.getApprovalStatus();
  }

  public List<String> compare(IxnJson other) {
    ArrayList<String> diff = new ArrayList<>();

    try {
      if (!this.exploitAnalyst.equals(other.getExploitAnalyst())) {
        diff.add("exploit_analyst");
      }
    } catch (NullPointerException e) {
      diff.add("exploit_analyst");
    }

    try {
      if (!this.time.equals(other.getTime())) {
        diff.add("time");
      }
    } catch (NullPointerException e) {
      diff.add("time");
    }

    try {
      if (!this.activity.equals(other.getActivity())) {
        diff.add("activity");
      }
    } catch (NullPointerException e) {
      diff.add("activity");
    }

    try {
      if (!this.trackAnalyst.equals(other.getTrackAnalyst())) {
        diff.add("track_analyst");
      }
    } catch (NullPointerException e) {
      diff.add("track_analyst");
    }

    try {
      if (!this.status.equals(other.getStatus())) {
        diff.add("status");
      }
    } catch (NullPointerException e) {
      diff.add("status");
    }

    try {
      if (!this.checker.equals(other.getChecker())) {
        diff.add("checker");
      }
    } catch (NullPointerException e) {
      diff.add("checker");
    }

    try {
      if (!this.trackNarrative.equals(other.getTrackNarrative())) {
        diff.add("track_narrative");
      }
    } catch (NullPointerException e) {
      diff.add("track_narrative");
    }

    try {
      if (!this.note.equals(other.getNote())) {
        diff.add("note");
      }
    } catch (NullPointerException e) {
      diff.add("note");
    }

    try {
      if (!this.approvalStatus.equals(other.getApprovalStatus())) {
        diff.add("approval_status");
      }
    } catch (NullPointerException e) {
      diff.add("approval_status");
    }

    return diff;
  }
}
