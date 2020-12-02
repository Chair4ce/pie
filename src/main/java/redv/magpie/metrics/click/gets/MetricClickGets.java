package redv.magpie.metrics.click.gets;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricClickGets {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date datetime;
  private String status;
  private String url;

  public MetricClickGets(Date datetime, String status, String url) {
    this.datetime = datetime;
    this.status = status;
    this.url = url;
  }
}
