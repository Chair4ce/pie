package redv.magpie.rfis;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@NoArgsConstructor
public class RfiGet {
  private long id;
  private String description;
  private String justification;
  private String rfiNum;
  private String getsUrl;
  private String status;
  private Timestamp lastUpdate;
  private String customerTitle;
  private String customerGivenName;
  private String customerSurname;
  private String customerEmail;
  private String customerUnit;
  private String customerCommPhone;
  private String customerDsnPhone;
  private String customerSvoip;
  private String customerTsvoip;
  private Timestamp ltiov;
  private String country;
  private int priority;
  private long tgtCount;
  private long ixnCount;
  private Date startDate;
  private Date completionDate;
  private boolean containsRejectedTracks;
  private boolean areAllTracksComplete;
  private String productName;

  public RfiGet(Rfi rfi, long tgtCount, long ixnCount, Date startDate, long completionTimeInMS,
                boolean containsRejectedTracks, boolean areAllTracksComplete, String productName) {
    this.id = rfi.getId();
    this.description = rfi.getDescription();
    this.justification = rfi.getJustification();
    this.rfiNum = rfi.getRfiNum();
    this.getsUrl = rfi.getGetsUrl();
    this.status = rfi.getStatus();
    this.lastUpdate = rfi.getLastUpdate();
    this.customerTitle = rfi.getCustomerTitle();
    this.customerGivenName = rfi.getCustomerGivenName();
    this.customerSurname = rfi.getCustomerSurname();
    this.customerEmail = rfi.getCustomerEmail();
    this.customerUnit = rfi.getCustomerUnit();
    this.customerCommPhone = rfi.getCustomerCommPhone();
    this.customerDsnPhone = rfi.getCustomerDsnPhone();
    this.customerSvoip = rfi.getCustomerSvoip();
    this.customerTsvoip = rfi.getCustomerTsvoip();
    this.ltiov = rfi.getLtiov();
    this.country = rfi.getCountry();
    this.priority = rfi.getPriority();
    this.tgtCount = tgtCount;
    this.ixnCount = ixnCount;
    this.startDate = startDate;
    if (completionTimeInMS > 0 && startDate != null) {
      this.completionDate = new Date(startDate.getTime() + completionTimeInMS);
    } else {
      this.completionDate = null;
    }
    this.containsRejectedTracks = containsRejectedTracks;
    this.areAllTracksComplete = areAllTracksComplete;
    this.productName = productName;
  }

  public RfiGet(Rfi rfi, long tgtCount, long ixnCount, Date startDate, Date completionDate,
                boolean containsRejectedTracks, boolean areAllTracksComplete, String productName) {
    this.id = rfi.getId();
    this.description = rfi.getDescription();
    this.justification = rfi.getJustification();
    this.rfiNum = rfi.getRfiNum();
    this.getsUrl = rfi.getGetsUrl();
    this.status = rfi.getStatus();
    this.lastUpdate = rfi.getLastUpdate();
    this.customerTitle = rfi.getCustomerTitle();
    this.customerGivenName = rfi.getCustomerGivenName();
    this.customerSurname = rfi.getCustomerSurname();
    this.customerEmail = rfi.getCustomerEmail();
    this.customerUnit = rfi.getCustomerUnit();
    this.customerCommPhone = rfi.getCustomerCommPhone();
    this.customerDsnPhone = rfi.getCustomerDsnPhone();
    this.customerSvoip = rfi.getCustomerSvoip();
    this.customerTsvoip = rfi.getCustomerTsvoip();
    this.ltiov = rfi.getLtiov();
    this.country = rfi.getCountry();
    this.priority = rfi.getPriority();
    this.tgtCount = tgtCount;
    this.ixnCount = ixnCount;
    this.startDate = startDate;
    this.completionDate = completionDate;
    this.containsRejectedTracks = containsRejectedTracks;
    this.areAllTracksComplete = areAllTracksComplete;
    this.productName = productName;
  }
}
