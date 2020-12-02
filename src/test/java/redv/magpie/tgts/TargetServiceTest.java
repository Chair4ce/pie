package redv.magpie.tgts;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class TargetServiceTest extends BaseIntegrationTest {

  @Autowired
  TargetService targetService;
  @Autowired
  RfiRepository rfiRepository;
  @Autowired
  ExploitDateRepository exploitDateRepository;
  @Autowired
  TargetRepository targetRepository;
  @Autowired
  TargetNameRepository targetNameRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
  }

  @Test
  public void assignsTargetNamesBasedOnMgrs() {
    DateFormat twoDigitYear = new SimpleDateFormat("yy");
    String currentYear = twoDigitYear.format(new Date());

    Rfi rfi1 =
      new Rfi("SDT20-00123", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");
    Rfi rfi2 =
      new Rfi("SDT20-00124", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");

    rfiRepository.saveAll(Arrays.asList(rfi1, rfi2));

    long rfi1Id = rfiRepository.findAll().get(0).getId();
    long rfi2Id = rfiRepository.findAll().get(1).getId();

    ExploitDate exploitDate1 = new ExploitDate(new Date(1), rfi1Id);
    ExploitDate exploitDate2 = new ExploitDate(new Date(123456789), rfi1Id);
    ExploitDate exploitDate3 = new ExploitDate(new Date(123456789), rfi2Id);

    exploitDateRepository.saveAll(Arrays.asList(exploitDate1, exploitDate2, exploitDate3));

    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();
    long exploitDate3Id = exploitDateRepository.findAll().get(2).getId();

    String mgrs1 = "12QWE1231231231";
    String mgrs2 = "12QWE1231231232";
    String mgrs3 = "12QWE1231231233";

    // Save some targets
    TargetJson targetJson1 = new TargetJson(rfi1Id, exploitDate1Id, mgrs1, "notes", "description");
    TargetJson targetJson2 = new TargetJson(rfi1Id, exploitDate1Id, mgrs2, "notes", "description");
    TargetJson targetJson3 = new TargetJson(rfi1Id, exploitDate1Id, mgrs3, "notes", "description");

    targetService.postTarget(Collections.singletonList(targetJson1), "bill", false);
    targetService.postTarget(Collections.singletonList(targetJson2), "bill", false);
    targetService.postTarget(Collections.singletonList(targetJson3), "bill", false);

    // Check that the names assign properly, i.e. start at YY-0001, increment, with the same mgrs mapping to the same
    // name

    Target target1 = targetRepository.findAll().get(0);
    Target target2 = targetRepository.findAll().get(1);
    Target target3 = targetRepository.findAll().get(2);


    assertEquals(mgrs1, target1.getMgrs());
    assertEquals(currentYear + "-0001", target1.getName());
    assertEquals(mgrs2, target2.getMgrs());
    assertEquals(currentYear + "-0002", target2.getName());
    assertEquals(mgrs3, target3.getMgrs());
    assertEquals(currentYear + "-0003", target3.getName());

    TargetJson targetJson2Repeat = new TargetJson(rfi1Id, exploitDate2Id, mgrs2, "notes", "description");
    TargetJson targetJson3Repeat = new TargetJson(rfi2Id, exploitDate3Id, mgrs3, "notes", "description");

    targetService.postTarget(Collections.singletonList(targetJson2Repeat), "bill", false);
    targetService.postTarget(Collections.singletonList(targetJson3Repeat), "bill", false);

    Target target2Repeat = targetRepository.findAll().get(3);
    Target target3Repeat = targetRepository.findAll().get(4);

    assertEquals(mgrs2, target2Repeat.getMgrs());
    assertEquals(currentYear + "-0002", target2Repeat.getName());
    assertEquals(mgrs3, target3Repeat.getMgrs());
    assertEquals(currentYear + "-0003", target3Repeat.getName());

    long target3RepeatId = target3Repeat.getId();

    TargetJson targetJson3RepeatEdit =
      new TargetJson(target3RepeatId, rfi2Id, exploitDate3Id, mgrs1, "notes", "description", TargetStatus.NOT_STARTED,
        "", "");

    targetService.postTarget(Collections.singletonList(targetJson3RepeatEdit), "bill", false);

    Target target3RepeatEdit = targetRepository.findById(target3RepeatId).get();

    assertEquals(currentYear + "-0001", target3RepeatEdit.getName());

    TargetJson targetJson3RepeatEdit2 =
      new TargetJson(target3RepeatId, rfi2Id, exploitDate3Id, "12QWE1231231239", "notes", "description",
        TargetStatus.NOT_STARTED,
        "", "");

    targetService.postTarget(Collections.singletonList(targetJson3RepeatEdit2), "bill", false);

    Target target3RepeatEdit2 = targetRepository.findById(target3RepeatId).get();

    assertEquals(currentYear + "-0004", target3RepeatEdit2.getName());
  }

}
