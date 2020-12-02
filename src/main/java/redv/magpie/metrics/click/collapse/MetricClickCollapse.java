package redv.magpie.metrics.click.collapse;

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
public class MetricClickCollapse {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String userName;
  private Timestamp timestamp;

  public MetricClickCollapse(String userName) {
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
