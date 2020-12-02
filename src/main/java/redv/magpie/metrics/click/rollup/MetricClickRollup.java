package redv.magpie.metrics.click.rollup;

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
public class MetricClickRollup {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long targetId;
  private String userName;
  private Timestamp timestamp;

  public MetricClickRollup(MetricClickRollupJson json) {
    this.targetId = json.getTargetId();
    this.userName = json.getUserName();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
