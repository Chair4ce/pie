package redv.magpie.metrics.undo.changeRfiPriority;

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
public class MetricUndoChangeRfiPriority {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private String userName;
  private Timestamp timestamp;

  public MetricUndoChangeRfiPriority(long rfiId, String userName) {
    this.rfiId = rfiId;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
