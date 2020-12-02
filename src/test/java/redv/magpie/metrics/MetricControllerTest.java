package redv.magpie.metrics;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.metrics.cancelAddSegment.MetricCancelAddSegmentRepository;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDateRepository;
import redv.magpie.metrics.change.rfi.MetricChangeRfiRepository;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriorityRepository;
import redv.magpie.metrics.change.target.MetricChangeTargetRepository;
import redv.magpie.metrics.click.collapse.MetricClickCollapse;
import redv.magpie.metrics.click.collapse.MetricClickCollapseRepository;
import redv.magpie.metrics.click.gets.MetricClickGetsJson;
import redv.magpie.metrics.click.gets.MetricClickGetsRepository;
import redv.magpie.metrics.click.importIxns.MetricClickImport;
import redv.magpie.metrics.click.importIxns.MetricClickImportJson;
import redv.magpie.metrics.click.importIxns.MetricClickImportRepository;
import redv.magpie.metrics.click.refresh.MetricClickRefreshRepository;
import redv.magpie.metrics.click.rollup.MetricClickRollup;
import redv.magpie.metrics.click.rollup.MetricClickRollupJson;
import redv.magpie.metrics.click.rollup.MetricClickRollupRepository;
import redv.magpie.metrics.click.scoreboard.MetricClickScoreboard;
import redv.magpie.metrics.click.scoreboard.MetricClickScoreboardRepository;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrative;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrativeJson;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrativeRepository;
import redv.magpie.metrics.create.target.MetricCreateTargetRepository;
import redv.magpie.metrics.visit.site.MetricVisitSite;
import redv.magpie.metrics.visit.site.MetricVisitSiteRepository;
import redv.magpie.metrics.click.sort.MetricClickSortJson;
import redv.magpie.metrics.click.sort.MetricClickSortRepository;
import redv.magpie.metrics.visit.feedbackPage.MetricVisitFeedbackPageRepository;
import redv.magpie.metrics.visit.rfiHistoryPage.MetricVisitRfiHistoryPage;
import redv.magpie.metrics.visit.rfiHistoryPage.MetricVisitRfiHistoryPageRepository;
import redv.magpie.metrics.visit.scoiPage.MetricVisitScoiPage;
import redv.magpie.metrics.visit.scoiPage.MetricVisitScoiPageRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

public class MetricControllerTest extends BaseIntegrationTest {
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
  private MetricCancelAddSegmentRepository metricCancelAddSegmentRepository;

  @Autowired
  private MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository;

  @Autowired
  private MetricClickRollupRepository metricClickRollupRepository;

  @Autowired
  private MetricClickImportRepository metricClickImportRepository;

  @Autowired
  private MetricClickCollapseRepository metricClickCollapseRepository;

  @Autowired
  private MetricClickScoreboardRepository metricClickScoreboardRepository;

  @Autowired
  private MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository;

  @Autowired
  private MetricVisitScoiPageRepository metricVisitScoiPageRepository;

 @Autowired
  private MetricVisitRfiHistoryPageRepository metricVisitRfiHistoryPageRepository;


  @Before
  public void setup() {
    metricClickGetsRepository.deleteAll();
    metricVisitSiteRepository.deleteAll();
    metricClickSortRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricClickRefreshRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricClickTrackNarrativeRepository.deleteAll();
    metricClickRollupRepository.deleteAll();
    metricClickImportRepository.deleteAll();
    metricClickCollapseRepository.deleteAll();
    metricVisitScoiPageRepository.deleteAll();
    metricVisitRfiHistoryPageRepository.deleteAll();
  }

  @Test
  public void postCreatesNewSiteVisit() {
    long siteVisitCount = metricVisitSiteRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/visit-site")
      .then()
      .statusCode(200);

    assertEquals(siteVisitCount + 1, metricVisitSiteRepository.count());
  }

  @Test
  public void postCreatesNewRefreshClick() {
    long refreshClickCount = metricClickRefreshRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/click-refresh")
      .then()
      .statusCode(200);

    assertEquals(refreshClickCount + 1, metricClickRefreshRepository.count());
  }

  @Test
  public void postCreatesNewGetsClick() throws Exception {

    MetricClickGetsJson metricClickGetsJson = new MetricClickGetsJson(new Date(), "OPEN", "www.google.com");

    long getsClickCount = metricClickGetsRepository.count();

    final String json = objectMapper.writeValueAsString(metricClickGetsJson);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-gets")
      .then()
      .statusCode(200);

    assertEquals(getsClickCount + 1, metricClickGetsRepository.count());
  }

  @Test
  public void postCreatesNewSortClick() throws Exception {

    MetricClickSortJson metricClickSortJSON = new MetricClickSortJson(new Date(), "ltiov", true);

    final String json = objectMapper.writeValueAsString(metricClickSortJSON);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-sort")
      .then()
      .statusCode(200);

    assertEquals(1, metricClickSortRepository.count());
  }

  @Test
  public void postCreatesNewCancelAddSegmentMetric() {
    given()
      .port(port)
      .contentType("application/json")
      .when()
      .post(MetricController.URI + "/cancel-add-segment/5")
      .then()
      .statusCode(200);

    assertEquals(5, metricCancelAddSegmentRepository.findAll().get(0).getTargetId());
  }

  @Test
  public void postCreatesNewClickTrackNarrativeMetric() throws Exception {
    MetricClickTrackNarrativeJson metricJson = new MetricClickTrackNarrativeJson(5, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-track-narrative")
      .then()
      .statusCode(200);

    MetricClickTrackNarrative metric = metricClickTrackNarrativeRepository.findAll().get(0);

    assertEquals(5, metric.getIxnId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewClickRollupMetric() throws Exception {
    MetricClickRollupJson metricJson = new MetricClickRollupJson(5, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-rollup")
      .then()
      .statusCode(200);

    MetricClickRollup metric = metricClickRollupRepository.findAll().get(0);

    assertEquals(5, metric.getTargetId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewClickImportMetric() throws Exception {
    MetricClickImportJson metricJson = new MetricClickImportJson(5, 12, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-import")
      .then()
      .statusCode(200);

    MetricClickImport metric = metricClickImportRepository.findAll().get(0);

    assertEquals(5, metric.getTargetId());
    assertEquals(12, metric.getIxnsImported());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewCollapseClickMetric() {
    given()
      .port(port)
      .contentType("application/json")
      .body("billy.bob.joe")
      .when()
      .post(MetricController.URI + "/click-collapse")
      .then()
      .statusCode(200);

    MetricClickCollapse metric = metricClickCollapseRepository.findAll().get(0);

    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewScoreboardClickMetric() {
    String userName = "Josh.Z";
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/click-scoreboard?userName=" + userName)
      .then()
      .statusCode(200);

    MetricClickScoreboard metric = metricClickScoreboardRepository.findAll().get(0);
    assertEquals(userName, metric.getUserName());
  }

  @Test
  public void postCreatesNewVisitScoiPageMetric() {
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/visit-scoi-page?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, metricVisitScoiPageRepository.findAll().size());
    MetricVisitScoiPage metric = metricVisitScoiPageRepository.findAll().get(0);
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewVisitRfiHistoryPageMetric() {
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/visit-rfi-history-page?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, metricVisitRfiHistoryPageRepository.findAll().size());
    MetricVisitRfiHistoryPage metric = metricVisitRfiHistoryPageRepository.findAll().get(0);
    assertEquals("billy.bob.joe", metric.getUserName());
  }
}
