package redv.magpie.tgts;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.ixns.*;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDate;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDateRepository;
import redv.magpie.metrics.change.target.MetricChangeTarget;
import redv.magpie.metrics.change.target.MetricChangeTargetRepository;
import redv.magpie.metrics.create.exploitDate.MetricCreateExploitDate;
import redv.magpie.metrics.create.exploitDate.MetricCreateExploitDateRepository;
import redv.magpie.metrics.create.target.MetricCreateTarget;
import redv.magpie.metrics.create.target.MetricCreateTargetRepository;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDateRepository;
import redv.magpie.metrics.delete.target.MetricDeleteTargetRepository;
import redv.magpie.metrics.undo.exploitDateDelete.MetricUndoExploitDateDeleteRepository;
import redv.magpie.metrics.undo.targetCreate.MetricUndoTargetCreateRepository;
import redv.magpie.metrics.undo.targetDelete.MetricUndoTargetDeleteRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateJson;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.*;


public class TargetControllerTest extends BaseIntegrationTest {
  TargetController targetController;
  IxnController ixnController;
  RfiRepository rfiRepository;
  ExploitDateRepository exploitDateRepository;
  TargetRepository targetRepository;
  TargetNameRepository targetNameRepository;
  SegmentRepository segmentRepository;
  IxnRepository ixnRepository;
  MetricCreateExploitDateRepository metricCreateExploitDateRepository;
  MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  MetricCreateTargetRepository metricCreateTargetRepository;
  MetricChangeTargetRepository metricChangeTargetRepository;
  MetricDeleteTargetRepository metricDeleteTargetRepository;
  MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository;
  MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository;
  MetricUndoTargetCreateRepository metricUndoTargetCreateRepository;

  @Autowired
  public void setTargetController(TargetController targetController) {
    this.targetController = targetController;
  }

