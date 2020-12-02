package redv.magpie.rfis;

import java.sql.Timestamp;
import java.util.*;

class RandomText {
  private static final Random rand = new Random();

  private static final String[] customers = {"O5 COUNCIL", "ULTRAMARINES", "UNSC SWC", "1 FW", "633d ABW"};
  private static final String[] producers = {"SITE-17", "AREA-51", "SG-1", "10IS", "DGS-1"};
  private static final String[] countries = {"HKG", "VAT", "GRL", "PRK", "ETK"};
  private static final String[] adjectives1 = {"angry", "rapid", "lucky", "slowly", "non"};
  private static final String[] adjectives2 = {"Responsive", "Inverted", "Downtrodden", "Optional", "Primary"};
  private static final String[] nouns = {"Koala", "Racecar", "Screwdriver", "Statue", "Dinasaur"};
  private static final String[] tlds = {"com", "org", "net", "xyz", "gov"};
  private static final String[] reports = {"a report", "a bluf", "statistics", "figures", "analysis"};
  private static final String[] organizations = {"secret police's", "special forces'", "colonial marines'", "intelligence agency's", "citizens'"};
  private static final String[] actions = {"facilities within", "influence on", "operations against", "conspiracies about", "destruction of"};
  private static final String[] locations = {"the moon", "krakatowa", "the nether", "Washington DC", "Langley AFB"};

  private static String producer() {return producers[rand.nextInt(producers.length)];}
  private static String country() {return countries[rand.nextInt(countries.length)];}
  private static String customer() {return customers[rand.nextInt(customers.length)];}
  private static String adjective1() {return adjectives1[rand.nextInt(adjectives1.length)];}
  private static String adjective2() {return adjectives2[rand.nextInt(adjectives2.length)];}
  private static String noun() {return nouns[rand.nextInt(nouns.length)];}
  private static String tld() {return tlds[rand.nextInt(tlds.length)];}
  private static String report() {return reports[rand.nextInt(reports.length)];}
  private static String organization() {return organizations[rand.nextInt(organizations.length)];}
  private static String action() {return actions[rand.nextInt(actions.length)];}
  private static String location() {return locations[rand.nextInt(locations.length)];}

  // Ex: DGS-1-SDT-2020-00321
  public String randomRfiId() {
    String x = Integer.toString(rand.nextInt(1000));
    return RandomText.producer() +
      "-2020-" +
      ("00000" + x).substring(x.length());
  }

  // Ex: USA
  public String randomCountry() { return RandomText.country(); }

  // Ex: 1 FW
  public String randomCustomer() { return RandomText.customer(); }

  // Ex: NEW
  public String randomStatus() {
    switch(rand.nextInt(3)){
      case 0:
        return "NEW";
      case 1:
        return "OPEN";
      default:
        return "CLOSED";
    }
  }

  // Within the next 365 days
  public Timestamp randomLtiov() {
    Calendar ltiov = Calendar.getInstance();
    ltiov.add(Calendar.DAY_OF_YEAR, rand.nextInt(366));
    return new Timestamp(ltiov.getTime().getTime());
  }

  // Within the past 365 days
  public Timestamp randomLastUpdate() {
    Calendar ltiov = Calendar.getInstance();
    ltiov.add(Calendar.DAY_OF_YEAR, -rand.nextInt(366));
    return new Timestamp(ltiov.getTime().getTime());
  }

  // Ex: http://www.luckyInvertedStatue.gov
  public String randomGetsUrl(){
    return "http://www." +
      RandomText.adjective1() +
      RandomText.adjective2() +
      RandomText.noun() +
      "." + RandomText.tld();
  }

  // EX: The UNSC SWC needs statistics on the PRK colonial marines' destruction of the moon.
  public String randomDescription() {
    return "The " + RandomText.customer() +
      " needs " + RandomText.report() +
      " on the " + RandomText.country() + " " +
      RandomText.organization() + " " +
      RandomText.action() + " " +
      RandomText.location() + '.';
  }
}

public class RandomRfi {
  public final RandomText get = new RandomText();

  private String description;
  private String rfiId;
  private String getsUrl;
  private String status;
  private Timestamp lastUpdate;
  private String customer;
  private Timestamp ltiov;
  private String country;
  private int priority;

  public RandomRfi setRfiId(String rfiId){
    this.rfiId = rfiId;
    return this;
  }

  public RandomRfi setStatus(String status) {
    this.status = status;
    return this;
  }

  public RandomRfi setPriority(int priority) {
    this.priority = priority;
    return this;
  }

  public RandomRfi setLastUpdate(Date lastUpdate){
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    return this;
  }

  public void randomize() {
    this.rfiId = get.randomRfiId();
    this.country = get.randomCountry();
    this.customer = get.randomCustomer();
    this.status = get.randomStatus();
    this.ltiov = get.randomLtiov();
    this.lastUpdate = get.randomLastUpdate();
    this.getsUrl = get.randomGetsUrl();
    this.description = get.randomDescription();
    this.priority = -1;
  }

  public RandomRfi() {
    this.randomize();
  }

  public Rfi toRfi(){
    Rfi rfi = new Rfi(
      this.rfiId,
      this.getsUrl,
      this.status,
      this.lastUpdate,
      this.customer,
      this.ltiov,
      this.country,
      this.description,
      "This is a justifiction",
      this.priority,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "");
    this.randomize();
    return rfi;
  }
}
