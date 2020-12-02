package redv.magpie.rfis;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class HistoricalRfi {
  private Rfi rfi;
  private Date completionDate;
  private String productName;
  private RfiFeedback feedback;

  public HistoricalRfi(Rfi rfi, Date completionDate, String productName, RfiFeedback feedback) {
    this.rfi = rfi;
    this.completionDate = completionDate;
    this.productName = productName;
    this.feedback = feedback;
  }
}
