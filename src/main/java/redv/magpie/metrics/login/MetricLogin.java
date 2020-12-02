package redv.magpie.metrics.login;

import redv.magpie.metrics.TimestampMetric;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@Getter
@NoArgsConstructor
public class MetricLogin implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String userName;
  private Timestamp timestamp;

  public MetricLogin(String userName) {
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
