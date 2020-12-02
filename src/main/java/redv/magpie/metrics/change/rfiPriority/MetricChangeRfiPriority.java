package redv.magpie.metrics.change.rfiPriority;

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
public class MetricChangeRfiPriority {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private int oldPri;
  private int newPri;
  private String userName;
  private Date datetime;

  public MetricChangeRfiPriority(String rfiNum, int oldPri, int newPri, String userName, Date datetime) {
    this.rfiNum = rfiNum;
    this.oldPri = oldPri;
    this.newPri = newPri;
    this.userName = userName;
    this.datetime = datetime;
  }
}
