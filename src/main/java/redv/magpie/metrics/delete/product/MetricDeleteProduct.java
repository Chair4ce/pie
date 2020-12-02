package redv.magpie.metrics.delete.product;

import redv.magpie.metrics.TimestampMetric;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricDeleteProduct implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private String userName;

  private Timestamp timestamp;

  public MetricDeleteProduct(String rfiNum, String userName, Timestamp timestamp) {
    this.rfiNum = rfiNum;
    this.userName = userName;
    this.timestamp = timestamp;
  }
}
