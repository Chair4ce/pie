package redv.magpie.scois;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScoiJson {
  private String name;
  private String mgrs;

  public ScoiJson(String name, String mgrs) {
    this.name = name;
    this.mgrs = mgrs;
  }
}
