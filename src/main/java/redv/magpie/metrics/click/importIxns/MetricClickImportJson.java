package redv.magpie.metrics.click.importIxns;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetricClickImportJson {
  private long targetId;
  private long ixnsImported;
  private String userName;
}
