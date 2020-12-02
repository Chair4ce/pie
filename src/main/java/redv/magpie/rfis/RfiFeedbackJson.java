package redv.magpie.rfis;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class RfiFeedbackJson {
  private String rfiNum;
  private int stars;
  private String timeliness;
  private String quality;
  private String missionImpact;
  private String comments;

  public RfiFeedbackJson(String rfiNum, int stars, String timeliness, String quality, String missionImpact,
                         String comments) {
    this.rfiNum = rfiNum;
    this.stars = stars;
    this.timeliness = timeliness;
    this.quality = quality;
    this.missionImpact = missionImpact;
    this.comments = comments;
  }
}
