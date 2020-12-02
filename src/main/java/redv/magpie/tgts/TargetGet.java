package redv.magpie.tgts;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class TargetGet {
  private long id;
  private long rfiId;
  private long exploitDateId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;
  private String status;
  private String hourlyRollup;
  private String allCallouts;
  private Timestamp deleted;
  private boolean containsRejectedTracks;

  public TargetGet(Target target,
                   boolean containsRejectedTracks) {
    this.id = target.getId();
    this.rfiId = target.getRfiId();
    this.exploitDateId = target.getExploitDateId();
    this.name = target.getName();
    this.mgrs = target.getMgrs();
    this.notes = target.getNotes();
    this.description = target.getDescription();
    this.status = target.getStatus();
    this.hourlyRollup = target.getHourlyRollup();
    this.allCallouts = target.getAllCallouts();
    this.deleted = target.getDeleted();
    this.containsRejectedTracks = containsRejectedTracks;
  }
}
