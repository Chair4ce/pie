package redv.magpie.scois;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "data_scoi")
public class Scoi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String name;
  private String mgrs;
  private String note;

  public Scoi(String name, String mgrs, String note) {
    this.name = name;
    this.mgrs = mgrs;
    this.note = note;
  }

  public List<String> compare(Scoi otherScoi) {
    List<String> diff = new ArrayList<>();

    try {
      if (!this.name.equals(otherScoi.getName())) {
        diff.add("name");
      }
    } catch (NullPointerException e) {
      if (!(this.name == null && otherScoi.getName() == null)) {
        diff.add("name");
      }
    }

    try {
      if (!this.mgrs.equals(otherScoi.getMgrs())) {
        diff.add("mgrs");
      }
    } catch (NullPointerException e) {
      if (!(this.mgrs == null && otherScoi.getMgrs() == null)) {
        diff.add("mgrs");
      }
    }

    try {
      if (!this.note.equals(otherScoi.getNote())) {
        diff.add("note");
      }
    } catch (NullPointerException e) {
      if (!(this.note == null && otherScoi.getNote() == null)) {
        diff.add("note");
      }
    }

    return diff;
  }
}
