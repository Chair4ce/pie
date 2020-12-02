package redv.magpie.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPerformanceMetric {
  private String userName;
  private int approvalRating;
}
