package redv.magpie.rfis;


import redv.magpie.BaseIntegrationTest;
import redv.magpie.metrics.MetricController;
import redv.magpie.metrics.change.rfi.MetricChangeRfiRepository;
import redv.magpie.metrics.create.targetFromGets.MetricCreateTargetFromGets;
import redv.magpie.metrics.create.targetFromGets.MetricCreateTargetFromGetsRepository;
import redv.magpie.tgts.TargetGet;
import redv.magpie.tgts.TargetNameRepository;
import redv.magpie.tgts.TargetRepository;
import redv.magpie.tgts.TargetService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class RfiServiceTest extends BaseIntegrationTest {
  @Autowired
  GetsClient getsClient;
  @Autowired
  MetricController metricController;
  @Autowired
  RfiService rfiService;
  @Autowired
  TargetService targetService;
  @Autowired
  RfiRepository rfiRepository;
  @Autowired
  TargetRepository targetRepository;
  @Autowired
  TargetNameRepository targetNameRepository;
  @Autowired
  MetricChangeRfiRepository metricChangeRfiRepository;
  @Autowired
  MetricCreateTargetFromGetsRepository metricCreateTargetFromGetsRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    targetRepository.deleteAll();
    targetNameRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricCreateTargetFromGetsRepository.deleteAll();
  }

  @Test
  public void marshallsXmlDocIntoRfis() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(new File("src/main/resources/RfisNewOpen.xml"));
    List<Rfi> rfiList = rfiService.marshallDocumentToRfis(document);

    assertEquals(13, rfiList.size());
  }

  @Test
  public void returnsAllNewOpenAndLastThreeClosedRfis() {

    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };

    rfiService.fetchRfisFromUris(files);
    List<Rfi> rfis = rfiService.fetchRfisFromRepo();

    long rfiCount = rfiRepository.count();

    assertEquals(rfiCount - 1, rfis.size());
    assertEquals(3, rfis.stream()
      .filter(rfi -> rfi.getStatus().equals("CLOSED"))
      .count()
    );
  }

  @Test
  public void assignsLastPriorityToNewlyOpenedRfis() throws Exception {
    String[] filePath = {"RfisNewOpen.xml"};
    rfiService.fetchRfisFromUris(filePath);

    List<Rfi> savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    long rfiCount = savedOpenRfis.size();

    Rfi rfiFirst = savedOpenRfis.get(0);
    Rfi rfiSecond = savedOpenRfis.get(1);
    Rfi rfiThird = savedOpenRfis.get(2);
    Rfi rfiFourth = savedOpenRfis.get(3);
    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());

    filePath[0] = "RfisNewOpenRefreshed.xml";
    rfiService.fetchRfisFromUris(filePath);
    //Attempt to fix errors with prioritizer not finishing before the next tests run resulting in a -1 priority on 120
    Thread.sleep(500);

    rfiFirst = rfiRepository.findById(rfiFirst.getId()).get();
    assertEquals(1, rfiFirst.getPriority());

    Rfi newlyOpenedRfi = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00323");
    assertEquals(rfiCount + 1, newlyOpenedRfi.getPriority());
  }

  @Test
  public void sendsRfiUpdateMetricIfThereIsAChangeInAnRfi() {
    Date rfi1ltiov = new Date();

    Rfi rfi = new Rfi("rfiNum", "url", "NEW", new Date(), "customerUnit", rfi1ltiov, "USA", "a description",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi updatedRfi =
      new Rfi("rfiNum", "url", "NEW", new Date(), "customerUnit", rfi1ltiov, "USA", "a new and improved description",
        "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi rfi2 =
      new Rfi("2", "url2", "NEW", new Date(), "customer2", new Date(), "USA", "description", "This is a justifiction",
        "", "", "", "", "", "", "", "", "");

    long rfiUpdateCount = metricChangeRfiRepository.count();

    rfiRepository.save(rfi);
    rfiRepository.save(rfi2);

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(updatedRfi);
    rfis.add(rfi2);

    rfiService.updateAndSaveRfis(rfis);
    assertEquals(rfiUpdateCount + 1, metricChangeRfiRepository.count());
  }

  @Test
  public void updatesRfisInRepoWithUpdatesFromGets() {
    Date rfiltiov = new Date();

    Rfi rfi1 =
      new Rfi("SDT-0321", "url", "NEW", new Date(), "1 FW", rfiltiov, "USA", "a description", "This is a justifiction",
        "", "", "", "", "", "", "", "", "");
    Rfi rfi2 = new Rfi("SDT-0322", "url", "OPEN", new Date(), "1 FW", rfiltiov, "CAN", "one description",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");

    rfiRepository.save(rfi1);
    rfiRepository.save(rfi2);

    Timestamp receiveDate1 = rfiRepository.findByRfiNum("SDT-0321").getReceiveDate();
    Timestamp receiveDate2 = rfiRepository.findByRfiNum("SDT-0322").getReceiveDate();

    rfiService.fetchRfisFromUris(new String[]{"UpdatedRfis.xml"});

    assertEquals("A new and improved description", rfiRepository.findByRfiNum("SDT-0321").getDescription());

    assertEquals("CLOSED", rfiRepository.findByRfiNum("SDT-0322").getStatus());

    assertEquals(receiveDate1, rfiRepository.findByRfiNum("SDT-0321").getReceiveDate());
    assertEquals(receiveDate2, rfiRepository.findByRfiNum("SDT-0322").getReceiveDate());
  }

  @Test
  public void reprioritizesBasedOnClosedRfis() {
    String[] filePath = {"RfisNewOpen.xml"};
    rfiService.fetchRfisFromUris(filePath);

    List<Rfi> savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    Rfi rfiFirst = savedOpenRfis.get(0);
    Rfi rfiSecond = savedOpenRfis.get(1);
    Rfi rfiThird = savedOpenRfis.get(2);
    Rfi rfiFourth = savedOpenRfis.get(3);
    Rfi rfiFifth = savedOpenRfis.get(4);

    assertEquals(5, savedOpenRfis.size());

    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());
    assertEquals(5, rfiFifth.getPriority());

    filePath = new String[]{"RfisNewOpenRefreshed.xml", "RfisClosedRefreshed.xml"};
    rfiService.fetchRfisFromUris(filePath);

    savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    assertEquals(4, savedOpenRfis.size());

    rfiFirst = savedOpenRfis.get(0);
    rfiSecond = savedOpenRfis.get(1);
    rfiThird = savedOpenRfis.get(2);
    rfiFourth = savedOpenRfis.get(3);

    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());
  }

  @Test
  public void createsTargetsIfGetsTargetListPopulated() {
    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };

    rfiService.fetchRfisFromUris(files);

    Rfi rfi1 = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00325");
    Rfi rfi2 = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338");

    assertEquals("34ABC1234567890,12GSD0987654321,67SDT1092837465,", rfi1.getMgrsList());
    assertEquals("35ABC1212787890,23GSD0987685321,68SDT1056737465,", rfi2.getMgrsList());

    List<TargetGet> targets1 = targetService.getTargets(rfi1.getId());
    List<TargetGet> targets2 = targetService.getTargets(rfi2.getId());

    assertEquals(3, targets1.size());
    assertEquals(3, targets2.size());

    assertEquals("34ABC1234567890", targets1.get(0).getMgrs());
    assertEquals("12GSD0987654321", targets1.get(1).getMgrs());
    assertEquals("67SDT1092837465", targets1.get(2).getMgrs());

    assertEquals("35ABC1212787890", targets2.get(0).getMgrs());
    assertEquals("23GSD0987685321", targets2.get(1).getMgrs());
    assertEquals("68SDT1056737465", targets2.get(2).getMgrs());

    assertEquals(6, metricCreateTargetFromGetsRepository.findAll().size());

    MetricCreateTargetFromGets metric1 = metricCreateTargetFromGetsRepository.findAll().get(0);
    MetricCreateTargetFromGets metric2 = metricCreateTargetFromGetsRepository.findAll().get(5);

    assertEquals(rfi1.getId(), metric1.getRfiId());
    assertEquals(rfi2.getId(), metric2.getRfiId());
    assertEquals("34ABC1234567890", metric1.getMgrs());
    assertEquals("68SDT1056737465", metric2.getMgrs());
  }
}
