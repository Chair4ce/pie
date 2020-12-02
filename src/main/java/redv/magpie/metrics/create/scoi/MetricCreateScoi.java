package redv.magpie.metrics.create.scoi;

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
public class MetricCreateScoi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long scoiId;
  private String userName;
  private Timestamp timestamp;

  public MetricCreateScoi(long scoiId, String userName) {
    this.scoiId = scoiId;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
