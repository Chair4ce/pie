package redv.magpie.metrics.change.ixn;

import redv.magpie.ixns.IxnJson;
import redv.magpie.metrics.TimestampMetric;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeIxn implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long ixnId;
  private Timestamp timestamp; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String newData;

  private String userName;

  public MetricChangeIxn(
    String field,
    IxnJson newIxn,
    Timestamp timestamp,
    String userName
  ) throws Exception {
    this.ixnId = newIxn.getId();
    this.field = field;
    this.timestamp = timestamp;
    this.userName = userName.toLowerCase();

    switch (field) {
      case "exploit_analyst":
        newData = newIxn.getExploitAnalyst();
        break;
      case "time":
        newData = newIxn.getTime().toString();
        break;
      case "activity":
        newData = newIxn.getActivity();
        break;
      case "track_analyst":
        newData = newIxn.getTrackAnalyst();
        break;
      case "status":
        newData = newIxn.getStatus();
        break;
      case "checker":
        newData = newIxn.getChecker();
        break;
      case "track_narrative":
        newData = newIxn.getTrackNarrative();
        break;
      case "note":
        newData = newIxn.getNote();
        break;
      case "approval_status":
        newData = newIxn.getApprovalStatus();
        break;
      default:
        throw new Exception();
    }
  }
}
