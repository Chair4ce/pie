package redv.magpie.metrics;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.ixns.*;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDate;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDateRepository;
import redv.magpie.metrics.change.ixn.MetricChangeIxn;
import redv.magpie.metrics.change.ixn.MetricChangeIxnRepository;
import redv.magpie.metrics.change.rfi.MetricChangeRfi;
import redv.magpie.metrics.change.rfi.MetricChangeRfiRepository;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriority;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriorityRepository;
import redv.magpie.metrics.change.segment.MetricChangeSegment;
import redv.magpie.metrics.change.segment.MetricChangeSegmentRepository;
import redv.magpie.metrics.change.target.MetricChangeTarget;
import redv.magpie.metrics.change.target.MetricChangeTargetRepository;
import redv.magpie.metrics.click.gets.MetricClickGets;
import redv.magpie.metrics.click.gets.MetricClickGetsRepository;
import redv.magpie.metrics.click.refresh.MetricClickRefreshRepository;
import redv.magpie.metrics.click.sort.MetricClickSortRepository;
import redv.magpie.metrics.create.ixn.MetricCreateIxn;
import redv.magpie.metrics.create.ixn.MetricCreateIxnRepository;
import redv.magpie.metrics.create.target.MetricCreateTarget;
import redv.magpie.metrics.create.target.MetricCreateTargetRepository;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDate;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDateRepository;
import redv.magpie.metrics.delete.ixn.MetricDeleteIxn;
import redv.magpie.metrics.delete.ixn.MetricDeleteIxnRepository;
import redv.magpie.metrics.delete.segment.MetricDeleteSegment;
import redv.magpie.metrics.delete.segment.MetricDeleteSegmentRepository;
import redv.magpie.metrics.delete.target.MetricDeleteTarget;
import redv.magpie.metrics.delete.target.MetricDeleteTargetRepository;
import redv.magpie.metrics.login.MetricLogin;
import redv.magpie.metrics.login.MetricLoginRepository;
import redv.magpie.metrics.visit.site.MetricVisitSiteRepository;
import redv.magpie.metrics.undo.exploitDateDelete.MetricUndoExploitDateDelete;
import redv.magpie.metrics.undo.exploitDateDelete.MetricUndoExploitDateDeleteRepository;
import redv.magpie.metrics.undo.ixnDelete.MetricUndoIxnDelete;
import redv.magpie.metrics.undo.ixnDelete.MetricUndoIxnDeleteRepository;
import redv.magpie.metrics.undo.segmentDelete.MetricUndoSegmentDelete;
import redv.magpie.metrics.undo.segmentDelete.MetricUndoSegmentDeleteRepository;
import redv.magpie.metrics.undo.targetDelete.MetricUndoTargetDelete;
import redv.magpie.metrics.undo.targetDelete.MetricUndoTargetDeleteRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.*;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateJson;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class MetricsServiceTest extends BaseIntegrationTest {

  @Autowired
  private MetricsService metricsService;
  @Autowired
  private RfiRepository rfiRepository;
  @Autowired
  private ExploitDateRepository exploitDateRepository;
  @Autowired
  private TargetRepository targetRepository;
  @Autowired
  TargetNameRepository targetNameRepository;
  @Autowired
  private MetricClickGetsRepository metricClickGetsRepository;
  @Autowired
  private MetricVisitSiteRepository metricVisitSiteRepository;
  @Autowired
  private MetricClickSortRepository metricClickSortRepository;
  @Autowired
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  @Autowired
  private MetricChangeRfiRepository metricChangeRfiRepository;
  @Autowired
  private MetricClickRefreshRepository metricClickRefreshRepository;
  @Autowired
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  @Autowired
  private MetricCreateTargetRepository metricCreateTargetRepository;
  @Autowired
  private MetricChangeTargetRepository metricChangeTargetRepository;
  @Autowired
  private MetricCreateIxnRepository metricCreateIxnRepository;
  @Autowired
  private MetricChangeIxnRepository metricChangeIxnRepository;
  @Autowired
  private MetricChangeSegmentRepository metricChangeSegmentRepository;
  @Autowired
  private MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  @Autowired
  private MetricDeleteTargetRepository metricDeleteTargetRepository;
  @Autowired
  private MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  @Autowired
  private MetricDeleteIxnRepository metricDeleteIxnRepository;
  @Autowired
  private MetricLoginRepository metricLoginRepository;
  @Autowired
  private MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository;
  @Autowired
  private MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository;
  @Autowired
  private MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository;
  @Autowired
  private MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository;

  @Before
  public void setup() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    metricClickGetsRepository.deleteAll();
    metricVisitSiteRepository.deleteAll();
    metricClickSortRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricClickRefreshRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricCreateIxnRepository.deleteAll();
    metricChangeIxnRepository.deleteAll();
    metricChangeSegmentRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricDeleteSegmentRepository.deleteAll();
    metricDeleteIxnRepository.deleteAll();
    metricLoginRepository.deleteAll();
    metricUndoExploitDateDeleteRepository.deleteAll();
    metricUndoTargetDeleteRepository.deleteAll();
    metricUndoSegmentDeleteRepository.deleteAll();
    metricUndoIxnDeleteRepository.deleteAll();
  }

  @Test
  public void createsNewPriorityChangeMetric() {
    MetricChangeRfiPriority metricChangeRfiPriority1 = new MetricChangeRfiPriority("20-001", 1, 2, "q", new Date());
    MetricChangeRfiPriority metricChangeRfiPriority2 = new MetricChangeRfiPriority("20-002", 2, 1, "q", new Date());

    List<MetricChangeRfiPriority> priChanges = new ArrayList<>();
    priChanges.add(metricChangeRfiPriority1);
    priChanges.add(metricChangeRfiPriority2);

    metricsService.addChangeRfiPriority(priChanges);

    assertEquals(2, metricChangeRfiPriorityRepository.count());
  }

  @Test
  public void createsNewRfiUpdateMetric() {
    MetricChangeRfi metricChangeRfi1 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");
    MetricChangeRfi metricChangeRfi2 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");

    long rfiUpdateCount = metricChangeRfiRepository.count();

    metricsService.addChangeRfi(metricChangeRfi1);
    metricsService.addChangeRfi(metricChangeRfi2);

    assertEquals(rfiUpdateCount + 2, metricChangeRfiRepository.count());
  }

  @Test
  public void addsChangeTargetMetric() {
    Target oldTarget = new Target(
      1, 1, 1,
      "20-0001",
      "12ABC1234567890",
      "These are old notes",
      "This is an old description",
      TargetStatus.NOT_STARTED,
      "",
      "",
      null
    );
    TargetJson newTarget = new TargetJson(
      oldTarget.getRfiId(),
      oldTarget.getExploitDateId(),
      "99BBB9999999999",
      "These are new notes",
      "And an improved description"
    );

    metricsService.addChangeTarget(oldTarget, newTarget, "bbj");
    assertEquals(3, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget mgrs = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("mgrs")).collect(Collectors.toList()).get(0);
    MetricChangeTarget notes = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("notes")).collect(Collectors.toList()).get(0);
    MetricChangeTarget description = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("description")).collect(Collectors.toList()).get(0);

    assertEquals(newTarget.getMgrs(), mgrs.getNewData());

    assertEquals(newTarget.getNotes(), notes.getNewData());

    assertEquals(newTarget.getDescription(), description.getNewData());
  }

  @Test
  public void addsChangeIxnMetric() {
    Ixn oldIxn = new Ixn(new IxnJson(1, 1, 1, 1,
      "old exploit analyst",
      new Timestamp(2345),
      "old activity",
      "old track analyst",
      IxnStatus.IN_PROGRESS,
      "old checker",
      "old narrative",
      "old note",
      IxnApprovalStatus.NOT_REVIEWED
    ));

    IxnJson newIxn = new IxnJson(1, 1, 1, 1,
      "new exploit analyst",
      new Timestamp(3456),
      "new activity",
      "new track analyst",
      IxnStatus.COMPLETED,
      "new checker",
      "new narrative",
      "new note",
      IxnApprovalStatus.APPROVED
    );

    metricsService.addChangeIxn(newIxn, oldIxn, "bbj");
    assertEquals(9, metricChangeIxnRepository.findAll().size());

    MetricChangeIxn checker = metricChangeIxnRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("checker")).collect(Collectors.toList()).get(0);
    MetricChangeIxn activity = metricChangeIxnRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("activity")).collect(Collectors.toList()).get(0);
    MetricChangeIxn status = metricChangeIxnRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("status")).collect(Collectors.toList()).get(0);
    MetricChangeIxn approval_status = metricChangeIxnRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("approval_status")).collect(Collectors.toList()).get(0);

    assertEquals(newIxn.getChecker(), checker.getNewData());

    assertEquals(newIxn.getActivity(), activity.getNewData());

    assertEquals(newIxn.getStatus(), status.getNewData());

    assertEquals(newIxn.getApprovalStatus(), approval_status.getNewData());
  }

  private long convertDaysToMS(int days) {
    return ((long) days) * 86400000L;
  }

  @Test
  public void returnsAverageTimeRfisAreInPendingAndOpen() {
    assertArrayEquals(new long[]{0, 0}, metricsService.getAverageWorkflowTime());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi2 =
      new Rfi("SDT20-322", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi3 =
      new Rfi("SDT20-323", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    //status is not closed, ignore
    Rfi rfi5 =
      new Rfi("SDT20-325", "", "NEW", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi6 =
      new Rfi("SDT20-326", "", "OPEN", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    rfi1.setReceiveDate(new Timestamp(0));
    rfi2.setReceiveDate(new Timestamp(0));
    rfi3.setReceiveDate(new Timestamp(0));

    //receive date unknown, ignore
    rfi4.setReceiveDate(null);

    rfiRepository.saveAll(new ArrayList<>(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6)));

    //closed immediately, ignore
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7)), "status", "NEW"
      , "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7) + 10000L),
      "status", "OPEN", "CLOSED"));

    //pending for 10 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(10)), "status",
      "NEW", "OPEN"));
    //open for 7 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(17) + 10000L),
      "status", "OPEN", "CLOSED"));

    //pending for 20 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    //open for 21 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    assertArrayEquals(new long[]{14, 15}, metricsService.getAverageWorkflowTime());
  }

  @Test
  public void returnsAvgTargetsPerWeek() {
    assertEquals(0, metricsService.getAverageTgtCreationsPerWeek());

    long threeWeeksAgo = new Date().getTime() - convertDaysToMS(21);

    TargetJson target = new TargetJson(1, 1, 1, "12QWE1231231231", "", "", TargetStatus.NOT_STARTED, "", "");
    MetricCreateTarget metric1 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric2 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric3 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric4 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric5 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric6 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric7 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric8 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric9 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    metric1.setTimestamp(new Timestamp(threeWeeksAgo));
    metric2.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(14)));
    metric9.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(19)));

    List<MetricCreateTarget> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricCreateTargetRepository.saveAll(metrics);

    assertEquals(3, metricsService.getAverageTgtCreationsPerWeek());
  }

  @Test
  public void returnsAvgIxnsPerWeek() {
    assertEquals(0, metricsService.getAverageIxnCreationsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    IxnJson ixn =
      new IxnJson(1, 1, 1, 1, 1, "Billy", new Timestamp(23456), "", "", IxnStatus.IN_PROGRESS, "", "", "",
        IxnApprovalStatus.NOT_REVIEWED);
    MetricCreateIxn metric1 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric2 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric3 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric4 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric5 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric6 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric7 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric8 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric9 = new MetricCreateIxn(1, ixn, "guy");
    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricCreateIxn> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricCreateIxnRepository.saveAll(metrics);

    assertEquals(5, metricsService.getAverageIxnCreationsPerWeek());
  }

  @Test
  public void returnsGetsClicksByStatusType() {
    assertArrayEquals(new long[]{0, 0}, metricsService.getClickGetsCount());

    MetricClickGets metric1 = new MetricClickGets(new Date(), "OPEN", "bing.com");
    MetricClickGets metric2 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric3 = new MetricClickGets(new Date(), "OPEN", "bing.com");
    MetricClickGets metric4 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric5 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric6 = new MetricClickGets(new Date(), "CLOSED", "bing.com");

    List<MetricClickGets> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6
    ));

    metricClickGetsRepository.saveAll(metrics);

    assertArrayEquals(new long[]{2, 3}, metricsService.getClickGetsCount());
  }

  @Test
  public void returnsDeletionsByDataType() {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageDeletionsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricDeleteExploitDate metric1 = new MetricDeleteExploitDate(1);
    MetricDeleteExploitDate metric2 = new MetricDeleteExploitDate(1);

    MetricDeleteTarget metric3 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric4 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric5 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric6 = new MetricDeleteTarget(1);

    MetricDeleteSegment metric7 = new MetricDeleteSegment(1, false);

    MetricDeleteIxn metric8 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric9 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric10 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric11 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric12 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric13 = new MetricDeleteIxn(1);

    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(3)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(4)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(6)));

    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(1)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(9)));
    metric10.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(10)));
    metric11.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric12.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric13.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricDeleteExploitDate> exploitDateDeletes = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricDeleteTarget> targetDeletes = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric5, metric6
    ));

    List<MetricDeleteIxn> ixnDeletes = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13
    ));

    metricDeleteExploitDateRepository.saveAll(exploitDateDeletes);
    metricDeleteTargetRepository.saveAll(targetDeletes);
    metricDeleteSegmentRepository.save(metric7);
    metricDeleteIxnRepository.saveAll(ixnDeletes);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageDeletionsPerWeek());
  }

  @Test
  public void returnsAverageLoginsPerWeek() {
    assertEquals(0, metricsService.getAverageUniqueLoginsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricLogin metric1 = new MetricLogin("billy");
    MetricLogin metric2 = new MetricLogin("bob");
    MetricLogin metric3 = new MetricLogin("joe");
    MetricLogin metric4 = new MetricLogin("billy");
    MetricLogin metric5 = new MetricLogin("billy");
    MetricLogin metric6 = new MetricLogin("billy");
    MetricLogin metric7 = new MetricLogin("bob");
    MetricLogin metric8 = new MetricLogin("bob");
    MetricLogin metric9 = new MetricLogin("rob");

    metric1.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(0)));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricLogin> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricLoginRepository.saveAll(metrics);

    assertEquals(3, metricsService.getAverageUniqueLoginsPerWeek());
  }

  @Test
  public void returnsAverageUndosPerWeekByDataType() {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageUndosPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricUndoExploitDateDelete metric1 = new MetricUndoExploitDateDelete(1);
    MetricUndoExploitDateDelete metric2 = new MetricUndoExploitDateDelete(1);

    MetricUndoTargetDelete metric3 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric4 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric5 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric6 = new MetricUndoTargetDelete(1);

    MetricUndoSegmentDelete metric7 = new MetricUndoSegmentDelete(1);

    MetricUndoIxnDelete metric8 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric9 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric10 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric11 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric12 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric13 = new MetricUndoIxnDelete(1);

    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(3)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(4)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(6)));

    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(1)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(9)));
    metric10.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(10)));
    metric11.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric12.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric13.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricUndoExploitDateDelete> exploitDateUndos = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricUndoTargetDelete> targetUndos = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric5, metric6
    ));

    List<MetricUndoIxnDelete> ixnUndos = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13
    ));

    metricUndoExploitDateDeleteRepository.saveAll(exploitDateUndos);
    metricUndoTargetDeleteRepository.saveAll(targetUndos);
    metricUndoSegmentDeleteRepository.save(metric7);
    metricUndoIxnDeleteRepository.saveAll(ixnUndos);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageUndosPerWeek());
  }

  @Test
  public void returnsAveragePrioritizationActionsPerWeek() {
    Date date1 = new Date(new Date().getTime() - convertDaysToMS(13));
    Date date2 = new Date(new Date().getTime() - convertDaysToMS(10));
    Date date3 = new Date(new Date().getTime() - convertDaysToMS(5));
    Date date4 = new Date(new Date().getTime() - convertDaysToMS(1));
    metricChangeRfiPriorityRepository.saveAll(new ArrayList<>(Arrays.asList(
      new MetricChangeRfiPriority("ABC-00123", 5, 1, "q", date1),
      new MetricChangeRfiPriority("ABC-00124", 1, 2, "q", date1),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date1),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date1),
      new MetricChangeRfiPriority("ABC-00127", 4, 5, "q", date1),

      new MetricChangeRfiPriority("ABC-00123", 1, 2, "q", date2),
      new MetricChangeRfiPriority("ABC-00124", 2, 1, "q", date2),

      new MetricChangeRfiPriority("ABC-00124", 4, 2, "q", date3),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date3),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date3),

      new MetricChangeRfiPriority("ABC-00124", 5, 2, "q", date4),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date4),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date4),
      new MetricChangeRfiPriority("ABC-00127", 4, 5, "q", date4)
    )));

    assertEquals(2, metricsService.getAveragePrioritizationsPerWeek());
  }

  @Test
  public void returnsEditsByDataType() throws Exception {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageDeletionsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14) + 10000L;

    MetricChangeExploitDate metric1 = new MetricChangeExploitDate(new ExploitDateJson(1, 1, new Timestamp(23456)));
    MetricChangeExploitDate metric2 = new MetricChangeExploitDate(new ExploitDateJson(1, 1, new Timestamp(45678)));
    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    TargetJson targetJson1 = new TargetJson(1, 1, 1, "12ASD1231231231", "notes", "description",
      TargetStatus.NOT_STARTED, "", "");
    TargetJson targetJson2 = new TargetJson(2, 1, 1, "12ASD1231231231", "notes", "description",
      TargetStatus.NOT_STARTED, "", "");
    MetricChangeTarget metric3 = new MetricChangeTarget("mgrs", targetJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "billy.bob.joe");
    MetricChangeTarget metric4 = new MetricChangeTarget("description", targetJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "billy.bob.joe");
    MetricChangeTarget metric6 = new MetricChangeTarget("notes", targetJson2,
      new Timestamp(twoWeeksAgo + convertDaysToMS(12)), "billy.bob.joe");
    MetricChangeTarget metric60 = new MetricChangeTarget("notes", targetJson2,
      new Timestamp(twoWeeksAgo + convertDaysToMS(13)), "billy.bob.joe");

    MetricChangeSegment metric7 = new MetricChangeSegment(new SegmentJson(1, 1, 1, 1, new Timestamp(123),
      new Timestamp(234)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    IxnJson ixnJson1 =
      new IxnJson(1, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "",
        IxnApprovalStatus.NOT_REVIEWED);
    IxnJson ixnJson2 =
      new IxnJson(2, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "",
        IxnApprovalStatus.NOT_REVIEWED);
    IxnJson ixnJson3 =
      new IxnJson(3, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "",
        IxnApprovalStatus.NOT_REVIEWED);
    MetricChangeIxn metric8 = new MetricChangeIxn("time", ixnJson1, new Timestamp(twoWeeksAgo + convertDaysToMS(3)),
      "guy");
    MetricChangeIxn metric9 = new MetricChangeIxn("activity", ixnJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "guy");
    MetricChangeIxn metric10 = new MetricChangeIxn("time", ixnJson1, new Timestamp(twoWeeksAgo + convertDaysToMS(4)),
      "guy");
    MetricChangeIxn metric11 = new MetricChangeIxn("time", ixnJson2, new Timestamp(twoWeeksAgo + convertDaysToMS(4)),
      "guy");
    MetricChangeIxn metric12 = new MetricChangeIxn("time", ixnJson3, new Timestamp(twoWeeksAgo + convertDaysToMS(12)),
      "guy");
    MetricChangeIxn metric13 = new MetricChangeIxn("activity", ixnJson3,
      new Timestamp(twoWeeksAgo + convertDaysToMS(12)), "guy");
    MetricChangeIxn metric14 = new MetricChangeIxn("time", ixnJson3, new Timestamp(twoWeeksAgo + convertDaysToMS(13)),
      "guy");

    List<MetricChangeExploitDate> exploitDateChanges = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricChangeTarget> targetChanges = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric6, metric60
    ));

    List<MetricChangeIxn> ixnChanges = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13, metric14
    ));

    metricChangeExploitDateRepository.saveAll(exploitDateChanges);
    metricChangeTargetRepository.saveAll(targetChanges);
    metricChangeSegmentRepository.save(metric7);
    metricChangeIxnRepository.saveAll(ixnChanges);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageEditsPerWeek());
  }

  @Test
  public void returnsPercentageOfRfisThatMeetLTIOV() {
    assertEquals(0, metricsService.getLtiovMetPercentage());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(30)), "", "", "This is a ", "", "",
        "", "", "", "", "", "justifiction", "");
    Rfi rfi2 = new Rfi("SDT20-322", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(20)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi rfi3 = new Rfi("SDT20-323", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(35)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    //status is not closed, ignore
    Rfi rfi5 =
      new Rfi("SDT20-325", "", "NEW", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi6 =
      new Rfi("SDT20-326", "", "OPEN", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    rfiRepository.saveAll(new ArrayList<>(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6)));

    //closed immediately, ignore
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7)), "status", "NEW"
      , "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7) + 10000L),
      "status", "OPEN", "CLOSED"));

    //Closed before LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(10)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(17) + 10000L),
      "status", "OPEN", "CLOSED"));

    //Closed after LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    //No LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-324", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-324", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    assertEquals(67, metricsService.getLtiovMetPercentage());
  }

  @Test
  public void returnsEstimatedCompletionTime() {
    assertEquals(-1, metricsService.getAverageCompletionTimeLast3Rfis());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(30)), "", "", "This is a ", "", "",
        "", "", "", "", "", "justifiction", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(0)));
    Rfi rfi2 = new Rfi("SDT20-322", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(20)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(1)));
    Rfi rfi3 = new Rfi("SDT20-323", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(35)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(3)));
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(9)));

    MetricChangeRfi rfi1open = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(1)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close =
      new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(3)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2open = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(2)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi2close =
      new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(5)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi3open = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(4)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi3close =
      new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(8)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi4open = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(10)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi4close =
      new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(12)), "status", "OPEN", "CLOSED");

    rfiRepository.save(rfi1);
    metricChangeRfiRepository.saveAll(Arrays.asList(rfi1open, rfi1close));

    assertEquals(convertDaysToMS(2), metricsService.getAverageCompletionTimeLast3Rfis());

    rfiRepository.saveAll(Arrays.asList(rfi2, rfi3, rfi4));
    metricChangeRfiRepository.saveAll(Arrays.asList(rfi2open, rfi2close, rfi3open, rfi3close, rfi4open, rfi4close));

    assertEquals(convertDaysToMS(3), metricsService.getAverageCompletionTimeLast3Rfis());
  }

  @Test
  public void returnsRfisCompletedWithinDateRange() {
    MetricChangeRfi rfi1open = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(1)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close =
      new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(3)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2open = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(2)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi2close =
      new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(5)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi3open = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(4)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi3close =
      new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(8)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi4open = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(10)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi4close =
      new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(12)), "status", "OPEN", "CLOSED");

    metricChangeRfiRepository
      .saveAll(Arrays.asList(rfi1open, rfi1close, rfi2open, rfi2close, rfi3open, rfi3close, rfi4open,
        rfi4close));

    assertEquals(2,
      metricsService.getRfisCompleted(new Date(4 * MetricsService.MILLISECONDS_IN_A_DAY),
        new Date(9 * MetricsService.MILLISECONDS_IN_A_DAY)));
  }

  @Test
  public void returnsUniqueLoginsPerDayWithinDateRange() {
    long threeWeeksAgo = new Date().getTime() - convertDaysToMS(21);
    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);
    long oneWeekAgo = new Date().getTime() - convertDaysToMS(7);

    assertEquals(0, metricsService.getHoursWorkedBetween(new Timestamp(twoWeeksAgo), new Timestamp(oneWeekAgo)));

    MetricLogin metric1 = new MetricLogin("billy");
    MetricLogin metric2 = new MetricLogin("bob");
    MetricLogin metric3 = new MetricLogin("joe");
    MetricLogin metric4 = new MetricLogin("billy");
    MetricLogin metric5 = new MetricLogin("billy");
    MetricLogin metric6 = new MetricLogin("billy");
    MetricLogin metric7 = new MetricLogin("bob");
    MetricLogin metric8 = new MetricLogin("bob");
    MetricLogin metric9 = new MetricLogin("rob");

    //More than 2 weeks ago
    metric1.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(0)));
    metric2.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(5)));

    //Between 1 and 3 weeks ago. 3 total days worked * 5 == 15 hours
    metric4.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7))); //Billy
    metric5.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7))); //Billy
    metric6.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7))); //Bob

    metric7.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(11))); //Bob

    //Less than a week ago
    metric8.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(15)));
    metric9.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(17)));

    List<MetricLogin> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricLoginRepository.saveAll(metrics);

    assertEquals(15, metricsService.getHoursWorkedBetween(new Timestamp(twoWeeksAgo), new Timestamp(oneWeekAgo)));
  }

  @Test
  public void retunsUniqeCustomersWithinDateRange() {
    String rfiNum1 = "ABC20-00123";
    String rfiNum2 = "ABC20-00124";
    String rfiNum3 = "ABC20-00125";
    String rfiNum4 = "ABC20-00126";
    String rfiNum5 = "ABC20-00127";

    //Outside of date range, don't count
    Rfi rfi1 =
      new Rfi(rfiNum1, "", "CLOSED", new Date(), "10 IS", null, "", "", "", "", "", "", "", "", "", "", "", "");

    //Same customer, only count once
    Rfi rfi2 =
      new Rfi(rfiNum2, "", "CLOSED", new Date(), "30 IS", null, "", "", "", "", "", "", "", "", "", "", "", "");
    Rfi rfi3 =
      new Rfi(rfiNum3, "", "CLOSED", new Date(), "30 IS", null, "", "", "", "", "", "", "", "", "", "", "", "");

    //Second customer
    Rfi rfi4 =
      new Rfi(rfiNum4, "", "CLOSED", new Date(), "45 IS", null, "", "", "", "", "", "", "", "", "", "", "", "");

    //Open for less than a day, don't count
    Rfi rfi5 =
      new Rfi(rfiNum5, "", "CLOSED", new Date(), "497 ISRG", null, "", "", "", "", "", "", "", "", "", "", "", "");

    rfiRepository.saveAll(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5));

    long twoWeeksAgo = new Date().getTime() - 14 * MetricsService.MILLISECONDS_IN_A_DAY;
    long oneWeekAgo = new Date().getTime() - 7 * MetricsService.MILLISECONDS_IN_A_DAY;

    MetricChangeRfi rfi1open =
      new MetricChangeRfi(rfiNum1, new Date(twoWeeksAgo - 3 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close =
      new MetricChangeRfi(rfiNum1, new Date(twoWeeksAgo - MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2open =
      new MetricChangeRfi(rfiNum2, new Date(twoWeeksAgo + 3 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "NEW", "OPEN");
    MetricChangeRfi rfi2close =
      new MetricChangeRfi(rfiNum2, new Date(twoWeeksAgo + 5 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi3open =
      new MetricChangeRfi(rfiNum3, new Date(twoWeeksAgo + MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "NEW", "OPEN");
    MetricChangeRfi rfi3close =
      new MetricChangeRfi(rfiNum3, new Date(twoWeeksAgo + 4 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi4open =
      new MetricChangeRfi(rfiNum4, new Date(twoWeeksAgo + 2 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "NEW", "OPEN");
    MetricChangeRfi rfi4close =
      new MetricChangeRfi(rfiNum4, new Date(twoWeeksAgo + 6 * MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi5open =
      new MetricChangeRfi(rfiNum5, new Date(twoWeeksAgo + MetricsService.MILLISECONDS_IN_A_DAY),
        "status", "NEW", "OPEN");
    MetricChangeRfi rfi5close =
      new MetricChangeRfi(rfiNum5, new Date(twoWeeksAgo + MetricsService.MILLISECONDS_IN_A_DAY + 10000),
        "status", "OPEN", "CLOSED");

    metricChangeRfiRepository.saveAll(Arrays
      .asList(rfi1open, rfi1close, rfi2open, rfi2close, rfi3open, rfi3close, rfi4open, rfi4close, rfi5open, rfi5close));

    assertEquals(2, metricsService.getUniqueCustomersBetween(new Date(twoWeeksAgo), new Date(oneWeekAgo)));
  }

  @Test
  public void returnsTargetsCreatedWithinDateRange() {
    long threeWeeksAgo = new Date().getTime() - convertDaysToMS(21);
    TargetJson target = new TargetJson(1, 1, 1, "12QWE1231231231", "", "", TargetStatus.NOT_STARTED, "", "");
    MetricCreateTarget metric1 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric2 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric3 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric4 = new MetricCreateTarget(1, target, "20-0001", "billy.bob.joe", Boolean.FALSE);

    metric1.setTimestamp(new Timestamp(threeWeeksAgo));
    metric2.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7)));

    metricCreateTargetRepository.saveAll(Arrays.asList(metric1, metric2, metric3, metric4));

    assertEquals(3, metricsService
      .getTargetsCreatedWithinDateRange(new Date(threeWeeksAgo), new Date(threeWeeksAgo + convertDaysToMS(6))));
  }

  @Test
  public void returnsUnworkedRfisPercentage() {
    assertEquals(0, metricsService.getUnworkedRfiPercentage());

    // Cases: RFIs opened and worked, RFIs opened and not worked, RFIs not closed
    long oneWeekAgo = new Date().getTime() - 7 * MetricsService.MILLISECONDS_IN_A_DAY;

    String rfiNum1 = "ABC20-0001"; // not worked
    String rfiNum2 = "ABC20-0002"; // worked
    String rfiNum3 = "ABC20-0003"; // not closed
    String rfiNum4 = "ABC20-0004"; // worked

    MetricChangeRfi rfi1Open = new MetricChangeRfi(rfiNum1, new Date(oneWeekAgo), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1Close = new MetricChangeRfi(rfiNum1, new Date(oneWeekAgo + 30000), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2Open = new MetricChangeRfi(rfiNum2, new Date(oneWeekAgo), "status", "NEW", "OPEN");
    MetricChangeRfi rfi2Close =
      new MetricChangeRfi(rfiNum2, new Date(oneWeekAgo + 3 * MetricsService.MILLISECONDS_IN_A_DAY), "status", "OPEN",
        "CLOSED");

    MetricChangeRfi rfi3Open = new MetricChangeRfi(rfiNum3, new Date(oneWeekAgo), "status", "NEW", "OPEN");

    MetricChangeRfi rfi4Open = new MetricChangeRfi(rfiNum4, new Date(oneWeekAgo), "status", "NEW", "OPEN");
    MetricChangeRfi rfi4Close =
      new MetricChangeRfi(rfiNum4, new Date(oneWeekAgo + 2 * MetricsService.MILLISECONDS_IN_A_DAY), "status", "OPEN",
        "CLOSED");

    metricChangeRfiRepository
      .saveAll(Arrays.asList(rfi1Open, rfi1Close, rfi2Open, rfi2Close, rfi3Open, rfi4Open, rfi4Close));

    assertEquals(33, metricsService.getUnworkedRfiPercentage());
  }

  @Test
  public void returnsTrackAcceptanceRatiosByUser() {
    //Cases: track is completed but no corresponding accept/reject is found

    long twoWeeksAgo = new Date().getTime() - (14 * MetricsService.MILLISECONDS_IN_A_DAY);

    String user1 = "billy";
    String user2 = "bob";
    String checker = "Joseph";

    long ixn1id = 1234; // user 1, rejected then accepted
    long ixn2id = 2345; // user 2, accepted
    long ixn3id = 3456; // user 1, accepted
    long ixn4id = 5678; // user 2, rejected but not accepted
    long ixn5id = 6789; // user 1, completed but not accepted or rejected

    //Ixn 1

    MetricChangeIxn track1Complete = new MetricChangeIxn();
    track1Complete.setIxnId(ixn1id);
    track1Complete.setField("status");
    track1Complete.setNewData(IxnStatus.COMPLETED);
    track1Complete.setUserName(user1);
    track1Complete.setTimestamp(new Timestamp(twoWeeksAgo));

    MetricChangeIxn track1Reject = new MetricChangeIxn();
    track1Reject.setIxnId(ixn1id);
    track1Reject.setField("approval_status");
    track1Reject.setNewData(IxnApprovalStatus.REJECTED);
    track1Reject.setUserName(checker);
    track1Reject.setTimestamp(new Timestamp(twoWeeksAgo + MetricsService.MILLISECONDS_IN_A_DAY));

    MetricChangeIxn track1Complete2 = new MetricChangeIxn();
    track1Complete2.setIxnId(ixn1id);
    track1Complete2.setField("status");
    track1Complete2.setNewData(IxnStatus.COMPLETED);
    track1Complete2.setUserName(user1);
    track1Complete2.setTimestamp(new Timestamp(twoWeeksAgo + 2 * MetricsService.MILLISECONDS_IN_A_DAY));

    MetricChangeIxn track1Accept = new MetricChangeIxn();
    track1Accept.setIxnId(ixn1id);
    track1Accept.setField("approval_status");
    track1Accept.setNewData(IxnApprovalStatus.APPROVED);
    track1Accept.setUserName(checker);
    track1Accept.setTimestamp(new Timestamp(twoWeeksAgo + 3 * MetricsService.MILLISECONDS_IN_A_DAY));

    //Ixn 2

    MetricChangeIxn track2Complete2 = new MetricChangeIxn();
    track2Complete2.setIxnId(ixn2id);
    track2Complete2.setField("status");
    track2Complete2.setNewData(IxnStatus.COMPLETED);
    track2Complete2.setUserName(user2);
    track2Complete2.setTimestamp(new Timestamp(twoWeeksAgo));

    MetricChangeIxn track2Accept = new MetricChangeIxn();
    track2Accept.setIxnId(ixn2id);
    track2Accept.setField("approval_status");
    track2Accept.setNewData(IxnApprovalStatus.APPROVED);
    track2Accept.setUserName(checker);
    track2Accept.setTimestamp(new Timestamp(twoWeeksAgo + 2 * MetricsService.MILLISECONDS_IN_A_DAY));

    // Ixn 3

    MetricChangeIxn track3Complete2 = new MetricChangeIxn();
    track3Complete2.setIxnId(ixn3id);
    track3Complete2.setField("status");
    track3Complete2.setNewData(IxnStatus.COMPLETED);
    track3Complete2.setUserName(user1);
    track3Complete2.setTimestamp(new Timestamp(twoWeeksAgo + 6 * MetricsService.MILLISECONDS_IN_A_DAY));

    MetricChangeIxn track3Accept = new MetricChangeIxn();
    track3Accept.setIxnId(ixn3id);
    track3Accept.setField("approval_status");
    track3Accept.setNewData(IxnApprovalStatus.APPROVED);
    track3Accept.setUserName(checker);
    track3Accept.setTimestamp(new Timestamp(twoWeeksAgo + 12 * MetricsService.MILLISECONDS_IN_A_DAY));

    //Ixn 4

    MetricChangeIxn track4Complete = new MetricChangeIxn();
    track4Complete.setIxnId(ixn4id);
    track4Complete.setField("status");
    track4Complete.setNewData(IxnStatus.COMPLETED);
    track4Complete.setUserName(user2);
    track4Complete.setTimestamp(new Timestamp(twoWeeksAgo));

    MetricChangeIxn track4Reject = new MetricChangeIxn();
    track4Reject.setIxnId(ixn4id);
    track4Reject.setField("approval_status");
    track4Reject.setNewData(IxnApprovalStatus.REJECTED);
    track4Reject.setUserName(checker);
    track4Reject.setTimestamp(new Timestamp(twoWeeksAgo + MetricsService.MILLISECONDS_IN_A_DAY));

    // Ixn 5

    MetricChangeIxn track5Complete = new MetricChangeIxn();
    track5Complete.setIxnId(ixn5id);
    track5Complete.setField("status");
    track5Complete.setNewData(IxnStatus.COMPLETED);
    track5Complete.setUserName(user1);
    track5Complete.setTimestamp(new Timestamp(twoWeeksAgo + 8 * MetricsService.MILLISECONDS_IN_A_DAY));

    metricChangeIxnRepository.saveAll(Arrays
      .asList(track1Complete, track1Reject, track1Complete2, track1Accept, track2Complete2, track2Accept,
        track3Complete2, track3Accept, track4Complete, track4Reject, track5Complete));

    List<UserPerformanceMetric> metrics = metricsService.getUserPerformanceMetrics();

    assertEquals("billy", metrics.get(0).getUserName());
    assertEquals(67, metrics.get(0).getApprovalRating());
    assertEquals("bob", metrics.get(1).getUserName());
    assertEquals(50, metrics.get(1).getApprovalRating());
  }

  @Test
  public void returnsAverageTrackComp() {
    // Cases: status changed to completed, other change
    assertEquals(0, metricsService.getAverageTracksCompletedPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricChangeIxn metric1 = new MetricChangeIxn();
    MetricChangeIxn metric2 = new MetricChangeIxn();
    MetricChangeIxn metric3 = new MetricChangeIxn();
    MetricChangeIxn metric4 = new MetricChangeIxn();
    MetricChangeIxn metric5 = new MetricChangeIxn();

    metric1.setField("status");
    metric2.setField("status");
    metric3.setField("status");
    metric4.setField("status");
    metric5.setField("status");

    metric1.setNewData(IxnStatus.COMPLETED);
    metric2.setNewData(IxnStatus.COMPLETED);
    metric3.setNewData(IxnStatus.COMPLETED);
    metric4.setNewData(IxnStatus.IN_PROGRESS);
    metric5.setNewData(IxnStatus.COMPLETED);

    metric1.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(0)));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(8)));

    List<MetricChangeIxn> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5
    ));

    metricChangeIxnRepository.saveAll(metrics);

    assertEquals(2, metricsService.getAverageTracksCompletedPerWeek());
  }

  private long now;

  private Date daysAgo(int daysAgo) {
    return new Date(now - daysAgo * MetricsService.MILLISECONDS_IN_A_DAY);
  }

  @Test
  public void returnsEstimatedCompletionTimeBasedOnTargets() {
    now = new Date().getTime();

    String openRfiNum = "SDT20-0009";
    Rfi openRfi = new Rfi(openRfiNum, "", "OPEN", new Date(), "", null, "", "", "", "", "", "", "", "", "", "", "", "");

    rfiRepository.save(openRfi);

    long openRfiId = rfiRepository.findByRfiNum(openRfiNum).getId();

    ExploitDate openRfiExploitDate = new ExploitDate(new Date(), openRfiId);

    exploitDateRepository.save(openRfiExploitDate);

    long openRfiExploitDateId = exploitDateRepository.findAllByRfiId(openRfiId).get(0).getId();

    Target openRfiTarget1 =
      new Target(new TargetJson(openRfiId, openRfiExploitDateId, "12QWE1231231231", "", ""), "20-0003");
    Target openRfiTarget2 =
      new Target(new TargetJson(openRfiId, openRfiExploitDateId, "12QWE1231231232", "", ""), "20-0003");
    Target openRfiTarget3 =
      new Target(new TargetJson(openRfiId, openRfiExploitDateId, "12QWE1231231233", "", ""), "20-0003");

    targetRepository.saveAll(Arrays.asList(openRfiTarget1, openRfiTarget2, openRfiTarget3));

    // 3 target / 0.5 tgts/day = 6 days to complete open RFI

    MetricChangeRfi openRfiOpen = new MetricChangeRfi(openRfiNum, daysAgo(2), "status", "NEW", "OPEN");

    metricChangeRfiRepository.save(openRfiOpen);

    assertEquals(-1, metricsService.getEstimatedCompletionTimeByNumberOfTargets(openRfi.getId()));

    // Add some completed RFIs with targets
    // 3 cases: completed RFI older than 6 months (ignore), completed RFI with no targets (ignore), completed rfi with
    // targets within last 6 months (PAY ATTENTION).
    String oldRfiNum = "SDT20-0001";
    Rfi oldRfi =
      new Rfi(oldRfiNum, "", "CLOSED", new Date(), "", null, "", "", "", "", "", "", "", "", "", "", "", "");

    String targetlessRfiNum = "SDT20-0002";
    Rfi targetlessRfi =
      new Rfi(targetlessRfiNum, "", "CLOSED", new Date(), "", null, "", "", "", "", "", "", "", "", "", "", "", "");

    String goodRfi1Num = "SDT20-0003";
    Rfi goodRfi1 =
      new Rfi(goodRfi1Num, "", "CLOSED", new Date(), "", null, "", "", "", "", "", "", "", "", "", "", "", "");

    String goodRfi2Num = "SDT20-0004";
    Rfi goodRfi2 =
      new Rfi(goodRfi2Num, "", "CLOSED", new Date(), "", null, "", "", "", "", "", "", "", "", "", "", "", "");

    rfiRepository.saveAll(Arrays.asList(oldRfi, targetlessRfi, goodRfi1, goodRfi2));

    long oldRfiId = rfiRepository.findByRfiNum(oldRfiNum).getId();
    long goodRfi1Id = rfiRepository.findByRfiNum(goodRfi1Num).getId();
    long goodRfi2Id = rfiRepository.findByRfiNum(goodRfi2Num).getId();

    ExploitDate oldRfiExploitDate = new ExploitDate(new Date(), oldRfiId);
    ExploitDate goodRfi1ExploitDate = new ExploitDate(new Date(), goodRfi1Id);
    ExploitDate goodRfi2ExploitDate = new ExploitDate(new Date(), goodRfi2Id);

    exploitDateRepository.saveAll(Arrays.asList(oldRfiExploitDate, goodRfi1ExploitDate, goodRfi2ExploitDate));

    long oldRfiExploitDateId = exploitDateRepository.findAllByRfiId(oldRfiId).get(0).getId();
    long goodRfi1ExploitDateId = exploitDateRepository.findAllByRfiId(goodRfi1Id).get(0).getId();
    long goodRfi2ExploitDateId = exploitDateRepository.findAllByRfiId(goodRfi2Id).get(0).getId();

    Target oldRfiTarget =
      new Target(new TargetJson(oldRfiId, oldRfiExploitDateId, "12QWE1231231231", "", ""), "20-0003");

    Target goodRfi1Target1 =
      new Target(new TargetJson(goodRfi1Id, goodRfi1ExploitDateId, "12QWE1231231231", "", ""), "20-0003");

    Target goodRfi1Target2 =
      new Target(new TargetJson(goodRfi1Id, goodRfi1ExploitDateId, "12QWE1231231232", "", ""), "20-0003");

    Target goodRfi1DeletedTarget =
      new Target(new TargetJson(goodRfi1Id, goodRfi1ExploitDateId, "12QWE1231231233", "", ""), "20-0003");
    goodRfi1DeletedTarget.setDeleted(new Timestamp(new Date().getTime()));

    Target goodRfi2Target1 =
      new Target(new TargetJson(goodRfi2Id, goodRfi2ExploitDateId, "12QWE1231231231", "", ""), "20-0003");

    Target goodRfi2Target2 =
      new Target(new TargetJson(goodRfi2Id, goodRfi2ExploitDateId, "12QWE1231231232", "", ""), "20-0003");

    Target goodRfi2Target3 =
      new Target(new TargetJson(goodRfi2Id, goodRfi2ExploitDateId, "12QWE1231231233", "", ""), "20-0003");

    targetRepository.saveAll(Arrays
      .asList(oldRfiTarget, goodRfi1Target1, goodRfi1Target2, goodRfi1DeletedTarget, goodRfi2Target1, goodRfi2Target2,
        goodRfi2Target3));

    MetricChangeRfi oldRfiOpen = new MetricChangeRfi(oldRfiNum, daysAgo(200), "status", "NEW", "OPEN");
    MetricChangeRfi oldRfiClose = new MetricChangeRfi(oldRfiNum, daysAgo(190), "status", "OPEN", "CLOSED");

    MetricChangeRfi targetlessRfiOpen = new MetricChangeRfi(targetlessRfiNum, daysAgo(60), "status", "NEW", "OPEN");
    MetricChangeRfi targetlessRfiClose = new MetricChangeRfi(targetlessRfiNum, daysAgo(50), "status", "OPEN", "CLOSED");

    //Open for 3 days, has 2 targets
    MetricChangeRfi goodRfi1Open = new MetricChangeRfi(goodRfi1Num, daysAgo(43), "status", "NEW", "OPEN");
    MetricChangeRfi goodRfi1Close = new MetricChangeRfi(goodRfi1Num, daysAgo(40), "status", "OPEN", "CLOSED");

    //Open for 7 days, has 3 targets
    MetricChangeRfi goodRfi2Open = new MetricChangeRfi(goodRfi2Num, daysAgo(37), "status", "NEW", "OPEN");
    MetricChangeRfi goodRfi2Close = new MetricChangeRfi(goodRfi2Num, daysAgo(30), "status", "OPEN", "CLOSED");

    metricChangeRfiRepository.saveAll(Arrays
      .asList(oldRfiOpen, oldRfiClose, targetlessRfiOpen, targetlessRfiClose, goodRfi1Open, goodRfi1Close, goodRfi2Open,
        goodRfi2Close));

    // 0.5 targets / day

    assertEquals(6 * MetricsService.MILLISECONDS_IN_A_DAY,
      metricsService.getEstimatedCompletionTimeByNumberOfTargets(openRfi.getId()));
  }
}
