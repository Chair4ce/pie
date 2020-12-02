package redv.magpie.ixns;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.metrics.change.ixn.MetricChangeIxn;
import redv.magpie.metrics.change.ixn.MetricChangeIxnRepository;
import redv.magpie.metrics.change.segment.MetricChangeSegment;
import redv.magpie.metrics.change.segment.MetricChangeSegmentRepository;
import redv.magpie.metrics.create.ixn.MetricCreateIxn;
import redv.magpie.metrics.create.ixn.MetricCreateIxnRepository;
import redv.magpie.metrics.create.segment.MetricCreateSegment;
import redv.magpie.metrics.create.segment.MetricCreateSegmentRepository;
import redv.magpie.metrics.delete.ixn.MetricDeleteIxnRepository;
import redv.magpie.metrics.delete.segment.MetricDeleteSegment;
import redv.magpie.metrics.delete.segment.MetricDeleteSegmentRepository;
import redv.magpie.metrics.undo.ixnDelete.MetricUndoIxnDeleteRepository;
import redv.magpie.metrics.undo.segmentDelete.MetricUndoSegmentDeleteRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.*;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.*;

public class IxnControllerTest extends BaseIntegrationTest {
  @Autowired
  RfiRepository rfiRepository;
  @Autowired
  ExploitDateRepository exploitDateRepository;
  @Autowired
  TargetRepository targetRepository;
  @Autowired
  TargetNameRepository targetNameRepository;
  @Autowired
  SegmentRepository segmentRepository;
  @Autowired
  IxnRepository ixnRepository;
  @Autowired
  MetricCreateSegmentRepository metricCreateSegmentRepository;
  @Autowired
  MetricCreateIxnRepository metricCreateIxnRepository;
  @Autowired
  MetricDeleteIxnRepository metricDeleteIxnRepository;
  @Autowired
  MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  @Autowired
  MetricChangeSegmentRepository metricChangeSegmentRepository;
  @Autowired
  MetricChangeIxnRepository metricChangeIxnRepository;
  @Autowired
  MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository;
  @Autowired
  MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository;
  @Autowired
  IxnController ixnController;
  @Autowired
  TargetController targetController;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
    metricCreateSegmentRepository.deleteAll();
    metricCreateIxnRepository.deleteAll();
    metricDeleteIxnRepository.deleteAll();
    metricDeleteSegmentRepository.deleteAll();
    metricChangeSegmentRepository.deleteAll();
    metricChangeIxnRepository.deleteAll();
    metricUndoSegmentDeleteRepository.deleteAll();

  }

  @Test
  public void addsSegments() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a " +
      "justifiction", "", "", "", "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();

    String segmentJsonString = "{" +
      "\"id\":null," +
      "\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"startTime\":\"1970-01-01T12:34:56.000Z\"" +
      ",\"endTime\":\"1970-01-01T13:02:00.000Z\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(segmentJsonString)
      .when()
      .post(IxnController.URI + "/segment/post")
      .then()
      .statusCode(200);

    assertEquals(1, segmentRepository.findAll().size());
    assertEquals(1, metricCreateSegmentRepository.findAll().size());

    Segment segment = segmentRepository.findAll().get(0);

    assertEquals(rfiId, segment.getRfiId());
    assertEquals(exploitDateId, segment.getExploitDateId());
    assertEquals(targetId, segment.getTargetId());
    assertEquals("1970-01-01 12:34:56.0", segment.getStartTime().toString());
    assertEquals("1970-01-01 13:02:00.0", segment.getEndTime().toString());

    MetricCreateSegment metric = metricCreateSegmentRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals(exploitDateId, metric.getExploitDateId());
    assertEquals(targetId, metric.getTargetId());
    assertEquals(segment.getId(), metric.getSegmentId());
    assertEquals("1970-01-01 12:34:56.0", metric.getSegmentStart().toString());
    assertEquals("1970-01-01 13:02:00.0", metric.getSegmentEnd().toString());
  }

  @Test
  public void getsSegments() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    exploitDateRepository.save(new ExploitDate(new Date(), rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + //MM
          10) * //SS
          1000 //milliseconds
      ),
      new Timestamp(
        (15 * 3600 + //HH
          45 * 60 + //MM
          30) * //SS
          1000 //milliseconds
      )
    )));
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (5 * 3600 + //HH
          15 * 60 + //MM
          15) * //SS
          1000 //milliseconds
      ),
      new Timestamp(
        (9 * 3600 + //HH
          30 * 60 + //MM
          45) * //SS
          1000 //milliseconds
      )
    )));

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(IxnController.URI + "/segment/" + targetId)
      .then()
      .statusCode(200)
      .body("[0].startTime", equalTo("1970-01-01T05:15:15.000+0000"))
      .body("[0].endTime", equalTo("1970-01-01T09:30:45.000+0000"))
      .body("[1].startTime", equalTo("1970-01-01T12:30:10.000+0000"))
      .body("[1].endTime", equalTo("1970-01-01T15:45:30.000+0000"));
  }

  @Test
  public void addsInteractions() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds

      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    IxnJson ixnJson = new IxnJson(rfiId, exploitDateId, targetId, segmentId, "Billy Bob",
      new Timestamp(
        (12 * 3600 +
          10 * 60 +
          55)
          * 1000),
      "Person entered building from right", "Billy Joe", IxnStatus.NOT_STARTED, "", "", "", "");

    String json = objectMapper.writeValueAsString(ixnJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(json)
      .when()
      .post(IxnController.URI + "/post?userName=Billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    Ixn ixn = ixnRepository.findAll().get(0);

    assertEquals("Billy Bob", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:10:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right", ixn.getActivity());
    assertEquals("Billy Joe", ixn.getTrackAnalyst());
    assertEquals("NOT_STARTED", ixn.getStatus());
    assertEquals("", ixn.getChecker());


    assertEquals(1, metricCreateIxnRepository.findAll().size());

    MetricCreateIxn metric = metricCreateIxnRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals(exploitDateId, metric.getExploitDateId());
    assertEquals(targetId, metric.getTargetId());
    assertEquals(segmentId, metric.getSegmentId());
    assertEquals(ixn.getId(), metric.getIxnId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void getsIxns() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "0001-234",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(IxnController.URI + "/" + targetId)
      .then()
      .statusCode(200)
      .body("[0].exploitAnalyst", equalTo(""))
      .body("[0].time", equalTo("1970-01-01T12:15:10.000+0000"))
      .body("[0].activity", equalTo("Person entered vehicle"))
      .body("[0].track", equalTo("0001-234"))
      .body("[1].exploitAnalyst", equalTo("Billy Bob"))
      .body("[1].time", equalTo("1970-01-01T12:15:55.000+0000"))
      .body("[1].activity", equalTo(""))
      .body("[1].track", equalTo(""));
  }

  @Test
  public void deletesIxns() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "0001-234",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    long ixnId = ixnRepository.findAll().get(0).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/" + ixnId)
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    assertEquals(1, metricDeleteIxnRepository.findAll().size());

    assertEquals(ixnId, metricDeleteIxnRepository.findAll().get(0).getIxnId());
  }

  @Test
  public void deletesSegmentinos() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "0001-234",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    assertEquals(1, ixnController.getSegments(targetId).size());
    assertEquals(2, ixnRepository.findAll().size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/segment/" + segmentId)
      .then()
      .statusCode(200);

    assertEquals(0, ixnController.getSegments(targetId).size());
    assertEquals(0, ixnController.getIxns(targetId).size());

    assertEquals(1, metricDeleteSegmentRepository.findAll().size());

    MetricDeleteSegment metric = metricDeleteSegmentRepository.findAll().get(0);

    assertEquals(segmentId, metric.getSegmentId());
    assertTrue(metric.isHadIxns());

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));

    segmentId = segmentRepository.findAll().get(1).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/segment/" + segmentId)
      .then()
      .statusCode(200);

    assertEquals(2, metricDeleteSegmentRepository.findAll().size());

    metric = metricDeleteSegmentRepository.findAll().get(1);

    assertFalse(metric.isHadIxns());
  }

  @Test
  public void editsSegments() {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "0001-234",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    String segmentJsonString = "{" +
      "\"id\":" + segmentId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"startTime\":\"1970-01-01T12:30:00.000Z\"" +
      ",\"endTime\":\"1970-01-01T15:15:30.000Z\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(segmentJsonString)
      .when()
      .post(IxnController.URI + "/segment/post")
      .then()
      .statusCode(200);

    assertEquals(1, segmentRepository.findAll().size());
    Segment segment = segmentRepository.findAll().get(0);

    assertEquals(rfiId, segment.getRfiId());
    assertEquals(exploitDateId, segment.getExploitDateId());
    assertEquals(targetId, segment.getTargetId());
    assertEquals("1970-01-01 12:30:00.0", segment.getStartTime().toString());
    assertEquals("1970-01-01 15:15:30.0", segment.getEndTime().toString());

    assertEquals(1, metricChangeSegmentRepository.findAll().size());
    MetricChangeSegment metric = metricChangeSegmentRepository.findAll().get(0);

    assertEquals(segmentId, metric.getSegmentId());
    assertEquals("1970-01-01 12:30:00.0", metric.getNewSegmentStart().toString());
    assertEquals("1970-01-01 15:15:30.0", metric.getNewSegmentEnd().toString());
  }

  @Test
  public void editIxns() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "12WQE1231231231", "", ""), "20-0001"));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered building from right",
      "0001-234",
      "",
      IxnStatus.NOT_STARTED,
      "",
      IxnApprovalStatus.NOT_REVIEWED));

    long ixnId = ixnRepository.findAll().get(0).getId();

    IxnJson ixnJson = new IxnJson(ixnId, rfiId, exploitDateId, targetId, segmentId, "William Robert", new Timestamp(
      (12 * 3600 +
        15 * 60 +
        55)
        * 1000
    ), "Person entered building from right side", "William Joseph", IxnStatus.NOT_STARTED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED);

    String json = objectMapper.writeValueAsString(ixnJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(json)
      .when()
      .post(IxnController.URI + "/post?userName=william.robert.joseph")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    Ixn ixn = ixnRepository.findAll().get(0);

    assertEquals("William Robert", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:15:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right side", ixn.getActivity());
    assertEquals("William Joseph", ixn.getTrackAnalyst());
    assertEquals(IxnStatus.NOT_STARTED, ixn.getStatus());
    assertEquals("", ixn.getChecker());

    ixnJson.setStatus(IxnStatus.IN_PROGRESS);

    json = objectMapper.writeValueAsString(ixnJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(json)
      .when()
      .post(IxnController.URI + "/post?userName=Giuseppe.Alfredo")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    ixn = ixnRepository.findAll().get(0);

    assertEquals("William Robert", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:15:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right side", ixn.getActivity());
    assertEquals("0001-001", ixn.getTrack());
    assertEquals("William Joseph", ixn.getTrackAnalyst());
    assertEquals("IN_PROGRESS", ixn.getStatus());
    assertEquals("", ixn.getChecker());

    assertEquals(4, metricChangeIxnRepository.findAll().size());

    MetricChangeIxn metric1 = metricChangeIxnRepository.findAll().get(0);
    MetricChangeIxn metric4 = metricChangeIxnRepository.findAll().get(3);

    assertEquals(ixnId, metric1.getIxnId());
    assertEquals("exploit_analyst", metric1.getField());
    assertEquals("William Robert", metric1.getNewData());
    assertEquals("william.robert.joseph", metric1.getUserName());

    assertEquals(ixnId, metric4.getIxnId());
    assertEquals("status", metric4.getField());
    assertEquals("giuseppe.alfredo", metric4.getUserName());

    ixnJson.setTrackNarrative("START\n\nSome things happened at a specific time.\n\nSTOP");

    json = objectMapper.writeValueAsString(ixnJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(json)
      .when()
      .post(IxnController.URI + "/post")
      .then()
      .statusCode(200);

    ixn = ixnRepository.findById(ixnId).get();

    assertEquals("START\n\nSome things happened at a specific time.\n\nSTOP", ixn.getTrackNarrative());

    assertEquals(5, metricChangeIxnRepository.findAll().size());

    MetricChangeIxn metric5 = metricChangeIxnRepository.findAll().get(4);

    assertEquals(ixnId, metric5.getIxnId());
    assertEquals("track_narrative", metric5.getField());
    assertEquals("START\n\nSome things happened at a specific time.\n\nSTOP", metric5.getNewData());

    ixnJson.setNote("This is a note");

    json = objectMapper.writeValueAsString(ixnJson);

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(json)
      .when()
      .post(IxnController.URI + "/post")
      .then()
      .statusCode(200);

    ixn = ixnRepository.findById(ixnId).get();

    assertEquals("This is a note", ixn.getNote());

    MetricChangeIxn metric6 = metricChangeIxnRepository.findAll().get(5);

    assertEquals(ixnId, metric6.getIxnId());
    assertEquals("note", metric6.getField());
    assertEquals("This is a note", metric6.getNewData());
  }

  @Test
  public void assignsTrackIDsOnIxnSegmentTargetExploitDateDeleteAndTargetRename() throws Exception {
    long rfiId;
    long exploitDate2Id;
    long target2Id;
    long segment2Id;


    setupIxns();
    segment2Id = segmentRepository.findAll().get(1).getId();

    ixnController.deleteIxn(ixnRepository.findAll().get(2).getId());
    assertEquals("0001-002", ixnRepository.findAll().get(3).getTrack());

    ixnController.deleteSegment(segment2Id);

    assertEquals("0001-001", ixnRepository.findAll().get(0).getTrack());

    clean();
    setupIxns();
    exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetController.deleteExploitDate(exploitDate2Id);
    assertEquals("0001-001", ixnRepository.findAll().get(0).getTrack());

    clean();
    setupIxns();
    target2Id = targetRepository.findAll().get(1).getId();

    targetController.deleteTarget(target2Id);
    assertEquals("0001-001", ixnRepository.findAll().get(0).getTrack());

    clean();
    setupIxns();
    rfiId = rfiRepository.findAll().get(0).getId();
    exploitDate2Id = exploitDateRepository.findAll().get(1).getId();
    target2Id = targetRepository.findAll().get(1).getId();

    targetController
      .postTarget(Collections.singletonList(new TargetJson(target2Id, rfiId, exploitDate2Id, "12WQE1231231232", "",
        "", TargetStatus.IN_PROGRESS, "", "")), "billy.bob.joe", "false");

    assertEquals("0001-001", ixnRepository.findAll().get(0).getTrack());

    targetController.postTarget(
      Collections.singletonList(new TargetJson(target2Id, rfiId, exploitDate2Id, "12WQE1231231231", "",
        "", TargetStatus.IN_PROGRESS, "", "")), "billy.bob.joe", "false");

    assertEquals("0001-003", ixnRepository.findAll().get(0).getTrack());
  }

  @Test
  public void undoesIxnDeleteAndLogsMetric() throws Exception {
    setupIxns();
    Ixn ixn = ixnRepository.findAll().get(0);
    IxnJson ixnJson = new IxnJson(ixn.getId(), ixn.getRfiId(), ixn.getExploitDateId(), ixn.getTargetId(),
      ixn.getSegmentId(), ixn.getExploitAnalyst(), ixn.getTime(), ixn.getActivity(), ixn.getTrackAnalyst(),
      ixn.getStatus(), ixn.getChecker(), ixn.getTrackNarrative(), ixn.getNote(), ixn.getApprovalStatus());

    long ixnId = ixn.getId();

    long numIxns = ixnRepository.findAll().size();

    ixnController.deleteIxn(ixnId);

    ixnController.postIxn(ixnJson, "billyy");

    assertEquals(numIxns, ixnRepository.findAll().size());
    assertEquals(1, metricUndoIxnDeleteRepository.findAll().size());
    assertEquals(ixnId, metricUndoIxnDeleteRepository.findAll().get(0).getIxnId());

  }

  @Test
  public void undoesSegmentDeleteAndLogsMetrics() throws Exception {
    setupIxns();
    Segment segment = segmentRepository.findAll().get(0);
    SegmentJson segmentJson = new SegmentJson(segment.getId(), segment.getRfiId(), segment.getExploitDateId(),
      segment.getTargetId(), segment.getStartTime(), segment.getEndTime());

    long segmentId = segment.getId();

    long numSegments = segmentRepository.findAll().size();

    ixnController.deleteSegment(segmentId);

    ixnController.postSegment(segmentJson);

    assertEquals(numSegments, segmentRepository.findAll().size());
    assertEquals(1, metricUndoSegmentDeleteRepository.findAll().size());
    assertEquals(segmentId, metricUndoSegmentDeleteRepository.findAll().get(0).getSegmentId());
  }

  private void setupIxns() throws Exception {
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

    targetController.postTarget(Collections.singletonList(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", "")), "billy.bob.joe", "false");
    long target1Id = targetRepository.findAll().get(0).getId();

    targetController.postTarget(Collections.singletonList(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231232", "", "")), "billy.bob.joe", "false");
    long target2Id = targetRepository.findAll().get(1).getId();


    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id,
      new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnController.postIxn(new IxnJson(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", IxnStatus.IN_PROGRESS, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe"); //0001-003
    ixnController.postIxn(new IxnJson(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", IxnStatus.NOT_STARTED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");
    ixnController.postIxn(new IxnJson(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", IxnStatus.IN_PROGRESS, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe"); //0001-004
    ixnController.postIxn(new IxnJson(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", IxnStatus.DOES_NOT_MEET_EEI, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");
    ixnController.postIxn(new IxnJson(rfiId, exploitDate1Id, target1Id, segment1Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", IxnStatus.COMPLETED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe"); //0001-005

    ixnController.postIxn(new IxnJson(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(123000).getTime()), "", "", IxnStatus.NOT_STARTED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");
    ixnController.postIxn(new IxnJson(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(234000).getTime()), "", "", IxnStatus.NOT_STARTED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");
    ixnController.postIxn(new IxnJson(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(345000).getTime()), "", "", IxnStatus.IN_PROGRESS, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");  //0002-001
    ixnController.postIxn(new IxnJson(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", IxnStatus.DOES_NOT_MEET_EEI, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe");
    ixnController.postIxn(new IxnJson(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", IxnStatus.COMPLETED, "", "", "",
      IxnApprovalStatus.NOT_REVIEWED), "billy.bob.joe"); //0002-002
  }
}
