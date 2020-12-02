package redv.magpie.metrics.delete.target;

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
public class MetricDeleteTarget implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long targetId;
  private Timestamp timestamp;

  public MetricDeleteTarget(long targetId) {
    this.targetId = targetId;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
