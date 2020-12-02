package redv.magpie.metrics.click.scoreboard;

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
public class MetricClickScoreboard {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String userName;
  private Timestamp timestamp;

  public MetricClickScoreboard(String userName) {
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
