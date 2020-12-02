package redv.magpie.metrics.visit.feedbackPage;


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
public class MetricVisitFeedbackPage {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private Timestamp timestamp;

  public MetricVisitFeedbackPage(String rfiNum) {
    this.rfiNum = rfiNum;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
