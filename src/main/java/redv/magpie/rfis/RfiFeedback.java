package redv.magpie.rfis;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_rfi_feedback")
public class RfiFeedback {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private int stars;
  private String timeliness;
  private String quality;
  private String missionImpact;

  @Column(length = 65535)
  private String comments;

  public RfiFeedback(String rfiNum, int stars, String timeliness, String quality, String missionImpact, String comments) {
    this.rfiNum = rfiNum;
    this.stars = stars;
    this.timeliness = timeliness;
    this.quality = quality;
    this.missionImpact = missionImpact;
    this.comments = comments;
  }

  public RfiFeedback(RfiFeedbackJson json) {
    this.rfiNum = json.getRfiNum();
    this.stars = json.getStars();
    this.timeliness = json.getTimeliness();
    this.quality = json.getQuality();
    this.missionImpact = json.getMissionImpact();
    this.comments = json.getComments();
  }
}
