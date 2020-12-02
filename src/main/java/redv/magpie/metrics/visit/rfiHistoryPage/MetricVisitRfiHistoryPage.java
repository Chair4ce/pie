package redv.magpie.metrics.visit.rfiHistoryPage;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class MetricVisitRfiHistoryPage {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String userName;
  private Timestamp timestamp;

  public MetricVisitRfiHistoryPage(String userName) {
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
