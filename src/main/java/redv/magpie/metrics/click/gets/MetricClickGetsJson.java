package redv.magpie.metrics.click.gets;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MetricClickGetsJson {
  private Date datetime;
  private String status;
  private String url;
}
