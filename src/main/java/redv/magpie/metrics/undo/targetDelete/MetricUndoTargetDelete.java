package redv.magpie.metrics.undo.targetDelete;

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
public class MetricUndoTargetDelete implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long targetId;
  private Timestamp timestamp;

  public MetricUndoTargetDelete(long targetId) {
    this.targetId = targetId;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
