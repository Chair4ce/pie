package redv.magpie.ixns;

import redv.magpie.BaseIntegrationTest;
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
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.Assert.*;

public class IxnServiceTest extends BaseIntegrationTest {
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
  IxnService ixnService;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
  }

  @Test
  public void properlyAssignsTrackIDs() throws Exception {
    setupIxns();
    long rfiId = rfiRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();
    long target2Id = targetRepository.findAll().get(1).getId();
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnService.assignTracks(rfiId, "20-0001");

    Ixn ixn1 = ixnRepository.findAll().get(7);
    Ixn ixn2 = ixnRepository.findAll().get(9);
    Ixn ixn3 = ixnRepository.findAll().get(0);
    Ixn ixn4 = ixnRepository.findAll().get(2);
    Ixn ixn5 = ixnRepository.findAll().get(4);

    assertEquals("0001-001", ixn1.getTrack());
    assertEquals("0001-002", ixn2.getTrack());
    assertEquals("0001-003", ixn3.getTrack());
    assertEquals("0001-004", ixn4.getTrack());
    assertEquals("0001-005", ixn5.getTrack());

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(678000)
      .getTime()), "", "", "", IxnStatus.COMPLETED, "", IxnApprovalStatus.NOT_REVIEWED)); //0001-003

    ixnService.assignTracks(rfiId, "20-0001");

    ixn1 = ixnRepository.findAll().get(7);
    ixn2 = ixnRepository.findAll().get(9);
    ixn3 = ixnRepository.findAll().get(10);
    ixn4 = ixnRepository.findAll().get(0);
    ixn5 = ixnRepository.findAll().get(2);
    Ixn ixn6 = ixnRepository.findAll().get(4);

    assertEquals("0001-001", ixn1.getTrack());
    assertEquals("0001-002", ixn2.getTrack());
    assertEquals("0001-003", ixn3.getTrack());
    assertEquals("0001-004", ixn4.getTrack());
    assertEquals("0001-005", ixn5.getTrack());
    assertEquals("0001-006", ixn6.getTrack());
  }

  @Test
  public void updatesTrackNumbersInTrackNarratives() throws Exception {
    setupIxns();
    long rfiId = rfiRepository.findAll().get(0).getId();
    ixnService.assignTracks(rfiId, "20-0001");

    Ixn ixn1 = ixnRepository.findAll().get(0); //0001-003
    Ixn ixn2 = ixnRepository.findAll().get(1); //Not Started
    Ixn ixn3 = ixnRepository.findAll().get(2); //0001-004

    ixn1.setTrackNarrative(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-003 and 0001-004\n" +
        "\n" +
        "STOP"
    );

    ixnRepository.save(ixn1);

    ixn3.setTrackNarrative(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-002, 0001-004 and 0001-005\n" +
        "\n" +
        "STOP"
    );

    ixnRepository.save(ixn3);

    ixn2.setStatus(IxnStatus.IN_PROGRESS);

    ixnRepository.save(ixn2);
    ixnService.assignTracks(rfiId, "20-0001");  //ixn2 -> 0001-004, ixn3 -> 0001-005

    ixn1 = ixnRepository.findAll().get(0); //0001-003
    ixn3 = ixnRepository.findAll().get(2); //0001-005

    assertEquals(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-003 and 0001-005\n" +
        "\n" +
        "STOP"
      ,
      ixn1.getTrackNarrative()
    );

    assertEquals(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-002, 0001-005 and 0001-006\n" +
        "\n" +
        "STOP"
      ,
      ixn3.getTrackNarrative()
    );


    ixn2.setStatus(IxnStatus.DOES_NOT_MEET_EEI);

    ixnRepository.save(ixn2);
    ixnService.assignTracks(rfiId, "20-0001");  //ixn2 -> none, ixn3 -> 0001-004

    ixn1 = ixnRepository.findAll().get(0); //0001-003
    ixn3 = ixnRepository.findAll().get(2); //0001-004

    assertEquals(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-003 and 0001-004\n" +
        "\n" +
        "STOP"
      ,
      ixn1.getTrackNarrative()
    );

    assertEquals(
      "11NOV20\n" +
        "\n" +
        "START\n" +
        "\n" +
        "Things happened also track #0001-002, 0001-004 and 0001-005\n" +
        "\n" +
        "STOP"
      ,
      ixn3.getTrackNarrative()
    );

  }

  @Test
  public void determinesIfAStatusChangeWouldCauseATrackRenumbering() throws Exception {
    setupIxns();
    long rfiId = rfiRepository.findAll().get(0).getId();
    ixnService.assignTracks(rfiId, "20-0001");

    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long target1Id = targetRepository.findAll().get(0).getId();
    long segment1Id = segmentRepository.findAll().get(0).getId();

    //Add new track at the end - should not renumber
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    Ixn newIxn = ixnRepository.findAll().get(10);
    newIxn.setStatus(IxnStatus.IN_PROGRESS);
    assertFalse(ixnService.checkRenumber(newIxn));

    //remove track from end - should not renumber
    Ixn oldIxn1 = ixnRepository.findAll().get(4);
    oldIxn1.setStatus(IxnStatus.DOES_NOT_MEET_EEI);
    assertFalse(ixnService.checkRenumber(oldIxn1));

    //Add track in middle - should renumber
    Ixn oldIxn2 = ixnRepository.findAll().get(1);
    oldIxn2.setStatus(IxnStatus.IN_PROGRESS);
    assertTrue(ixnService.checkRenumber(oldIxn2));

    //Remove track from middle - should renumber
    Ixn oldIxn3 = ixnRepository.findAll().get(0);
    oldIxn3.setStatus(IxnStatus.DOES_NOT_MEET_EEI);
    assertTrue(ixnService.checkRenumber(oldIxn3));

    //Adding or removing with only 1 track
    ixnRepository.deleteAll();

    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(678000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(789000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));

    Ixn ixnToChange = ixnRepository.findAll().get(1);
    ixnToChange.setStatus(IxnStatus.IN_PROGRESS);
    assertFalse(ixnService.checkRenumber(ixnToChange));

    ixnRepository.save(ixnToChange);
    ixnToChange.setStatus(IxnStatus.DOES_NOT_MEET_EEI);
    assertFalse(ixnService.checkRenumber(ixnToChange));
  }

  private void setupIxns() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a " +
      "justifiction", "", "", "", "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    Date exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));


    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "12WQE1231231231", "", ""), "20-0001"));
    long target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "12WQE1231231231", "", ""), "20-0001"));
    long target2Id = targetRepository.findAll().get(1).getId();


    segmentRepository.save(new Segment(
      new SegmentJson(rfiId, exploitDate1Id, target1Id, new Timestamp(new Date(0).getTime()),
        new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(
      new SegmentJson(rfiId, exploitDate2Id, target2Id, new Timestamp(new Date(0).getTime()),
        new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(123000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED)); //0001-003
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED)); //0001-004
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", IxnApprovalStatus.NOT_REVIEWED)); //0001-005

    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(123000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED));  //0001-001
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", IxnApprovalStatus.NOT_REVIEWED)); //0001-002
  }
}
