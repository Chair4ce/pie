package redv.magpie.metrics.click.trackNarrative;

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
public class MetricClickTrackNarrative {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long ixnId;
  private String userName;
  private Timestamp timestamp;

  public MetricClickTrackNarrative(MetricClickTrackNarrativeJson json) {
    this.ixnId = json.getIxnId();
    this.userName = json.getUserName();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
