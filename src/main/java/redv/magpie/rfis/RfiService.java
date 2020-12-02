package redv.magpie.rfis;

import redv.magpie.metrics.MetricsService;
import redv.magpie.metrics.change.rfi.MetricChangeRfi;
import redv.magpie.tgts.Target;
import redv.magpie.tgts.TargetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RfiService {
  @Value("${GETS_URI_OPEN_PENDING}")
  String getsUriOpenPending;
  @Value("${GETS_URI_CLOSED}")
  String getsUriClosed;
  private RfiRepository rfiRepository;
  private RfiFeedbackRepository rfiFeedbackRepository;
  private GetsClient getsClient;
  private MetricsService metricsService;
  private TargetService targetService;

  @Autowired
  public RfiService(RfiRepository rfiRepository,
                    RfiFeedbackRepository rfiFeedbackRepository,
                    GetsClient getsClient,
                    MetricsService metricsService) {
    this.rfiRepository = rfiRepository;
    this.rfiFeedbackRepository = rfiFeedbackRepository;
    this.getsClient = getsClient;
    this.metricsService = metricsService;
  }

  private static List<Rfi> rfisFromElements(NodeList htmlRfis) throws Exception {
    List<Rfi> rfiList = new ArrayList<>();

    for (int i = 0; i < htmlRfis.getLength(); i++) {
      Node node = htmlRfis.item(i);
      rfiList.add(RfiDeserializer.deserialize(node));
    }

    return rfiList;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setGetsClient(GetsClient getsClient) {
    this.getsClient = getsClient;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setTargetService(TargetService targetService) {
    this.targetService = targetService;
  }

  @Autowired
  public void setRfiFeedbackRepository(RfiFeedbackRepository rfiFeedbackRepository) {
    this.rfiFeedbackRepository = rfiFeedbackRepository;
  }

  @Scheduled(fixedDelay = 60000, initialDelay = 8000)
  public void fetchRfisFromGets() {
    log.trace("Fetching from GETS");
    String[] uris = {getsUriOpenPending, getsUriClosed};
    fetchRfisFromUris(uris);
  }

  public void fetchRfisFromUris(String[] uris) {
    try {
      this.updateRepoFromGets(uris);
    } catch (Exception e) {
      log.error("Error fetching from GETS: " + e.getMessage());
    }
    this.updatePrioritiesInRepo();
    this.populateGetsTargets();
  }

  public List<Rfi> fetchRfisFromRepo() {
    return pendingOpenAndLastThreeClosedRfis();
  }

  public List<Rfi> fetchAllClosedFromRepo() {
    return rfiRepository.findAllClosed();
  }

  private List<Rfi> pendingOpenAndLastThreeClosedRfis() {
    List<Rfi> allRfis = this.rfiRepository.findAll();
    List<Rfi> lastThreeClosed = this.filterLastThreeClosed(allRfis);
    List<Rfi> pendingOpenAndLastThreeClosed = new ArrayList<>();

    for (Rfi rfi : allRfis)
      if (isPendingOpenOrRecentlyClosed(lastThreeClosed, rfi))
        pendingOpenAndLastThreeClosed.add(rfi);

    pendingOpenAndLastThreeClosed.sort(Comparator.comparing(Rfi::getRfiNum));

    return pendingOpenAndLastThreeClosed;
  }

  private void updatePrioritiesInRepo() {
    List<Rfi> allRfis = rfiRepository.findAll();
    rfiRepository.saveAll(
      Objects.requireNonNull(
        RfiPrioritizer.prioritize(allRfis)
      )
    );
  }

  private void populateGetsTargets() {
    List<Rfi> openRfis = rfiRepository.findAllOpen();
    Timestamp now = new Timestamp(new Date().getTime());
    for (Rfi rfi : openRfis) {
      if (targetService.getTargets(rfi.getId()).isEmpty()) {
        String[] mgrsArray = rfi.getMgrsList().split(",");
        for (String mgrs : mgrsArray) {
          if (mgrs.length() == 15) {
            targetService.saveGetsTarget(new Target(rfi.getId(), mgrs.toUpperCase()), now);
          }
        }
      }
    }
  }

  private boolean isPendingOpenOrRecentlyClosed(List<Rfi> lastThreeClosed, Rfi rfi) {
    return !rfi.getStatus().equals("CLOSED") || lastThreeClosed.contains(rfi);
  }

  private void updateRepoFromGets(String[] uris) throws Exception {
    for (String uri : uris) {
      updateAndSaveRfis(
        marshallDocumentToRfis(
          getsClient.rfiResponseDocument(uri)
        )
      );
    }
  }

  void updateAndSaveRfis(List<Rfi> newRfis) {
    Date currDate = new Date();
    for (Rfi newRfi : newRfis) {
      createOrUpdateRfi(newRfi, currDate);
      rfiRepository.save(newRfi);
    }
  }

  private void createOrUpdateRfi(Rfi newRfi, Date currDate) {
    Rfi oldRfi = rfiRepository.findByRfiNum(newRfi.getRfiNum());
    if (existsInRepo(oldRfi)) {
      log.trace("Received previously found RFI: " + oldRfi.getRfiNum());
      linkNewRfiToOldRfi(newRfi, oldRfi);
      if (hasChanged(newRfi, oldRfi)) {
        log.trace("It has updates.");
        postUpdateMetrics(newRfi, currDate, oldRfi);
      }
    }
  }

  private void postUpdateMetrics(Rfi newRfi, Date currDate, Rfi oldRfi) {
    for (String field : oldRfi.compare(newRfi)) {
      metricsService.addChangeRfi(new MetricChangeRfi(currDate, newRfi, oldRfi, field));
    }
  }

  private void linkNewRfiToOldRfi(Rfi newRfi, Rfi oldRfi) {
    newRfi.setPriority(oldRfi.getPriority());
    newRfi.setId(oldRfi.getId());
    if (oldRfi.getReceiveDate() != null)
      newRfi.setReceiveDate(oldRfi.getReceiveDate());
  }

  private boolean hasChanged(Rfi newRfi, Rfi oldRfi) {
    return !newRfi.equals(oldRfi);
  }

  private boolean existsInRepo(Rfi rfi) {
    return rfi != null;
  }

  private List<Rfi> filterLastThreeClosed(List<Rfi> rfiList) {
    List<Rfi> filteredList = rfiList.stream()
      .filter(rfi -> rfi.getStatus().equals("CLOSED"))
      .sorted(new SortByRecentFirst())
      .collect(Collectors.toList());

    int maxRfis = Math.min(filteredList.size(), 3);
    return filteredList.subList(0, maxRfis);
  }

  public List<Rfi> marshallDocumentToRfis(Document document) throws Exception {
    NodeList nodeList = document.getElementsByTagName("getsrfi:RequestForInformation");

    return rfisFromElements(nodeList);
  }

  public void saveFeedback(RfiFeedback feedback) {
    RfiFeedback oldFeedback = rfiFeedbackRepository.findByRfiNum(feedback.getRfiNum());

    if (oldFeedback != null) {
      feedback.setId(oldFeedback.getId());
    }

    rfiFeedbackRepository.save(feedback);
  }

  public RfiFeedback getFeedback(String rfiNum) {
    return rfiFeedbackRepository.findByRfiNum(rfiNum);
  }
}
