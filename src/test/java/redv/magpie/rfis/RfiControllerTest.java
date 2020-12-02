package redv.magpie.rfis;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.ixns.*;
import redv.magpie.metrics.MetricsService;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDateRepository;
import redv.magpie.metrics.change.rfi.MetricChangeRfi;
import redv.magpie.metrics.change.rfi.MetricChangeRfiRepository;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriorityRepository;
import redv.magpie.metrics.change.target.MetricChangeTargetRepository;
import redv.magpie.metrics.create.target.MetricCreateTargetRepository;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDateRepository;
import redv.magpie.metrics.delete.target.MetricDeleteTargetRepository;
import redv.magpie.metrics.undo.changeRfiPriority.MetricUndoChangeRfiPriority;
import redv.magpie.metrics.undo.changeRfiPriority.MetricUndoChangeRfiPriorityRepository;
import redv.magpie.metrics.visit.feedbackPage.MetricVisitFeedbackPageRepository;
import redv.magpie.products.Product;
import redv.magpie.products.ProductRepository;
import redv.magpie.tgts.*;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.*;

// Prevent duplicate RFIs from race condition between rfiService.fetchRfisFromUris(files) in getRfisDirectlyFromGETS()
// test and scheduled function fetchRfisFromGets()
@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=",
    "GETS_URI_CLOSED=",
    "GETS_REQUEST_TIME_FRAME_IN_DAYS=20"
  })
public class RfiControllerTest extends BaseIntegrationTest {

  IxnController ixnController;
  RfiController rfiController;
  TargetController targetController;
  TargetNameRepository targetNameRepository;
  MetricsService metricsService;
  RfiService rfiService;
  RfiRepository rfiRepository;
  ProductRepository productRepository;
  ExploitDateRepository exploitDateRepository;
  IxnRepository ixnRepository;
  SegmentRepository segmentRepository;
  TargetRepository targetRepository;
  MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  MetricCreateTargetRepository metricCreateTargetRepository;
  MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  MetricDeleteTargetRepository metricDeleteTargetRepository;
  MetricChangeTargetRepository metricChangeTargetRepository;
  MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository;
  MetricChangeRfiRepository metricChangeRfiRepository;
  RfiFeedbackRepository rfiFeedbackRepository;
  MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository;

