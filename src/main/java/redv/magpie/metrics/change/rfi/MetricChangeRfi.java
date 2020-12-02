package redv.magpie.metrics.change.rfi;

import redv.magpie.rfis.Rfi;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeRfi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private Date datetime; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String oldData;

  @Column(length = 65535)
  private String newData;

  public MetricChangeRfi(
    String rfiNum,
    Date datetime,
    String field,
    String oldData,
    String newData
  ) {
    this.rfiNum = rfiNum;
    this.datetime = datetime;
    this.field = field;
    this.oldData = oldData;
    this.newData = newData;
  }

  public MetricChangeRfi(
    Date datetime,
    Rfi newRfi,
    Rfi oldRfi,
    String field
  ) {
    this.rfiNum = newRfi.getRfiNum();
    this.datetime = datetime;
    this.field = field;
    switch (field) {
      case "description":
        this.oldData = oldRfi.getDescription();
        this.newData = newRfi.getDescription();
        break;

      case "justification":
        this.oldData = oldRfi.getJustification();
        this.newData = newRfi.getJustification();
        break;

      case "country":
        this.oldData = oldRfi.getCountry();
        this.newData = newRfi.getCountry();
        break;

      case "ltiov": // this is the only field that could be null to string
        if (oldRfi.getLtiov() == null) {
          this.oldData = "not set";
        } else {
          this.oldData = oldRfi.getLtiov().toString();
        }
        if (newRfi.getLtiov() == null) {
          this.newData = "not set";
        } else {
          this.newData = newRfi.getLtiov().toString();
        }
        break;

      case "customerTitle":
        this.oldData = oldRfi.getCustomerTitle();
        this.newData = newRfi.getCustomerTitle();
        break;

      case "customerGivenName":
        this.oldData = oldRfi.getCustomerGivenName();
        this.newData = newRfi.getCustomerGivenName();
        break;

      case "customerSurname":
        this.oldData = oldRfi.getCustomerSurname();
        this.newData = newRfi.getCustomerSurname();
        break;

      case "customerEmail":
        this.oldData = oldRfi.getCustomerEmail();
        this.newData = newRfi.getCustomerEmail();
        break;

      case "customerCommPhone":
        this.oldData = oldRfi.getCustomerCommPhone();
        this.newData = newRfi.getCustomerCommPhone();
        break;

      case "customerDsnPhone":
        this.oldData = oldRfi.getCustomerDsnPhone();
        this.newData = newRfi.getCustomerDsnPhone();
        break;

      case "customerSvoip":
        this.oldData = oldRfi.getCustomerSvoip();
        this.newData = newRfi.getCustomerSvoip();
        break;

      case "customerTsvoip":
        this.oldData = oldRfi.getCustomerTsvoip();
        this.newData = newRfi.getCustomerTsvoip();
        break;

      case "status":
        this.oldData = oldRfi.getStatus();
        this.newData = newRfi.getStatus();
        break;

      case "getsUrl":
        this.oldData = oldRfi.getGetsUrl();
        this.newData = newRfi.getGetsUrl();
        break;

      default:
        break;
    }
  }
}
