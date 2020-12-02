package redv.magpie.tgts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "data_target")
public class Target {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private long exploitDateId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;
  private String status;
  @Column(length = 65535)
  private String hourlyRollup;
  @Column(length = 65535)
  private String allCallouts;
  private Timestamp deleted;

  public Target(long rfiId, String mgrs) {
    this.rfiId = rfiId;
    this.exploitDateId = -1;
    this.mgrs = mgrs;
    this.status = TargetStatus.NOT_STARTED;
    this.name = "";
    this.notes = "";
    this.description = "";
    this.hourlyRollup = "";
    this.allCallouts = "";
    this.deleted = null;
  }

  public Target(TargetJson targetJson, String name) {
    if (targetJson.getTargetId() > 0) {
      this.id = targetJson.getTargetId();
    }
    this.rfiId = targetJson.getRfiId();
    this.exploitDateId = targetJson.getExploitDateId();
    this.name = name;
    this.mgrs = targetJson.getMgrs();
    this.notes = targetJson.getNotes();
    this.description = targetJson.getDescription();
    this.status = targetJson.getStatus();
    this.hourlyRollup = targetJson.getHourlyRollup();
    this.allCallouts = targetJson.getAllCallouts();
  }

  public List<String> compare(TargetJson other) {
    ArrayList<String> diff = new ArrayList<>();

    if (!this.mgrs.equals(other.getMgrs())) {
      diff.add("mgrs");
    }

    try {
      if (!this.notes.equals(other.getNotes())) {
        diff.add("notes");
      }
    } catch (NullPointerException e) {
      diff.add("notes");
    }

    try {
      if (!this.description.equals(other.getDescription())) {
        diff.add("description");
      }
    } catch (NullPointerException e) {
      diff.add("description");
    }

    try {
      if (!this.status.equals(other.getStatus())) {
        diff.add("status");
      }
    } catch (NullPointerException e) {
      diff.add("status");
    }

    try {
      if (!this.hourlyRollup.equals(other.getHourlyRollup())) {
        diff.add("hourly_rollup");
      }
    } catch (NullPointerException e) {
      diff.add("hourly_rollup");
    }

    try {
      if (!this.allCallouts.equals(other.getAllCallouts())) {
        diff.add("all_callouts");
      }
    } catch (NullPointerException e) {
      diff.add("all_callouts");
    }

    return diff;
  }

}
