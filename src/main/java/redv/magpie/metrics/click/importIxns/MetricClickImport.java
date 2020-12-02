package redv.magpie.metrics.click.importIxns;

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
public class MetricClickImport {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long targetId;
  private long ixnsImported;
  private String userName;
  private Timestamp timestamp;

  public MetricClickImport(MetricClickImportJson json) {
    this.targetId = json.getTargetId();
    this.ixnsImported = json.getIxnsImported();
    this.userName = json.getUserName();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
