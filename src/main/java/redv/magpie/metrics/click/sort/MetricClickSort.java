package redv.magpie.metrics.click.sort;

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
public class MetricClickSort {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date datetime;
  private String sortKey;
  private boolean sortOrderAscending;

  public MetricClickSort(Date datetime, String key, boolean order) {
    this.datetime = datetime;
    this.sortKey = key;
    this.sortOrderAscending = order;
  }
}
