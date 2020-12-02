package redv.magpie.metrics.undo.targetCreate;

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
public class MetricUndoTargetCreate implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long targetId;
  private String userName;
  private Timestamp timestamp;

  public MetricUndoTargetCreate(long targetId, String userName) {
    this.targetId = targetId;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
