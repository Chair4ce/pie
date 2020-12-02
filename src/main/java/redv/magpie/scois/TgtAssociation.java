package redv.magpie.scois;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class TgtAssociation {
  private String name;
  private String mgrs;
  private Set<String> emails;

  public TgtAssociation(String name, String mgrs) {
    this.name = name;
    this.mgrs = mgrs;
    this.emails = new HashSet<>();
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof TgtAssociation) {
      TgtAssociation toCompare = (TgtAssociation) obj;
      if (this.name == null) {
        return toCompare.getName() == null;
      }
      return this.name.equals(toCompare.getName());
    }
    return false;
  }

  @Override
  public int hashCode() {
    if (this.name == null) {
      return 0;
    }
    return this.name.hashCode();
  }
}
