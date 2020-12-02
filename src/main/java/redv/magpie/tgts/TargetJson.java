package redv.magpie.tgts;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TargetJson {
  private long targetId;
  private long rfiId;
  private long exploitDateId;
  private String mgrs;
  private String notes;
  private String description;
  private String status;
  private String hourlyRollup;
  private String allCallouts;

  public TargetJson(long rfiId, long exploitDateId, String mgrs, String notes, String description) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.mgrs = mgrs;
    this.notes = notes;
    this.description = description;
    this.status = TargetStatus.NOT_STARTED;
    this.hourlyRollup = "";
    this.allCallouts = "";
  }
}
