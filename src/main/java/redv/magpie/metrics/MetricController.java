package redv.magpie.metrics;

import redv.magpie.metrics.click.gets.MetricClickGetsJson;
import redv.magpie.metrics.click.importIxns.MetricClickImportJson;
import redv.magpie.metrics.click.rollup.MetricClickRollupJson;
import redv.magpie.metrics.click.sort.MetricClickSortJson;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrativeJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  private MetricsService metricsService;

  @Autowired
  public MetricController(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @GetMapping(path = "/gets-clicks")
  public long[] getClickGetsCount() {
    return metricsService.getClickGetsCount();
  }

  @GetMapping(path = "/workflow-time")
  public long[] getAverageWorkflowTime() {
    return metricsService.getAverageWorkflowTime();
  }

  @GetMapping(path = "/targets-created-per-week")
  public long getTargetsCreatedPerWeek() {
    return metricsService.getAverageTgtCreationsPerWeek();
  }

  @GetMapping(path = "/ixns-created-per-week")
  public long getIxnsCreatedPerWeek() {
    return metricsService.getAverageIxnCreationsPerWeek();
  }

  @GetMapping(path = "/ixns-completed-per-week")
  public long getIxnsCompletedPerWeek() {
    return metricsService.getAverageTracksCompletedPerWeek();
  }

  @GetMapping(path = "/deletions-per-week")
  public long[] getDeletionsPerWeek() {
    return metricsService.getAverageDeletionsPerWeek();
  }

  @GetMapping(path = "/undos-per-week")
  public long[] getUndosPerWeek() {
    return metricsService.getAverageUndosPerWeek();
  }

  @GetMapping(path = "/edits-per-week")
  public long[] getEditsPerWeek() {
    return metricsService.getAverageEditsPerWeek();
  }

  @GetMapping(path = "/logins-per-week")
  public long getLoginsPerWeek() {
    return metricsService.getAverageUniqueLoginsPerWeek();
  }

  @GetMapping(path = "/prioritizations-per-week")
  public long getPrioritizationsPerWeek() {
    return metricsService.getAveragePrioritizationsPerWeek();
  }

  @GetMapping(path = "/percent-rfis-met-ltiov")
  public int getLtiovMetPercentage() {
    return metricsService.getLtiovMetPercentage();
  }

  @GetMapping(path = "/percent-rfis-unworked")
  public int getUnworkedRfiPercentage() {
    return metricsService.getUnworkedRfiPercentage();
  }

  // USER METRICS
  @GetMapping(path = "/rfis-completed")
  public long getRfisCompleted(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    // Add a day to make the selection inclusive, i.e. include metrics from the end date
    return metricsService
      .getRfisCompleted(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/hours-worked")
  public long getHoursWorked(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getHoursWorkedBetween(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/unique-customers")
  public long getUniqueCustomers(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getUniqueCustomersBetween(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/targets-created")
  public long getsTargetsCreated(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getTargetsCreatedWithinDateRange(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/approval-ratings")
  public List<UserPerformanceMetric> getsApprovalRatings() {
    return metricsService.getUserPerformanceMetrics();
  }

  // END OF USER METRICS

  @PostMapping(path = "/visit-site")
  public void addVisitSite() {
    metricsService.addVisitSite();
  }

  @PostMapping(path = "/cancel-add-segment/{targetId}")
  public void addCancelAddSegment(@PathVariable("targetId") long targetId) {
    metricsService.addCancelAddSegment(targetId);
  }

  @PostMapping(path = "/click-refresh")
  public void addClickRefresh() {
    metricsService.addClickRefresh();
  }

  @PostMapping(path = "/click-gets")
  public void addClickGets(@Valid @RequestBody MetricClickGetsJson metricClickGetsJson) {
    metricsService.addClickGets(metricClickGetsJson);
  }

  @PostMapping(path = "/click-import")
  public void addClickImport(@Valid @RequestBody MetricClickImportJson metricClickImportJson) {
    metricsService.addClickImport(metricClickImportJson);
  }

  @PostMapping(path = "/click-sort")
  public void addClickSort(@Valid @RequestBody MetricClickSortJson metricClickSortJson) {
    metricsService.addClickSort(metricClickSortJson);
  }

  @PostMapping(path = "/click-track-narrative")
  public void addClickTrackNarrative(
    @Valid @RequestBody MetricClickTrackNarrativeJson metricClickTrackNarrativeJson) {
    metricsService.addClickTrackNarrative(metricClickTrackNarrativeJson);
  }

  @PostMapping(path = "/click-rollup")
  public void addClickRollup(@Valid @RequestBody MetricClickRollupJson metricClickRollupJson) {
    metricsService.addClickRollup(metricClickRollupJson);
  }

  @PostMapping(path = "/click-collapse")
  public void addClickCollapse(@Valid @RequestBody String userName) {
    metricsService.addClickCollapse(userName);
  }

  @PostMapping(path = "/click-scoreboard")
  public void addClickScoreboard(
    @Valid @RequestParam(name = "userName", defaultValue = "") String userName) {
    metricsService.addClickScoreboard(userName);
  }

  @PostMapping(path = "/visit-scoi-page")
  public void addVisitScoiPage(
    @Valid @RequestParam(name = "userName", defaultValue = "") String userName) {
    metricsService.addVisitScoiPage(userName);
  }

  @PostMapping(path = "/visit-rfi-history-page")
  public void addVisitRfiHistoryPage(
    @Valid @RequestParam(name = "userName", defaultValue = "") String userName) {
    metricsService.addVisitRfiHistoryPage(userName);
  }
}
