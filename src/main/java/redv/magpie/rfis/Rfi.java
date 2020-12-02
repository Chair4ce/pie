package redv.magpie.rfis;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_rfi")
public class Rfi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(length = 65535)
  private String description;
  @Column(length = 65535)
  private String justification;
  private String rfiNum;
  private String getsUrl;
  private String status;
  private Timestamp lastUpdate;
  private String customerUnit;
  private Timestamp ltiov;
  private String country;
  private int priority;
  private Timestamp receiveDate;
  private String customerTitle;
  private String customerGivenName;
  private String customerSurname;
  private String customerEmail;
  private String customerCommPhone;
  private String customerDsnPhone;
  private String customerSvoip;
  private String customerTsvoip;
  private String mgrsList;

  public Rfi(
    String rfiNum,
    String getsUrl,
    String status,
    Date lastUpdate,
    String customerUnit,
    Date ltiov,
    String country,
    String description,
    String justification,
    String customerTitle,
    String customerGivenName,
    String customerSurname,
    String customerEmail,
    String customerCommPhone,
    String customerDsnPhone,
    String customerSvoip,
    String customerTsvoip,
    String mgrsList
  ) {
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customerUnit = customerUnit;

    try {
      this.ltiov = new Timestamp(ltiov.getTime());
    } catch (NullPointerException e) {
      this.ltiov = null;
    }

    this.country = country;
    this.description = description;
    this.priority = -1;
    this.receiveDate = new Timestamp(new Date().getTime());
    this.justification = justification;
    this.customerTitle = customerTitle;
    this.customerGivenName = customerGivenName;
    this.customerSurname = customerSurname;
    this.customerEmail = customerEmail;
    this.customerCommPhone = customerCommPhone;
    this.customerDsnPhone = customerDsnPhone;
    this.customerSvoip = customerSvoip;
    this.customerTsvoip = customerTsvoip;
    this.mgrsList = mgrsList;
  }

  public Rfi(
    String rfiNum,
    String getsUrl,
    String status,
    Date lastUpdate,
    String customerUnit,
    Date ltiov,
    String country,
    String description,
    String justification,
    int priority,
    String customerTitle,
    String customerGivenName,
    String customerSurname,
    String customerEmail,
    String customerCommPhone,
    String customerDsnPhone,
    String customerSvoip,
    String customerTsvoip,
    String mgrsList
  ) {
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customerUnit = customerUnit;
    this.ltiov = new Timestamp(ltiov.getTime());
    this.country = country;
    this.description = description;
    this.justification = justification;
    this.priority = priority;
    this.customerTitle = customerTitle;
    this.customerGivenName = customerGivenName;
    this.customerSurname = customerSurname;
    this.customerEmail = customerEmail;
    this.customerCommPhone = customerCommPhone;
    this.customerDsnPhone = customerDsnPhone;
    this.customerSvoip = customerSvoip;
    this.customerTsvoip = customerTsvoip;
    this.mgrsList = mgrsList;
  }

  public List<String> compare(Rfi otherRfi) {
    List<String> diff = new ArrayList<>();

    if (!this.getsUrl.equals(otherRfi.getsUrl))
      diff.add("getsUrl");

    try {
      if (!this.status.equals(otherRfi.status))
        diff.add("status");
    } catch (NullPointerException e) {
      diff.add("status");
    }

    try {
      if (!this.customerTitle.equals(otherRfi.customerTitle))
        diff.add("customerTitle");
    } catch (NullPointerException e) {
      diff.add("customerTitle");
    }

    try {
      if (!this.customerGivenName.equals(otherRfi.customerGivenName))
        diff.add("customerGivenName");
    } catch (NullPointerException e) {
      diff.add("customerGivenName");
    }

    try {
      if (!this.customerSurname.equals(otherRfi.customerSurname))
        diff.add("customerSurname");
    } catch (NullPointerException e) {
      diff.add("customerSurname");
    }

    try {
      if (!this.customerEmail.equals(otherRfi.customerEmail))
        diff.add("customerEmail");
    } catch (NullPointerException e) {
      diff.add("customerEmail");
    }

    try {
      if (!this.customerCommPhone.equals(otherRfi.customerCommPhone))
        diff.add("customerCommPhone");
    } catch (NullPointerException e) {
      diff.add("customerCommPhone");
    }

    try {
      if (!this.customerDsnPhone.equals(otherRfi.customerDsnPhone))
        diff.add("customerDsnPhone");
    } catch (NullPointerException e) {
      diff.add("customerDsnPhone");
    }

    try {
      if (!this.customerSvoip.equals(otherRfi.customerSvoip))
        diff.add("customerSvoip");
    } catch (NullPointerException e) {
      diff.add("customerSvoip");
    }

    try {
      if (!this.customerTsvoip.equals(otherRfi.customerTsvoip))
        diff.add("customerTsvoip");
    } catch (NullPointerException e) {
      diff.add("customerTsvoip");
    }

    try {
      if (!this.ltiov.equals(otherRfi.ltiov))
        diff.add("ltiov");
    } catch (NullPointerException e) {
      if (otherRfi.ltiov != null)
        diff.add("ltiov");
    }

    try {
      if (!this.country.equals(otherRfi.country))
        diff.add("country");
    } catch (NullPointerException e) {
      diff.add("country");
    }

    try {
      if (!this.description.equals(otherRfi.description))
        diff.add("description");
    } catch (NullPointerException e) {
      diff.add("description");
    }

    try {
      if (!this.justification.equals(otherRfi.justification))
        diff.add("justification");
    } catch (NullPointerException e) {
      diff.add("justification");
    }

    return diff;
  }

}

class SortByRecentFirst implements Comparator<Rfi> {
  public int compare(Rfi a, Rfi b) {
    return b.getLastUpdate().compareTo(a.getLastUpdate());
  }
}

class SortByAscendingPriority implements Comparator<Rfi> {
  public int compare(Rfi a, Rfi b) {
    return a.getPriority() - b.getPriority();
  }
}
