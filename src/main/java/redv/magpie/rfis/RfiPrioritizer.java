package redv.magpie.rfis;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class RfiPrioritizer {
  private RfiPrioritizer() {}

  public static List<Rfi> prioritize(List<Rfi> rfis) {
    //Fill in gaps due to closed RFIs
    int pri = 1;
    List<Rfi> prioritizedOpenRfis = prioritizedOpenRfis(rfis);
    prioritizedOpenRfis.sort(Comparator.comparing(Rfi::getPriority));
    for (Rfi rfi : prioritizedOpenRfis) {
      rfi.setPriority(pri++);
    }

    //Assign lowest priority to newly opened RFIs
    int nextPriority = lowestExistingPriority(rfis);
    for (Rfi rfi : unprioritizedOpenRfis(rfis)) {
      rfi.setPriority(++nextPriority);
    }
    return rfis;
  }

  private static int lowestExistingPriority(List<Rfi> rfis) {
    return (int) rfis.stream()
      .filter(RfiPrioritizer::isOpenAndPrioritized)
      .count();
  }

  private static List<Rfi> unprioritizedOpenRfis(List<Rfi> rfis) {
    return rfis.stream()
      .filter(RfiPrioritizer::isOpenAndUnprioritized)
      .collect(Collectors.toList());
  }

  private static List<Rfi> prioritizedOpenRfis(List<Rfi> rfis) {
    return rfis.stream()
      .filter(RfiPrioritizer::isOpenAndPrioritized)
      .collect(Collectors.toList());
  }

  private static boolean isOpenAndPrioritized(Rfi rfi) {
    return rfi.getStatus().equals("OPEN") && rfi.getPriority() > 0;
  }

  private static boolean isOpenAndUnprioritized(Rfi rfi) {
    return rfi.getStatus().equals("OPEN") && rfi.getPriority() == -1;
  }
}
