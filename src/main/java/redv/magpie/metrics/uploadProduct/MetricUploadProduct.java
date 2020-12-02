package redv.magpie.metrics.uploadProduct;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class MetricUploadProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private long uploadId;
  private String userName;
  private Timestamp timestamp;

  public MetricUploadProduct(long rfiId, long uploadId, String userName) {
    this.rfiId = rfiId;
    this.uploadId = uploadId;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
