package redv.magpie.metrics.create.target;

import redv.magpie.metrics.TimestampMetric;
import redv.magpie.tgts.TargetJson;
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
public class MetricCreateTarget implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;
  private Timestamp timestamp;
  private String userName;
  private Boolean isCopy;

  public MetricCreateTarget(long targetId, TargetJson target, String name, String userName, Boolean isCopy) {
    this.rfiId = target.getRfiId();
    this.exploitDateId = target.getExploitDateId();
    this.targetId = targetId;
    this.name = name;
    this.mgrs = target.getMgrs();
    this.notes = target.getNotes();
    this.description = target.getDescription();
    this.timestamp = new Timestamp(new Date().getTime());
    this.userName = userName.toLowerCase();
    this.isCopy = isCopy;
  }
}