  @Autowired
  public void setIxnController(IxnController ixnController) {
    this.ixnController = ixnController;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
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
  public void setSegmentRepository(SegmentRepository segmentRepository) {
    this.segmentRepository = segmentRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setMetricCreateExploitDateRepository(
    MetricCreateExploitDateRepository metricCreateExploitDateRepository) {
    this.metricCreateExploitDateRepository = metricCreateExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeExploitDateRepository(
    MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @Autowired
  public void setMetricDeleteExploitDateRepository(
    MetricDeleteExploitDateRepository metricDeleteExploitDateRepository) {
    this.metricDeleteExploitDateRepository = metricDeleteExploitDateRepository;
  }

  @Autowired
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricChangeTargetRepository(MetricChangeTargetRepository metricChangeTargetRepository) {
    this.metricChangeTargetRepository = metricChangeTargetRepository;
  }

  @Autowired
  public void setMetricDeleteTargetRepository(MetricDeleteTargetRepository metricDeleteTargetRepository) {
    this.metricDeleteTargetRepository = metricDeleteTargetRepository;
  }

  @Autowired
  public void setMetricUndoTargetDeleteRepository(MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository) {
    this.metricUndoTargetDeleteRepository = metricUndoTargetDeleteRepository;
  }

  @Autowired
  public void setMetricUndoExploitDateDeleteRepository(
    MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository) {
    this.metricUndoExploitDateDeleteRepository = metricUndoExploitDateDeleteRepository;
  }

  @Autowired
  public void setMetricUndoTargetCreateRepository(
    MetricUndoTargetCreateRepository metricUndoTargetCreateRepository) {
    this.metricUndoTargetCreateRepository = metricUndoTargetCreateRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    targetNameRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
    metricCreateExploitDateRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricUndoTargetDeleteRepository.deleteAll();
    metricUndoExploitDateDeleteRepository.deleteAll();
    metricUndoTargetCreateRepository.deleteAll();
  }

  @Test
  public void addsExploitDatesCorrectly() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    ExploitDateJson exploitDateJson = new ExploitDateJson(
      rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 11:22:33").getTime()));

    targetController.postExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());
    assertEquals("2020-11-11 00:00:00.0", exploitDateRepository.findAll().get(0).getExploitDate().toString());

    targetController.postExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals(1, metricCreateExploitDateRepository.findAll().size());

    MetricCreateExploitDate metric = metricCreateExploitDateRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());

    assertEquals(exploitDateRepository.findAll().get(0).getId(), metric.getExploitDateId());
  }

  @Test
  public void returnsExploitDates() throws Exception {

    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));

    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();

    List<ExploitDate> dates = new ArrayList<>();
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("15/11/2020").getTime()),
      rfiId
    ));
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("20/11/2020").getTime()),
      rfiId + 5
    ));

    exploitDateRepository.saveAll(dates);

    List<ExploitDate> returnedDates = targetController.getExploitDates(
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId()
    );

    assertEquals(2, returnedDates.size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(TargetController.URI + "/dates?rfiId=" + rfiId)
      .then()
      .statusCode(200)
      .body("[0].exploitDate", equalTo("2020-11-11T00:00:00.000+0000"))
      .body("[1].exploitDate", equalTo("2020-11-15T00:00:00.000+0000"))
      .body("[2].exploitDate", equalTo(null));
  }

  @Test
  public void addsNewTargets() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    String json = objectMapper.writeValueAsString(Collections.singletonList(targetJson));

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(TargetController.URI + "/post?userName=William.Robert.Joseph")
      .then()
      .statusCode(200);

    Target target = targetRepository.findAll().get(0);

    assertEquals(rfiRepository.findByRfiNum("SDT-123").getId(), target.getRfiId());
    assertEquals(exploitDateRepository.findAllByRfiId(rfiId).get(0).getId(), target.getExploitDateId());
    assertEquals("20-0001", target.getName());
    assertEquals("12ABC1234567890", target.getMgrs());
    assertEquals("These are some EEI notes", target.getNotes());
    assertEquals("This is a description", target.getDescription());

    targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some different EEI notes",
      "This is a unique description"
    );

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");
    assertEquals(1, targetRepository.findAll().size());

    assertEquals(1, metricCreateTargetRepository.findAll().size());

    MetricCreateTarget metric = metricCreateTargetRepository.findAll().get(0);

    assertEquals(target.getRfiId(), metric.getRfiId());
    assertEquals(target.getExploitDateId(), metric.getExploitDateId());
    assertEquals(target.getId(), metric.getTargetId());
    assertEquals("william.robert.joseph", metric.getUserName());
    assertEquals(false, metric.getIsCopy());
  }

  @Test
  public void changesExploitDates() throws Exception {
    Timestamp oldDate = new Timestamp(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    Timestamp newDate = new Timestamp(new SimpleDateFormat("MM/dd/yyyy").parse("11/12/2020").getTime());

    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      oldDate,
      rfiId
    ));

    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId, oldDate).getId();

    ExploitDateJson changeExploitDateJson = new ExploitDateJson(
      exploitDateId,
      rfiId,
      newDate
    );

    targetController.postExploitDate(changeExploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals(newDate, exploitDateRepository.findAll().get(0).getExploitDate());

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());

    MetricChangeExploitDate metric = metricChangeExploitDateRepository.findAll().get(0);

    assertEquals(exploitDateId, metric.getExploitDateId());
    assertEquals("2020-11-12 00:00:00.0", metric.getNewExploitDate().toString());
  }

  @Test
  public void deletesExploitDates() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 00:00:00").getTime()));

    targetController.postExploitDate(exploitDateJson);

    long exploitDateId = exploitDateRepository.findAll().get(0).getId();

    targetController.deleteExploitDate(exploitDateId);

    assertEquals(0, targetController.getExploitDates(rfiId).size());

    assertEquals(1, metricDeleteExploitDateRepository.findAll().size());

    assertEquals(
      exploitDateId,
      metricDeleteExploitDateRepository.findAll().get(0).getExploitDateId()
    );
  }

  @Test
  public void deletesExploitDatesWithTargets() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson1 = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );
    TargetJson targetJson2 = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Collections.singletonList(targetJson1), "billy.bob.joe", "false");
    targetController.postTarget(Collections.singletonList(targetJson2), "billy.bob.joe", "false");

    long id = exploitDateRepository.findAll().get(0).getId();

    targetController.deleteExploitDate(id);

    assertEquals(0, targetController.getExploitDates(rfiId).size());

    assertEquals(0, targetController.getTargets(rfiId).size());
  }

  @Test
  public void deletesTargets() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");
    long targetId = targetRepository.findAll().get(0).getId();

    assertEquals(0, targetController.deleteTarget(targetId).size());

    assertEquals(1, metricDeleteTargetRepository.findAll().size());

    assertEquals(targetId, metricDeleteTargetRepository.findAll().get(0).getTargetId());

    assertEquals(0, targetController.getTargets(rfiId).size());

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");
    targetId = targetRepository.findAll().get(1).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(TargetController.URI + "/delete?targetId=" + targetId)
      .then()
      .statusCode(200);

    assertEquals(0, targetController.getTargets(rfiId).size());

    assertEquals(2, metricDeleteTargetRepository.findAll().size());

    assertEquals(targetId, metricDeleteTargetRepository.findAll().get(1).getTargetId());
  }

  @Test
  public void deletesMultipleTargets() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson1 = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    TargetJson targetJson2 = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567980",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Arrays.asList(targetJson1, targetJson2), "billy.bob.joe", "false");

    String jsonString = objectMapper.writeValueAsString(new TargetJson[]{targetJson1, targetJson2});

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(jsonString)
      .when()
      .delete(TargetController.URI + "/delete-targets?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(0, targetController.getTargets(rfiId).size());

    assertEquals(2, metricUndoTargetCreateRepository.findAll().size());
    assertEquals("billy.bob.joe", metricUndoTargetCreateRepository.findAll().get(0).getUserName());
  }

  @Test
  public void editsTargets() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");
    long targetId =
      targetRepository.findByRfiIdAndExploitDateIdAndMgrs(rfiId, exploitDateId, "12ABC1234567890").getId();

    TargetJson targetEditJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some RAD supercool EEI notes",
      "This is a different description",
      TargetStatus.NOT_STARTED,
      "",
      "");
    String json = objectMapper.writeValueAsString(Collections.singletonList(targetEditJson));

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(TargetController.URI + "/post?userName=William.robert.joseph")
      .then()
      .statusCode(200);

    Target target = targetRepository.findAll().get(0);

    assertEquals(1, targetRepository.findAll().size());

    assertEquals(rfiId, target.getRfiId());
    assertEquals(exploitDateId, target.getExploitDateId());
    assertEquals("12ABC1234567890", target.getMgrs());
    assertEquals("These are some RAD supercool EEI notes", target.getNotes());
    assertEquals("This is a different description", target.getDescription());

    assertEquals(2, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget metric1 = metricChangeTargetRepository.findAll().get(0);
    MetricChangeTarget metric2 = metricChangeTargetRepository.findAll().get(1);

    assertEquals(targetId, metric1.getTargetId());
    assertEquals("notes", metric1.getField());
    assertEquals("These are some RAD supercool EEI notes", metric1.getNewData());
    assertEquals("william.robert.joseph", metric1.getUserName());
    assertEquals(targetId, metric2.getTargetId());
    assertEquals("description", metric2.getField());
    assertEquals("This is a different description", metric2.getNewData());
    assertEquals("william.robert.joseph", metric2.getUserName());

    targetEditJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some RAD supercool EEI notes",
      "This is a different description",
      TargetStatus.NOT_STARTED,
      "This is a rollup",
      "");

    json = objectMapper.writeValueAsString(Collections.singletonList(targetEditJson));

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(1, targetRepository.findAll().size());

    assertEquals("This is a rollup", target.getHourlyRollup());

    assertEquals(3, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget metric3 = metricChangeTargetRepository.findAll().get(2);
    assertEquals(targetId, metric3.getTargetId());
    assertEquals("hourly_rollup", metric3.getField());
    assertEquals("This is a rollup", metric3.getNewData());

    targetEditJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some RAD supercool EEI notes",
      "This is a different description",
      TargetStatus.NOT_STARTED,
      "This is a rollup",
      "This is an \"All Callouts\" rollup");

    json = objectMapper.writeValueAsString(Collections.singletonList(targetEditJson));

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(1, targetRepository.findAll().size());

    assertEquals("This is an \"All Callouts\" rollup", target.getAllCallouts());

    assertEquals(4, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget metric4 = metricChangeTargetRepository.findAll().get(3);
    assertEquals(targetId, metric4.getTargetId());
    assertEquals("all_callouts", metric4.getField());
    assertEquals("This is an \"All Callouts\" rollup", metric4.getNewData());
  }

  @Test
  public void doesNotUpdateTargetIfTheNameAlreadyExists() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "")); //toChange
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    TargetJson targetJsonConflict = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567899",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");
    targetController.postTarget(Collections.singletonList(targetJsonConflict), "billy.bob.joe", "false");

    long targetId =
      targetRepository.findByRfiIdAndExploitDateIdAndMgrs(rfiId, exploitDateId, "12ABC1234567890").getId();

    TargetJson updatedTargetJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "12ABC1234567899",
      "These are some different notes for the EEI",
      "This is a description that's also different",
      TargetStatus.NOT_STARTED,
      "",
      "");

    targetController.postTarget(Collections.singletonList(updatedTargetJson), "billy.bob.joe", "false");

    assertEquals(0, metricChangeTargetRepository.findAll().size());
  }

  @Test
  public void shouldChangeTargetStatusAndCreateMetric() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");

    Target target = targetRepository.findAll().get(0);
    long targetId = target.getId();

    assertEquals(TargetStatus.NOT_STARTED, target.getStatus());

    String targetUpdateJsonString = "[{" +
      "\"targetId\":" + targetId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"mgrs\":" + "\"" + targetJson.getMgrs() + "\"" +
      ",\"notes\":" + "\"" + targetJson.getNotes() + "\"" +
      ",\"description\":" + "\"" + targetJson.getDescription() + "\"" +
      ",\"status\":\"IN_PROGRESS\"" +
      ",\"hourlyRollup\":\"\"" +
      ",\"allCallouts\":\"\"" +
      "}]";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(targetUpdateJsonString)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(TargetStatus.IN_PROGRESS, target.getStatus());

    targetUpdateJsonString = "[{" +
      "\"targetId\":" + targetId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"mgrs\":" + "\"" + targetJson.getMgrs() + "\"" +
      ",\"notes\":" + "\"" + targetJson.getNotes() + "\"" +
      ",\"description\":" + "\"" + targetJson.getDescription() + "\"" +
      ",\"status\":\"COMPLETED\"" +
      ",\"hourlyRollup\":\"\"" +
      ",\"allCallouts\":\"\"" +
      "}]";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(targetUpdateJsonString)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(TargetStatus.COMPLETED, target.getStatus());

    assertEquals(2, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget metric1 = metricChangeTargetRepository.findAll().get(0);
    MetricChangeTarget metric2 = metricChangeTargetRepository.findAll().get(1);

    assertEquals(targetId, metric1.getTargetId());
    assertEquals(targetId, metric2.getTargetId());
    assertEquals("status", metric1.getField());
    assertEquals(TargetStatus.IN_PROGRESS, metric1.getNewData());
    assertEquals("status", metric2.getField());
    assertEquals(TargetStatus.COMPLETED, metric2.getNewData());
  }

  @Test
  public void undoesTargetDeleteAndLogsMetrics() throws Exception {
    setupIxns();
    Target target = targetRepository.findAll().get(0);
    TargetJson targetJson =
      new TargetJson(target.getId(), target.getRfiId(), target.getExploitDateId(), target.getMgrs(), target.getNotes(),
        target.getDescription(), target.getStatus(), target.getHourlyRollup(), target.getAllCallouts());

    long targetId = target.getId();

    long numTargets = targetRepository.findAll().size();

    targetController.deleteTarget(targetId);

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");

    assertEquals(numTargets, targetRepository.findAll().size());
    assertEquals(1, metricUndoTargetDeleteRepository.findAll().size());
    assertEquals(targetId, metricUndoTargetDeleteRepository.findAll().get(0).getTargetId());
  }

  @Test
  public void addsTargetsWithNameOfADeletedTarget() throws Exception {
    setupIxns();
    Target target = targetRepository.findAll().get(0);
    long rfiId = target.getRfiId();
    long exploitDateId = target.getExploitDateId();
    long targetId = target.getId();
    String targetMgrs = target.getMgrs();

    targetController.deleteTarget(targetId);

    TargetJson targetJson = new TargetJson(rfiId, exploitDateId, targetMgrs, "", "");

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");

    long newTargetId = targetRepository.findByRfiIdAndExploitDateIdAndMgrs(rfiId, exploitDateId, targetMgrs).getId();

    assertEquals(2, targetController.getTargets(rfiId).size());
    assertEquals(0, ixnController.getIxns(newTargetId).size());
  }

  @Test
  public void undoesDateDeleteAndLogsMetrics() throws Exception {
    setupIxns();
    ExploitDate exploitDate = exploitDateRepository.findAll().get(0);
    ExploitDateJson exploitDateJson = new ExploitDateJson(exploitDate.getId(), exploitDate.getRfiId(),
      exploitDate.getExploitDate());
    long exploitDateId = exploitDate.getId();
    long rfiId = exploitDate.getRfiId();

    long numExploitDates = exploitDateRepository.findAll().size();

    long numTargets = targetController.getTargets(rfiId).size();

    targetController.deleteExploitDate(exploitDateId);

    targetController.postExploitDate(exploitDateJson);

    assertEquals(numExploitDates, exploitDateRepository.findAll().size());
    assertEquals(numTargets, targetController.getTargets(rfiId).size());
    assertEquals(1, metricUndoExploitDateDeleteRepository.findAll().size());
    assertEquals(exploitDateId, metricUndoExploitDateDeleteRepository.findAll().get(0).getExploitDateId());
    assertNull(exploitDateRepository.findById(exploitDateId).get().getDeleted());
  }

  @Test
  public void createsExploitDatesWithTheSameDateAsADeletedDate() throws Exception {
    setupIxns();
    ExploitDate date = exploitDateRepository.findAll().get(0);
    ExploitDateJson dateJson = new ExploitDateJson(date.getRfiId(), date.getExploitDate());

    long numExploitDates = exploitDateRepository.findAll().size();

    targetController.deleteExploitDate(date.getId());

    targetController.postExploitDate(dateJson);

    assertEquals(numExploitDates, targetController.getExploitDates(date.getRfiId()).size());
  }

  @Test
  public void addsTargetsWithNameOfATargetUnderADeletedDate() throws Exception {
    setupIxns();
    Target target = targetRepository.findAll().get(0);
    long rfiId = target.getRfiId();
    long exploitDateId = target.getExploitDateId();
    String targetMgrs = target.getMgrs();

    targetController.deleteExploitDate(exploitDateId);

    TargetJson targetJson = new TargetJson(rfiId, exploitDateId, targetMgrs, "", "");

    targetController.postTarget(Collections.singletonList(targetJson), "billy.bob.joe", "false");

    long newTargetId = targetRepository.findByRfiIdAndExploitDateIdAndMgrs(rfiId, exploitDateId, targetMgrs).getId();

    assertEquals(2, targetController.getTargets(rfiId).size());
    assertEquals(0, ixnController.getIxns(newTargetId).size());
  }

  @Test
  public void addsTargetCopiesWithMetrics() throws Exception {
    rfiRepository.save(
      new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("12/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId1 = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();
    long exploitDateId2 = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("12/11/2020").getTime())).getId();

    TargetJson targetJson1 = new TargetJson(rfiId, exploitDateId1, "12ASD1231231231", "These are notes",
      "This is a description");
    TargetJson targetJson2 =
      new TargetJson(rfiId, exploitDateId1, "13ASD1231231231", "These are different notes",
        "This is another description");
    TargetJson targetJson3 =
      new TargetJson(rfiId, exploitDateId1, "14ASD1231231231", "These are some notes",
        "This is some sort of description");

    targetController.postTarget(Arrays.asList(targetJson1, targetJson2, targetJson3), "billy.bob.joe", "false");

    targetJson1.setExploitDateId(exploitDateId2);
    targetJson3.setExploitDateId(exploitDateId2);

    targetController.postTarget(Arrays.asList(targetJson1, targetJson3), "billy.bob.joe", "true");

    assertEquals(5, targetRepository.findAll().size());
    assertEquals("14ASD1231231231", targetRepository.findAll().get(4).getMgrs());

    assertEquals(5, metricCreateTargetRepository.findAll().size());
    assertEquals(true, metricCreateTargetRepository.findAll().get(3).getIsCopy());
    assertEquals(true, metricCreateTargetRepository.findAll().get(4).getIsCopy());
  }

  @Test
  public void returnsTargetsSpecifyingIfTheyContainRejectedTracks() throws Exception {
    setupIxns();
    long rfiId = rfiRepository.findAll().get(0).getId();

    List<TargetGet> targets = targetController.getTargets(rfiId);

    TargetGet target1 = targets.get(0);
    TargetGet target2 = targets.get(1);

    assertFalse(target1.isContainsRejectedTracks());
    assertTrue(target2.isContainsRejectedTracks());

    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnController.deleteSegment(segment2Id);

    targets = targetController.getTargets(rfiId);
    target2 = targets.get(1);

    assertFalse(target2.isContainsRejectedTracks());
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

    TargetJson target = new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", "");

    targetController.postTarget(Collections.singletonList(target), "Billy.Bob", "false");
    long target1Id = targetRepository.findAll().get(0).getId();

    target.setExploitDateId(exploitDate2Id);
    targetController.postTarget(Collections.singletonList(target), "Billy.Bob", "false");
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
      IxnApprovalStatus.REJECTED));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "",
      IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "",
      new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "",
      IxnApprovalStatus.NOT_REVIEWED)); //123-002
  }
}
