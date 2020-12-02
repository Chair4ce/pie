package redv.magpie.scois;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.ixns.*;
import redv.magpie.metrics.change.scoi.MetricChangeScoi;
import redv.magpie.metrics.change.scoi.MetricChangeScoiRepository;
import redv.magpie.metrics.create.scoi.MetricCreateScoi;
import redv.magpie.metrics.create.scoi.MetricCreateScoiRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.Target;
import redv.magpie.tgts.TargetJson;
import redv.magpie.tgts.TargetNameRepository;
import redv.magpie.tgts.TargetRepository;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItem;
import static org.junit.Assert.assertEquals;

public class ScoiControllerTest extends BaseIntegrationTest {

  @Autowired
  ScoiController scoiController;

  @Autowired
  ScoiRepository scoiRepository;

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
  MetricCreateScoiRepository metricCreateScoiRepository;
  @Autowired
  MetricChangeScoiRepository metricChangeScoiRepository;

  @Before
  public void clean() {
    scoiRepository.deleteAll();
    metricCreateScoiRepository.deleteAll();
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
  }

  @Test
  public void postCreatesNewScoi() throws Exception {
    ScoiJson scoiJson = new ScoiJson("OPN20-S0001", "12ASD1231231231");

    String scoiJsonString = objectMapper.writeValueAsString(scoiJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(scoiJsonString)
      .when()
      .post(ScoiController.URI + "?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, scoiRepository.findAll().size());
    Scoi scoi = scoiRepository.findAll().get(0);

    assertEquals("OPN20-S0001", scoi.getName());
    assertEquals("12ASD1231231231", scoi.getMgrs());

    assertEquals(1, metricCreateScoiRepository.findAll().size());
    MetricCreateScoi metric = metricCreateScoiRepository.findAll().get(0);

    assertEquals("billy.bob.joe", metric.getUserName());
    assertEquals(scoi.getId(), metric.getScoiId());

    //Test that posting with the same name does not create a new SCOI
    given()
      .port(port)
      .contentType("application/json")
      .body(scoiJsonString)
      .when()
      .post(ScoiController.URI + "?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, scoiRepository.findAll().size());
  }

  @Test
  public void returnsMgrsFromScoiNameIfExistsOr404IfNot() {
    Scoi scoi = new Scoi("OPN20-S0001", "12ASD1231231231", "");
    scoiRepository.save(scoi);

    given()
      .port(port)
      .contentType("application/json")
      .when()
      .get(ScoiController.URI + "?userName=billy.bob.joe&name=OPN20-S0001")
      .then()
      .statusCode(200)
      .body("name", equalTo("OPN20-S0001"))
      .body("mgrs", equalTo("12ASD1231231231"));

    given()
      .port(port)
      .contentType("application/json")
      .when()
      .get(ScoiController.URI + "?userName=billy.bob.joe&name=OPN20-S0002")
      .then()
      .statusCode(404);
  }

  @Test
  public void returnsAllScois() {
    Scoi scoi1 = new Scoi("OPN20-S0001", "12ASD1231231231", "");
    Scoi scoi2 = new Scoi("OPN20-S0002", "12ASD1231231232", "");
    Scoi scoi3 = new Scoi("OPN20-S0003", "12ASD1231231233", "");
    scoiRepository.saveAll(Arrays.asList(scoi1, scoi2, scoi3));

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/all")
      .then()
      .statusCode(200)
      .body("[0].name", equalTo("OPN20-S0001"))
      .body("[0].mgrs", equalTo("12ASD1231231231"))
      .body("[1].name", equalTo("OPN20-S0002"))
      .body("[1].mgrs", equalTo("12ASD1231231232"))
      .body("[2].name", equalTo("OPN20-S0003"))
      .body("[2].mgrs", equalTo("12ASD1231231233"))
      .body("[3]", equalTo(null));
  }

  @Test
  public void returnsRFIAssociationsWithScoi() {
    // 2 cases: RFI that is associated and an RFI that is not associated
    String scoiName = "OPN20-S0123";
    setupAssociations(scoiName);

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/rfi?name=" + scoiName)
      .then()
      .statusCode(200)
      .body("[0].rfiNum", equalTo("DGS-1-SDT-2020-00001"))
      .body("[0].description", equalTo("This is the description of an associated RFI"))
      .body("[1].rfiNum", equalTo("DGS-1-SDT-2020-00003"))
      .body("[1].description", equalTo("This is the description of another associated RFI"))
      .body("[2]", equalTo(null));

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/rfi?name=" + "Bad name")
      .then()
      .statusCode(404);
  }

  @Test
  public void returnsTargetAssociationsForScoiName() {
    String scoiName = "OPN20-S0123";
    setupAssociations(scoiName);

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/tgt?name=" + scoiName)
      .then()
      .statusCode(200)
      .body("[0].name", equalTo("20-0001"))
      .body("[0].mgrs", equalTo("12IOP1231231231"))
      .body("[0].emails", hasItem("billy.bob.joe"))
      .body("[0].emails", hasItem("another.name"))
      .body("[0].emails", hasItem("william.robet.joseph"))
      .body("[0].emails", hasItem("boonty.thomas"))
      .body("[0].emails[4]", equalTo(null)) //there should only be 4 items
      .body("[1].name", equalTo("20-0003"))
      .body("[1].mgrs", equalTo("12IOP1231231233"))
      .body("[1].emails", hasItem("billy.bob.joe"))
      .body("[1].emails[1]", equalTo(null)) //THERE CAN BE ONLY ONE
      .body("[2]", equalTo(null));

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/tgt?name=" + "Bad name")
      .then()
      .statusCode(404);
  }

  @Test
  public void returnsIxnsAssociatedWithScoiName() {
    String scoiName = "OPN20-S0123";
    setupAssociations(scoiName);

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/ixn?name=" + scoiName)
      .then()
      .statusCode(200)
      .body("[0].activity", equalTo("Activity 1"))
      .body("[0].trackNarrative", equalTo("This is a track narrative that includes the SCOI " + scoiName))
      .body("[1].activity", equalTo("Activity 2"))
      .body("[2].activity", equalTo("Activity 3"))
      .body("[3].activity", equalTo("Activity 4"))
      .body("[3].trackNarrative", equalTo(
        "This is a track narrative that includes the SCOI under the same target as RFI 1 but with a different analyst" +
          scoiName))
      .body("[4].activity", equalTo("Activity 5"))
      .body("[5]", equalTo(null));

    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/ixn?name=" + "Bad name")
      .then()
      .statusCode(404);
  }

  @Test
  public void postUpdatesScoiNote() throws Exception {
    scoiRepository.save(new Scoi("OPN20-S0001", "12ASD1231231231", ""));

    String scoiUpdateJson = objectMapper.writeValueAsString(
      new Scoi("OPN20-S0001", "12ASD1231231231", "This is a note.")
    );

    given()
      .port(port)
      .contentType("application/json")
      .body(scoiUpdateJson)
      .when()
      .post(ScoiController.URI + "?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, scoiRepository.findAll().size());
    Scoi updatedScoi = scoiRepository.findAll().get(0);
    assertEquals("OPN20-S0001", updatedScoi.getName());
    assertEquals("This is a note.", updatedScoi.getNote());

    assertEquals(1, metricChangeScoiRepository.findAll().size());
    MetricChangeScoi metric = metricChangeScoiRepository.findAll().get(0);
    assertEquals(updatedScoi.getId(), metric.getScoiId());
    assertEquals("note", metric.getField());
    assertEquals("This is a note.", metric.getNewData());

  }

  private void setupAssociations(String scoiName) {
    scoiRepository.save(new Scoi(scoiName, "12QWE1231231231", ""));

    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00001", "", "CLOSED", new Date(), "", new Date(), "",
        "This is the description of an associated RFI", "This is a justifiction", "", "", "",
        "william.robert.joseph@us.af.mil", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00002", "", "OPEN", new Date(), "", new Date(), "",
        "This is the description of an RFI that does not mention the SCOI", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00003", "", "CLOSED", new Date(), "", new Date(), "",
        "This is the description of another associated RFI", "This is a justifiction", "", "", "",
        "boonty.thomas@coastguard.com", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00004", "", "CLOSED", new Date(), "", new Date(), "",
        "This is the description of yet another associated RFI", "This is a justifiction", "", "", "",
        "william.robert.joseph@us.af.mil", "", "", "", "", ""));
    long rfi1Id = rfiRepository.findAll().get(0).getId();
    long rfi2Id = rfiRepository.findAll().get(1).getId();
    long rfi3Id = rfiRepository.findAll().get(2).getId();
    long rfi4Id = rfiRepository.findAll().get(2).getId();

    exploitDateRepository.save(new ExploitDate(new Date(), rfi1Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi2Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi3Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi3Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi4Id));
    long rfi1exploitDateId = exploitDateRepository.findAll().get(0).getId();
    long rfi2exploitDateId = exploitDateRepository.findAll().get(1).getId();
    long rfi3exploitDateId1 = exploitDateRepository.findAll().get(2).getId();
    long rfi3exploitDateId2 = exploitDateRepository.findAll().get(3).getId();
    long rfi4exploitDateId = exploitDateRepository.findAll().get(4).getId();

    targetRepository.save(new Target(new TargetJson(rfi1Id, rfi1exploitDateId, "12IOP1231231231", "", ""), "20-0001"));
    targetRepository.save(new Target(new TargetJson(rfi2Id, rfi2exploitDateId, "12IOP1231231232", "", ""), "20-0002"));
    targetRepository.save(new Target(new TargetJson(rfi3Id, rfi3exploitDateId1, "12IOP1231231233", "", ""), "20-0003"));
    targetRepository.save(new Target(new TargetJson(rfi3Id, rfi3exploitDateId2, "12IOP1231231233", "", ""), "20-0003"));
    targetRepository.save(new Target(new TargetJson(rfi3Id, rfi3exploitDateId2, "12IOP1231231231", "", ""), "20-0001"));
    targetRepository.save(new Target(new TargetJson(rfi4Id, rfi4exploitDateId, "12IOP1231231231", "", ""), "20-0001"));
    long rfi1targetId = targetRepository.findAll().get(0).getId();
    long rfi2targetId = targetRepository.findAll().get(1).getId();
    long rfi3targetId1 = targetRepository.findAll().get(2).getId();
    long rfi3targetId2 = targetRepository.findAll().get(3).getId();
    long rfi3targetId3 = targetRepository.findAll().get(4).getId();
    long rfi4targetId = targetRepository.findAll().get(5).getId();

    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi1Id, rfi1exploitDateId, rfi1targetId, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi2Id, rfi2exploitDateId, rfi2targetId, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi3Id, rfi3exploitDateId1, rfi3targetId1, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi3Id, rfi3exploitDateId2, rfi3targetId2, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi3Id, rfi3exploitDateId2, rfi3targetId3, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(
        new SegmentJson(rfi4Id, rfi4exploitDateId, rfi4targetId, new Timestamp(2345), new Timestamp(3456))));
    long rfi1segmentId = segmentRepository.findAll().get(0).getId();
    long rfi2segmentId = segmentRepository.findAll().get(1).getId();
    long rfi3segmentId1 = segmentRepository.findAll().get(2).getId();
    long rfi3segmentId2 = segmentRepository.findAll().get(3).getId();
    long rfi3segmentId3 = segmentRepository.findAll().get(4).getId();
    long rfi4segmentId = segmentRepository.findAll().get(5).getId();

    //Includes SCOI
    Ixn rfi1ixn1 =
      new Ixn(rfi1Id, rfi1exploitDateId, rfi1targetId, rfi1segmentId, "billy.bob.joe", new Timestamp(2345),
        "Activity 1", "0001-001", "billy.bob.joe",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi1ixn1.setTrackNarrative("This is a track narrative that includes the SCOI " + scoiName);
    Ixn rfi1ixn2 =
      new Ixn(rfi1Id, rfi1exploitDateId, rfi1targetId, rfi1segmentId, "", new Timestamp(2345), "", "0001-001", "",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi1ixn2.setTrackNarrative("This one doesn't");

    Ixn rfi2ixn1 =
      new Ixn(rfi2Id, rfi2exploitDateId, rfi2targetId, rfi2segmentId, "", new Timestamp(2345), "", "0002-001", "",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi2ixn1.setTrackNarrative("This is a track narrative that includes a different SCOI OPN20-S0002");
    Ixn rfi2ixn2 =
      new Ixn(rfi2Id, rfi2exploitDateId, rfi2targetId, rfi2segmentId, "billy.bob.joe", new Timestamp(2345), "",
        "0002-002", "billy.bob.joe",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi2ixn2.setTrackNarrative("This is a track narrative that includes a different SCOI OPN20-S0003");

    //Includes SCOI
    Ixn rfi3ixn1 =
      new Ixn(rfi3Id, rfi3exploitDateId1, rfi3targetId1, rfi3segmentId1, "billy.bob.joe", new Timestamp(2345),
        "Activity 2", "0003-001", "billy.bob.joe",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi3ixn1.setTrackNarrative("This is a track narrative that includes the SCOI " + scoiName);
    //Includes SCOI
    Ixn rfi3ixn2 =
      new Ixn(rfi3Id, rfi3exploitDateId2, rfi3targetId2, rfi3segmentId2, "billy.bob.joe", new Timestamp(2345),
        "Activity 3", "0003-002", "billy.bob.joe",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi3ixn2.setTrackNarrative(
      "This is a track narrative that includes the SCOI under the same target name but on a different date and with " +
        "another analyst" +
        scoiName);
    //Includes SCOI
    Ixn rfi3ixn3 =
      new Ixn(rfi3Id, rfi3exploitDateId2, rfi3targetId3, rfi3segmentId3, "billy.bob.joe", new Timestamp(2345),
        "Activity 4", "0001-001", "another.name",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi3ixn3.setTrackNarrative(
      "This is a track narrative that includes the SCOI under the same target as RFI 1 but with a different analyst" +
        scoiName);
    //Includes SCOI
    Ixn rfi4ixn =
      new Ixn(rfi4Id, rfi4exploitDateId, rfi4targetId, rfi4segmentId, "william.robet.joseph", new Timestamp(2345),
        "Activity 5", "0001-001", "boonty.thomas",
        IxnStatus.COMPLETED, "",
        IxnApprovalStatus.APPROVED);
    rfi4ixn.setTrackNarrative("This is a track narrative that includes the SCOI " + scoiName +
      " with the more POCs");

    ixnRepository.saveAll(Arrays.asList(rfi1ixn1, rfi1ixn2, rfi2ixn1, rfi2ixn2, rfi3ixn1, rfi3ixn2, rfi3ixn3, rfi4ixn));
  }
}
