package redv.magpie.metrics;

import lombok.Getter;

@Getter
public class AcceptRejectTally {
  private final String userName;
  private long accepted;
  private long total;

  public AcceptRejectTally(String userName) {
    this.userName = userName;
    this.accepted = 0;
    this.total = 0;
  }

  public void incrementAccepted() {
    this.accepted++;
  }

  public void incrementTotal() {
    this.total++;
  }
}
