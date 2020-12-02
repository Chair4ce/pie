package redv.magpie.metrics.undo.ixnDelete;

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
public class MetricUndoIxnDelete implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  long ixnId;
  Timestamp timestamp;

  public MetricUndoIxnDelete(long ixnId) {
    this.ixnId = ixnId;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
