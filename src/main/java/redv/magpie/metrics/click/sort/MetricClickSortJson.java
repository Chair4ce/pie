package redv.magpie.metrics.click.sort;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MetricClickSortJson {
  private Date datetime;
  private String key;
  private boolean orderAscending;
}