  @Autowired
  public void setSegmentRepository(SegmentRepository segmentRepository) {
    this.segmentRepository = segmentRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setIxnController(IxnController ixnController) {
    this.ixnController = ixnController;
  }

  @Autowired
  public void setTargetController(TargetController targetController) {
    this.targetController = targetController;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setRfiController(RfiController rfiController) {
    this.rfiController = rfiController;
  }

  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setUploadRepository(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Autowired
  public void setExploitDateRepository(ExploitDateRepository exploitDateRepository) {
    this.exploitDateRepository = exploitDateRepository;
  }

  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
  }

  @Autowired
  public void setTargetNameRepository(TargetNameRepository targetNameRepository) {
    this.targetNameRepository = targetNameRepository;
  }

  @Autowired
  public void setMetricChangeExploitDateRepository(
    MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @Autowired
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricDeleteTargetRepository(MetricDeleteTargetRepository metricDeleteTargetRepository) {
    this.metricDeleteTargetRepository = metricDeleteTargetRepository;
  }

  @Autowired
  public void setMetricDeleteExploitDateRepository(
    MetricDeleteExploitDateRepository metricDeleteExploitDateRepository) {
    this.metricDeleteExploitDateRepository = metricDeleteExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeTargetRepository(MetricChangeTargetRepository metricChangeTargetRepository) {
    this.metricChangeTargetRepository = metricChangeTargetRepository;
  }

  @Autowired
  public void setMetricChangeRfiPriorityRepository(
    MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository) {
    this.metricChangeRfiPriorityRepository = metricChangeRfiPriorityRepository;
  }

  @Autowired
  public void setMetricUndoChangeRfiPriorityRepository(
    MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository) {
    this.metricUndoChangeRfiPriorityRepository = metricUndoChangeRfiPriorityRepository;
  }

  @Autowired
  public void setMetricChangeRfiRepository(
    MetricChangeRfiRepository metricChangeRfiRepository) {
    this.metricChangeRfiRepository = metricChangeRfiRepository;
  }

  @Autowired
  public void setRfiFeedbackRepository(RfiFeedbackRepository rfiFeedbackRepository) {
    this.rfiFeedbackRepository = rfiFeedbackRepository;
  }

  @Autowired
  public void setMetricVisitFeedbackPageRepository(
    MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository) {
    this.metricVisitFeedbackPageRepository = metricVisitFeedbackPageRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    ixnRepository.deleteAll();
    segmentRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricUndoChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    rfiFeedbackRepository.deleteAll();
    metricVisitFeedbackPageRepository.deleteAll();
    productRepository.deleteAll();
  }

  @Test
  public void getRfisDirectlyFromGETS() {
    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };
    rfiService.fetchRfisFromUris(files);

    Rfi exploitingRfi =
      new Rfi("ZZZZZ", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 1, "", "", "", "", "",
        "", "", "", "");

    rfiRepository.save(exploitingRfi);

    String longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
      "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
      "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui" +
      " officia deserunt mollit anim id est laborum.";

    given()
      .port(port)
      .when()
      .get(RfiController.URI)
      .then()
      .statusCode(200)
      .body("[2].rfiNum", equalTo("DGS-1-SDT-2020-00321"))
      .body("[2].getsUrl", equalTo("http://www.google.com"))
      .body("[2].lastUpdate", equalTo("2019-11-05T14:21:21.000+0000"))
      .body("[2].status", equalTo("NEW"))
      .body("[2].customerUnit", equalTo("633d ABW"))
      .body("[2].ltiov", equalTo("2020-11-05T14:21:21.000+0000"))
      .body("[2].country", equalTo("USA"))
      .body("[2].description", equalTo("hello rfi"))
      .body("[2].priority", equalTo(-1))
      .body("[2].justification", equalTo("This is a justification."))

      .body("[5].status", equalTo("OPEN"))
      .body("[5].priority", greaterThan(0))

      .body("[9].rfiNum", equalTo("DGS-1-SDT-2020-00329"))
      .body("[9].status", equalTo("CLOSED"))
      .body("[9].description", equalTo(longDescription))
      .body("[9].priority", equalTo(-1))

      .body("[15].rfiNum", equalTo("DGS-1-SDT-2020-00338"))
      .body("[15].getsUrl", equalTo("http://www.google.com"))
      .body("[15].lastUpdate", equalTo("2019-10-16T20:21:26.000+0000"))
      .body("[15].status", equalTo("OPEN"))
      .body("[15].customerUnit", equalTo("1 FW"))
      .body("[15].ltiov", equalTo(null))
      .body("[15].country", equalTo("CAN"))

      .body("[16].rfiNum", equalTo("ZZZZZ"))

      .body("[17].rfiNum", equalTo(null));
  }

  @Test
  public void checksPriorityChangeLegality() throws Exception {
    Rfi rfi2 =
      new Rfi("id2", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 1, "", "", "", "", "",
        "", "", "", "");
    Rfi rfi3 =
      new Rfi("id3", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 2, "", "", "", "", "",
        "", "", "", "");
    Rfi rfi1 =
      new Rfi("id1", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 3, "", "", "", "", "",
        "", "", "", "");

    Rfi rfi4 =
      new Rfi("id4", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 4, "", "", "", "", "",
        "", "", "", "");
    Rfi rfi5 =
      new Rfi("id5", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", 5, "", "", "", "", "",
        "", "", "", "");
    Rfi rfi6 =
      new Rfi("id6", "", "CLOSED", new Date(), "", new Date(), "", "", "This is a justifiction", 3, "", "", "", "", "",
        "", "", "", "");

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(rfi1);
    rfis.add(rfi2);
    rfis.add(rfi3);
    rfis.add(rfi4);
    rfis.add(rfi5);
    rfis.add(rfi6);

    rfiRepository.saveAll(rfis);

    RfiPriorityJson[] rfiJsons = {
      new RfiPriorityJson("id1", 1),
      new RfiPriorityJson("id2", 2),
      new RfiPriorityJson("id3", 3)
    };

    String json = objectMapper.writeValueAsString(rfiJsons);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(RfiController.URI + "/update-priority?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());
    assertEquals("billy.bob.joe", metricChangeRfiPriorityRepository.findAll().get(0).getUserName());

    rfiJsons = new RfiPriorityJson[]{
      new RfiPriorityJson("id1", 2),
      new RfiPriorityJson("id3", 3)
    };

    assertFalse(rfiController.updatePriority(rfiJsons, "", "billy.bob.joe"));
    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());
    assertEquals(3, rfiRepository.findByRfiNum("id3").getPriority());

    rfiJsons = new RfiPriorityJson[]{
      new RfiPriorityJson("id4", 2),
      new RfiPriorityJson("id3", 3),
      new RfiPriorityJson("id1", 4)
    };

    assertFalse(rfiController.updatePriority(rfiJsons, "", "billy.bob.joe"));
    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());
    assertEquals(2, rfiRepository.findByRfiNum("id2").getPriority());
    assertEquals(3, rfiRepository.findByRfiNum("id3").getPriority());
    assertEquals(4, rfiRepository.findByRfiNum("id4").getPriority());
  }

  @Test
  public void returnsRfisWithTgtAndIxnCounts() throws Exception {
    //Setup and RFI with 2 targets and 10 interactions
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    Date exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));

    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

//    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""), "20-0001"));
//    long target1Id = targetRepository.findAll().get(0).getId();
//
//    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231231", "", ""), "20-0001"));
//    long target2Id = targetRepository.findAll().get(1).getId();

    List<TargetJson> targets = new ArrayList<>();

    targets.add(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""));
    targets.add(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231232", "", ""));
    targetController.postTarget(targets, "billy.bob.thornton", "false");

    long target1Id = targetRepository.findAll().get(0).getId();
    long target2Id = targetRepository.findAll().get(1).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-002

    //Another RFI
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00339", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00339").getId();
    exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));

    exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targets = new ArrayList<>();

    targets.add(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""));
    targets.add(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231232", "", ""));
    targetController.postTarget(targets, "billy.bob.thornton", "false");

    target1Id = targetRepository.findAll().get(0).getId();
    target2Id = targetRepository.findAll().get(1).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-002

    RfiGet rfi = rfiController.getAllRfis().get(0);

    assertEquals(2, rfi.getTgtCount());
    assertEquals(10, rfi.getIxnCount());

    ixnController.deleteSegment(segment2Id);
    targetController.deleteTarget(target1Id);

    rfi = rfiController.getAllRfis().get(0);

    assertEquals(1, rfi.getTgtCount());

    targetController.deleteExploitDate(exploitDate2Id);

    rfi = rfiController.getAllRfis().get(0);

    assertEquals(0, rfi.getTgtCount());
  }

  @Test
  public void refreshesFromGets() {
    given()
      .port(port)
      .when()
      .get(RfiController.URI + "/refresh")
      .then()
      .statusCode(200);
  }

  @Test
  public void postCreatesNewUndoRfiPrioritizationMetric() throws Exception {
    Rfi rfi1 =
      new Rfi("ABC-0321", "", "OPEN", new Date(12345678), "", new Date(345678), "", "", "", 1, "", "", "", "", "", "",
        "", "", "");
    Rfi rfi2 =
      new Rfi("ABC-0322", "", "OPEN", new Date(12345678), "", new Date(345678), "", "", "", 2, "", "", "", "", "", "",
        "", "", "");
    Rfi rfi3 =
      new Rfi("ABC-0323", "", "OPEN", new Date(12345678), "", new Date(345678), "", "", "", 3, "", "", "", "", "", "",
        "", "", "");

    rfiRepository.saveAll(Arrays.asList(rfi1, rfi2, rfi3));

    RfiPriorityJson[] list = {new RfiPriorityJson("ABC-0322", 1), new RfiPriorityJson("ABC-0321", 2)};

    String jsonString = objectMapper.writeValueAsString(list);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(jsonString)
      .when()
      .post(RfiController.URI + "/update-priority?undo=ABC-0321&userName=billy.bob.joe")
      .then()
      .statusCode(200);

    rfi1 = rfiRepository.findByRfiNum("ABC-0321");
    rfi2 = rfiRepository.findByRfiNum("ABC-0322");
    rfi3 = rfiRepository.findByRfiNum("ABC-0323");

    assertEquals(2, rfi1.getPriority());
    assertEquals(1, rfi2.getPriority());
    assertEquals(3, rfi3.getPriority());

    assertEquals(1, metricUndoChangeRfiPriorityRepository.findAll().size());

    MetricUndoChangeRfiPriority metric = metricUndoChangeRfiPriorityRepository.findAll().get(0);

    assertEquals(rfi1.getId(), metric.getRfiId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void returnsRfisWithStartDate() throws Exception {
    rfiRepository.save(
      new Rfi("ABC-0321", "", "OPEN", new Date(12345678), "", new Date(345678), "", "", "", 1, "", "", "", "", "", "",
        "", "", ""));

    Date startDate = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("12/11/2020").getTime());

    metricChangeRfiRepository.save(new MetricChangeRfi("ABC-0321", startDate, "status", "NEW", "OPEN"));

    given()
      .port(port)
      .when()
      .get(RfiController.URI)
      .then()
      .statusCode(200)
      .body("[0].startDate", equalTo("2020-12-11T00:00:00.000+0000"));
  }

  private long convertDaysToMS(int days) {
    return ((long) days) * 86400000L;
  }

  @Test
  public void returnsRfisWithEstimatedAndActualCompletionDates() {
    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    // No target data, used last 3 rfi open time
    String closedRfiNum = "SDT20-321";
    Rfi closedRfi =
      new Rfi(closedRfiNum, "", "CLOSED", new Date(), "", new Date(twoWeeksAgo + convertDaysToMS(30)), "", "",
        "This is a ", "", "",
        "", "", "", "", "", "justifiction", "");
    closedRfi.setReceiveDate(new Timestamp(twoWeeksAgo));
    MetricChangeRfi rfi1open =
      new MetricChangeRfi(closedRfiNum, new Date(twoWeeksAgo + convertDaysToMS(1)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close =
      new MetricChangeRfi(closedRfiNum, new Date(twoWeeksAgo + convertDaysToMS(3)), "status", "OPEN", "CLOSED");

    rfiRepository.save(closedRfi);
    metricChangeRfiRepository.saveAll(Arrays.asList(rfi1open, rfi1close));

    assertEquals(convertDaysToMS(2), metricsService.getAverageCompletionTimeLast3Rfis());

    String openRfiNum = "SDT20-322";
    Rfi openRfi =
      new Rfi(openRfiNum, "", "OPEN", new Date(), "", new Date(twoWeeksAgo + convertDaysToMS(30)), "", "", "This is a ",
        "", "",
        "", "", "", "", "", "justifiction", "");
    MetricChangeRfi rfi2open =
      new MetricChangeRfi(openRfiNum, new Date(twoWeeksAgo + convertDaysToMS(10)), "status", "NEW", "OPEN");

    rfiRepository.save(openRfi);
    metricChangeRfiRepository.save(rfi2open);

    RfiGet closedRfiGet = rfiController.getAllRfis().get(0);
    RfiGet openRfiGet = rfiController.getAllRfis().get(1);

    assertEquals(new Date(twoWeeksAgo + convertDaysToMS(3)), closedRfiGet.getCompletionDate());
    assertEquals(new Date(twoWeeksAgo + convertDaysToMS(12)), openRfiGet.getCompletionDate());

    //Target data exists, use avg. target completion time

    long closedRfiId = rfiRepository.findByRfiNum(closedRfiNum).getId();
    long openRfiId = rfiRepository.findByRfiNum(openRfiNum).getId();

    ExploitDate closedRfiExploitDate = new ExploitDate(new Date(), closedRfiId);
    ExploitDate openRfiExploitDate = new ExploitDate(new Date(), openRfiId);

    exploitDateRepository.saveAll(Arrays.asList(closedRfiExploitDate, openRfiExploitDate));

    long closedRfiEDId = exploitDateRepository.findAllByRfiId(closedRfiId).get(0).getId();
    long openRfiEDId = exploitDateRepository.findAllByRfiId(openRfiId).get(0).getId();

    //2 targets, open 2 days = 1 target/day
    Target closedRfiTarget1 =
      new Target(new TargetJson(closedRfiId, closedRfiEDId, "12QWE1231231231", "", ""), "20-0001");
    Target closedRfiTarget2 =
      new Target(new TargetJson(closedRfiId, closedRfiEDId, "12QWE1231231232", "", ""), "20-0002");


    //3 targets => ECD 3 days from open date, ie day 13
    Target openRfiTarget1 = new Target(new TargetJson(openRfiId, openRfiEDId, "12QWE1231231231", "", ""), "20-0001");
    Target openRfiTarget2 = new Target(new TargetJson(openRfiId, openRfiEDId, "12QWE1231231232", "", ""), "20-0002");
    Target openRfiTarget3 = new Target(new TargetJson(openRfiId, openRfiEDId, "12QWE1231231233", "", ""), "20-0003");

    targetRepository
      .saveAll(Arrays.asList(closedRfiTarget1, closedRfiTarget2, openRfiTarget1, openRfiTarget2, openRfiTarget3));

    closedRfiGet = rfiController.getAllRfis().get(0);
    openRfiGet = rfiController.getAllRfis().get(1);

    assertEquals(new Date(twoWeeksAgo + convertDaysToMS(3)), closedRfiGet.getCompletionDate());
    assertEquals(new Date(twoWeeksAgo + convertDaysToMS(13)), openRfiGet.getCompletionDate());
  }

  @Test
  public void refreshedFromGetsAndPrioritizesWhenOpeningAnRfi() {
    //Assume front end opens RFI in GETS and posts a priority change with the newly opened RFI which will still be NEW
    //in the local database
    Date rfiltiov = new Date();

    Rfi openRfi1 =
      new Rfi("SDT-0320", "url", "OPEN", new Date(), "1 FW", rfiltiov, "USA", "a description", "This is a justifiction",
        "", "", "", "", "", "", "", "", "");

    Rfi openRfi2 =
      new Rfi("SDT-0329", "url", "OPEN", new Date(), "1 FW", rfiltiov, "USA", "a description", "This is a justifiction",
        "", "", "", "", "", "", "", "", "");

    openRfi1.setPriority(1);
    openRfi2.setPriority(2);

    Rfi newRfiToOpen =
      new Rfi("SDT-0321", "url", "NEW", new Date(), "1 FW", rfiltiov, "USA", "a description", "This is a justifiction",
        "", "", "", "", "", "", "", "", "");

    rfiRepository.saveAll(Arrays.asList(openRfi1, openRfi2, newRfiToOpen));

    rfiService.getsUriOpenPending = "UpdatedRfis.xml";
    rfiService.getsUriClosed = "RfisClosed.xml";

    RfiPriorityJson[] newPriorities = {
      new RfiPriorityJson("SDT-0321", 2), new RfiPriorityJson("SDT-0329", 3)
    };

    //post with priority update for newRfiToOpen
    assertTrue(rfiController.updatePriority(newPriorities, "", ""));

    //assert that SDT-0321 is now open and priority 2
    Rfi newlyOpenedRfi = rfiRepository.findByRfiNum("SDT-0321");
    assertEquals(2, newlyOpenedRfi.getPriority());
    assertEquals("OPEN", newlyOpenedRfi.getStatus());

    //assert other open RFIs have proper priority
    openRfi1 = rfiRepository.findByRfiNum("SDT-0320");
    assertEquals(1, openRfi1.getPriority());
    openRfi2 = rfiRepository.findByRfiNum("SDT-0329");
    assertEquals(3, openRfi2.getPriority());
  }

  @Test
  public void returnsRfisSpecifyingIfTheyContainRejectedTracks() throws Exception {
    setupRfis();

    List<RfiGet> rfis = rfiController.getAllRfis();

    RfiGet rfi1 = rfis.get(0);
    RfiGet rfi2 = rfis.get(1);

    assertTrue(rfi1.isContainsRejectedTracks());
    assertFalse(rfi2.isContainsRejectedTracks());

    long target2Id = targetRepository.findAll().get(1).getId();

    targetController.deleteTarget(target2Id);

    rfis = rfiController.getAllRfis();
    rfi1 = rfis.get(0);

    assertFalse(rfi1.isContainsRejectedTracks());
  }

  @Test
  public void returnsRfisWithProductNameOrNullIfNotFound() throws Exception {
    //2 cases: RFI has product, RFI doesn't have product
    setupRfis();

    long rfiId1 = rfiRepository.findAll().get(0).getId(); //has product
    long rfiId2 = rfiRepository.findAll().get(1).getId(); //no product

    Product upload = new Product(rfiId1, "product.kml", "kml", "This is some data".getBytes());

    productRepository.save(upload);

    List<RfiGet> rfis = rfiController.getAllRfis();

    RfiGet rfi1 = rfis.get(0);
    RfiGet rfi2 = rfis.get(1);

    assertEquals(rfiId1, rfi1.getId());
    assertEquals("product.kml", rfi1.getProductName());

    assertEquals(rfiId2, rfi2.getId());
    assertNull(rfi2.getProductName());
  }

  @Test
  public void savesRfiFeedback() throws Exception {
    assertEquals(0, rfiFeedbackRepository.findAll().size());

    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));

    RfiFeedbackJson feedbackJson = new RfiFeedbackJson("DGS-1-SDT-2020-00338", 3, "", "", "", "");

    String feedbackJsonString = objectMapper.writeValueAsString(feedbackJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(feedbackJsonString)
      .when()
      .post(RfiController.URI + "/feedback")
      .then()
      .statusCode(200);

    assertEquals(1, rfiFeedbackRepository.findAll().size());

    RfiFeedback feedback = rfiFeedbackRepository.findAll().get(0);

    assertEquals("DGS-1-SDT-2020-00338", feedback.getRfiNum());
    assertEquals(3, feedback.getStars());
    assertEquals("", feedback.getTimeliness());
    assertEquals("", feedback.getQuality());
    assertEquals("", feedback.getMissionImpact());
    assertEquals("", feedback.getComments());

    //Should overwrite previous ratings on the same RFI
    feedbackJson = new RfiFeedbackJson("DGS-1-SDT-2020-00338", 5, "Delivered Early", "High Quality", "High Impact",
      "These are some comments");
    feedbackJsonString = objectMapper.writeValueAsString(feedbackJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(feedbackJsonString)
      .when()
      .post(RfiController.URI + "/feedback")
      .then()
      .statusCode(200);

    assertEquals(1, rfiFeedbackRepository.findAll().size());

    feedback = rfiFeedbackRepository.findAll().get(0);

    assertEquals("DGS-1-SDT-2020-00338", feedback.getRfiNum());
    assertEquals(5, feedback.getStars());
    assertEquals("Delivered Early", feedback.getTimeliness());
    assertEquals("High Quality", feedback.getQuality());
    assertEquals("High Impact", feedback.getMissionImpact());
    assertEquals("These are some comments", feedback.getComments());
  }

  @Test
  public void returnsRfiDescriptionBasedOnRfiNum() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "",
        "This is the description we want to get back", "This is a justifiction", "", "", "", "", "", "", "", "", ""));

    assertEquals(0, metricVisitFeedbackPageRepository.findAll().size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(RfiController.URI + "/rfi-description?rfiNum=DGS-1-SDT-2020-00338")
      .then()
      .statusCode(200)
      .body(equalTo("This is the description we want to get back"));

    assertEquals(1, metricVisitFeedbackPageRepository.findAll().size());
  }

  @Test
  public void returnsAllClosedRfisWithFeedback() {
    String rfiNum1 = "DGS-1-SDT-2020-00321";
    String rfiNum2 = "DGS-1-SDT-2020-00322";
    String rfiNum3 = "DGS-1-SDT-2020-00323";
    String rfiNum4 = "DGS-1-SDT-2020-00324";

    rfiRepository.save(
      new Rfi(rfiNum1, "", "CLOSED", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi(rfiNum2, "", "CLOSED", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi(rfiNum3, "", "CLOSED", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi(rfiNum4, "", "CLOSED", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("SHOULD_NOT_GET", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    long rfiId1 = rfiRepository.findAll().get(0).getId();
    long rfiId3 = rfiRepository.findAll().get(2).getId();

    rfiFeedbackRepository.save(new RfiFeedback(rfiNum1, 4, "Delivered On Time", "High Quality", "High Impact", ""));
    rfiFeedbackRepository.save(new RfiFeedback(rfiNum2, 2, "Delivered Late", "", "", ""));
    rfiFeedbackRepository.save(new RfiFeedback(rfiNum3, 3, "Delivered Late", "High Quality", "Low Impact",
      "It was a fine product, not too great, not too terrible I suppose."));

    productRepository.save(new Product(rfiId1, "Rfi-1-prod.kmz", "kmz", "file data".getBytes()));
    productRepository.save(new Product(rfiId3, "Rfi-3-prod.kml", "kml", "other file data".getBytes()));

    given()
      .port(port)
      .when()
      .get(RfiController.URI + "/closed")

      .then()
      .statusCode(200)
      .body("[0].rfi.rfiNum", equalTo(rfiNum1))
      .body("[0].rfi.justification", equalTo("This is a justifiction"))
      .body("[1].rfi.rfiNum", equalTo(rfiNum2))
      .body("[1].rfi.description", equalTo(""))
      .body("[2].rfi.rfiNum", equalTo(rfiNum3))
      .body("[2].rfi.status", equalTo("CLOSED"))
      .body("[3].rfi.rfiNum", equalTo(rfiNum4))
      .body("[3].rfi.customerEmail", equalTo(""))
      .body("[4]", equalTo(null))

      .body("[0].productName", equalTo("Rfi-1-prod.kmz"))
      .body("[1].productName", equalTo(null))
      .body("[2].productName", equalTo("Rfi-3-prod.kml"))
      .body("[3].productName", equalTo(null))

      .body("[0].feedback.stars", equalTo(4))
      .body("[0].feedback.timeliness", equalTo("Delivered On Time"))
      .body("[0].feedback.comments", equalTo(""))
      .body("[1].feedback.stars", equalTo(2))
      .body("[1].feedback.quality", equalTo(""))
      .body("[2].feedback.stars", equalTo(3))
      .body("[2].feedback.missionImpact", equalTo("Low Impact"))
      .body("[2].feedback.comments", equalTo("It was a fine product, not too great, not too terrible I suppose."))
      .body("[3].feedback", equalTo(null));
  }

  private void setupRfis() throws Exception {
    //Setup and RFI with 2 targets and 10 interactions
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    Date exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));

    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""), "20-0001"));
    long target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231231", "", ""), "20-0002"));
    long target2Id = targetRepository.findAll().get(1).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.REJECTED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-002

    //Another RFI
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00339", "", "OPEN", new Date(), "", new Date(), "", "", "This is a justifiction", "", "",
        "", "", "", "", "", "", ""));
    rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00339").getId();
    exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));

    exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""), "20-0001"));
    target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231231", "", ""), "20-0002"));
    target2Id = targetRepository.findAll().get(1).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "",
      IxnApprovalStatus.NOT_REVIEWED));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-002
  }
}
