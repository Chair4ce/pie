package redv.magpie.scois;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class RfiAssociation {
  private String rfiNum;
  private String description;
}
