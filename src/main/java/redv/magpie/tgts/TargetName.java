package redv.magpie.tgts;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_target_name")
public class TargetName {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String mgrs;
  private String name;

  public TargetName(String mgrs, String name) {
    this.mgrs = mgrs;
    this.name = name;
  }
}
