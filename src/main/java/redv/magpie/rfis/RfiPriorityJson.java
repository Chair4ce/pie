package redv.magpie.rfis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RfiPriorityJson {
  private String rfiNum;
  private int priority;
}
