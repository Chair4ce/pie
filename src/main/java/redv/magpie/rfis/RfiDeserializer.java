package redv.magpie.rfis;

import redv.magpie.Utilities;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.sql.Timestamp;
import java.util.Date;

public class RfiDeserializer {
  private RfiDeserializer() {
  }

  public static Rfi deserialize(Node rfiNode) throws Exception {
    Element element = (Element) rfiNode;

    Rfi rfi = new Rfi(
      getRfiNum(rfiNode),
      getUrl(element),
      getStatus(element),
      getLastUpdate(element),
      getStringFromElement(element, "gets:unit"),
      getLtiov(element),
      getStringFromElement(element, "gets:iso1366trigraph"),
      getStringFromElement(element, "getsrfi:requestText"),
      getStringFromElement(element, "getsrfi:justification"),
      getCustomerTitle(element),
      getStringFromElement(element, "gets:givenname"),
      getStringFromElement(element, "gets:surname"),
      getStringFromElement(element, "gets:email"),
      getStringFromElement(element, "gets:phoneCommercial"),
      getStringFromElement(element, "gets:phoneDSN"),
      getStringFromElement(element, "gets:phoneSVOIP"),
      getStringFromElement(element, "gets:phoneTSVOIP"),
      getMgrs(element)
    );

    Timestamp receiveDate = getReceiveDate(element);

    if (receiveDate != null) {
      rfi.setReceiveDate(receiveDate);
    }

    return rfi;
  }

  private static String getCustomerTitle(Element element) {
    String rank = getStringFromElement(element, "gets:militaryRank");
    if (!rank.equals("")) {
      return rank;
    }
    return getStringFromElement(element, "gets:personalTitle");
  }

  private static String getRfiNum(Node node) {
    return node.getAttributes().getNamedItem("id").getNodeValue();
  }

  private static String getMgrs(Element element) {
    NodeList responses = element.getElementsByTagName("gets:pointTarget");
    String mgrsList = "";

    for (int i = 0; i < responses.getLength(); i++) {
      Node node = responses.item(i);
      Element curr = (Element) node;
      try {
        if (!curr.getAttribute("mgrs").equals("")) {
          mgrsList = mgrsList.concat(
            curr.getAttribute("mgrs")
              + ","
          );
        }
      } catch (Exception e) {

      }
    }

    return mgrsList;
  }

  private static String getUrl(Element element) {
    return getStringFromElement(element, "gets:url");
  }

  private static String getStatus(Element element) {
    NodeList responses = element.getElementsByTagName("getsrfi:Response");

    for (int i = 0; i < responses.getLength(); i++) {
      Node node = responses.item(i);
      Element curr = (Element) node;
      if (curr.getElementsByTagName("gets:producerOrganizationID").item(0).getTextContent().contains("DGS-1")) {
        return curr.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
      }
    }
    return element.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
  }

  private static Timestamp getLastUpdate(Element element) throws Exception {
    Date lastUpdate;
    try {
      lastUpdate = Utilities.parseDate(getStringFromElement(element, "gets:lastUpdate"));
    } catch (Exception e) {
      lastUpdate = Utilities.parseDate(getStringFromElement(element, "getsrfi:receiveDate"));
    }
    return new Timestamp(lastUpdate.getTime());
  }

  private static Timestamp getLtiov(Element element) {
    Timestamp ltiov;
    try {
      Date date = Utilities.parseDate(getStringFromElement(element, "gets:ltiov"));
      ltiov = new Timestamp(date.getTime());
    } catch (Exception e) {
      ltiov = null;
    }
    return ltiov;
  }

  private static String getStringFromElement(Element element, String string) {
    try {
      return element.getElementsByTagName(string).item(0).getTextContent();
    } catch (Exception e) {
      return "";
    }
  }

  private static Timestamp getReceiveDate(Element element) {
    Timestamp receiveDate;
    try {
      Date date = Utilities.parseDate(getStringFromElement(element, "getsrfi:receiveDate"));
      receiveDate = new Timestamp(date.getTime());
    } catch (Exception e) {
      receiveDate = null;
    }
    return receiveDate;
  }
}
