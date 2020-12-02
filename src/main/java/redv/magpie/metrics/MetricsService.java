package redv.magpie.metrics;

import redv.magpie.ixns.*;
import redv.magpie.metrics.cancelAddSegment.MetricCancelAddSegment;
import redv.magpie.metrics.cancelAddSegment.MetricCancelAddSegmentRepository;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDate;
import redv.magpie.metrics.change.exploitDate.MetricChangeExploitDateRepository;
import redv.magpie.metrics.change.ixn.MetricChangeIxn;
import redv.magpie.metrics.change.ixn.MetricChangeIxnRepository;
import redv.magpie.metrics.change.rfi.MetricChangeRfi;
import redv.magpie.metrics.change.rfi.MetricChangeRfiRepository;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriority;
import redv.magpie.metrics.change.rfiPriority.MetricChangeRfiPriorityRepository;
import redv.magpie.metrics.change.scoi.MetricChangeScoi;
import redv.magpie.metrics.change.scoi.MetricChangeScoiRepository;
import redv.magpie.metrics.change.segment.MetricChangeSegment;
import redv.magpie.metrics.change.segment.MetricChangeSegmentRepository;
import redv.magpie.metrics.change.target.MetricChangeTarget;
import redv.magpie.metrics.change.target.MetricChangeTargetRepository;
import redv.magpie.metrics.click.collapse.MetricClickCollapse;
import redv.magpie.metrics.click.collapse.MetricClickCollapseRepository;
import redv.magpie.metrics.click.gets.MetricClickGets;
import redv.magpie.metrics.click.gets.MetricClickGetsJson;
import redv.magpie.metrics.click.gets.MetricClickGetsRepository;
import redv.magpie.metrics.click.importIxns.MetricClickImport;
import redv.magpie.metrics.click.importIxns.MetricClickImportJson;
import redv.magpie.metrics.click.importIxns.MetricClickImportRepository;
import redv.magpie.metrics.click.refresh.MetricClickRefresh;
import redv.magpie.metrics.click.refresh.MetricClickRefreshRepository;
import redv.magpie.metrics.click.rollup.MetricClickRollup;
import redv.magpie.metrics.click.rollup.MetricClickRollupJson;
import redv.magpie.metrics.click.rollup.MetricClickRollupRepository;
import redv.magpie.metrics.click.scoreboard.MetricClickScoreboard;
import redv.magpie.metrics.click.scoreboard.MetricClickScoreboardRepository;
import redv.magpie.metrics.click.sort.MetricClickSort;
import redv.magpie.metrics.click.sort.MetricClickSortJson;
import redv.magpie.metrics.click.sort.MetricClickSortRepository;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrative;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrativeJson;
import redv.magpie.metrics.click.trackNarrative.MetricClickTrackNarrativeRepository;
import redv.magpie.metrics.create.exploitDate.MetricCreateExploitDate;
import redv.magpie.metrics.create.exploitDate.MetricCreateExploitDateRepository;
import redv.magpie.metrics.create.ixn.MetricCreateIxn;
import redv.magpie.metrics.create.ixn.MetricCreateIxnRepository;
import redv.magpie.metrics.create.scoi.MetricCreateScoi;
import redv.magpie.metrics.create.scoi.MetricCreateScoiRepository;
import redv.magpie.metrics.create.segment.MetricCreateSegment;
import redv.magpie.metrics.create.segment.MetricCreateSegmentRepository;
import redv.magpie.metrics.create.target.MetricCreateTarget;
import redv.magpie.metrics.create.target.MetricCreateTargetRepository;
import redv.magpie.metrics.create.targetFromGets.MetricCreateTargetFromGets;
import redv.magpie.metrics.create.targetFromGets.MetricCreateTargetFromGetsRepository;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDate;
import redv.magpie.metrics.delete.exploitDate.MetricDeleteExploitDateRepository;
import redv.magpie.metrics.delete.ixn.MetricDeleteIxn;
import redv.magpie.metrics.delete.ixn.MetricDeleteIxnRepository;
import redv.magpie.metrics.delete.segment.MetricDeleteSegment;
import redv.magpie.metrics.delete.segment.MetricDeleteSegmentRepository;
import redv.magpie.metrics.delete.target.MetricDeleteTarget;
import redv.magpie.metrics.delete.target.MetricDeleteTargetRepository;
import redv.magpie.metrics.downloadProduct.MetricDownloadProduct;
import redv.magpie.metrics.downloadProduct.MetricDownloadProductRepository;
import redv.magpie.metrics.login.MetricLogin;
import redv.magpie.metrics.login.MetricLoginRepository;
import redv.magpie.metrics.undo.changeRfiPriority.MetricUndoChangeRfiPriority;
import redv.magpie.metrics.undo.changeRfiPriority.MetricUndoChangeRfiPriorityRepository;
import redv.magpie.metrics.undo.exploitDateDelete.MetricUndoExploitDateDelete;
import redv.magpie.metrics.undo.exploitDateDelete.MetricUndoExploitDateDeleteRepository;
import redv.magpie.metrics.undo.ixnDelete.MetricUndoIxnDelete;
import redv.magpie.metrics.undo.ixnDelete.MetricUndoIxnDeleteRepository;
import redv.magpie.metrics.undo.segmentDelete.MetricUndoSegmentDelete;
import redv.magpie.metrics.undo.segmentDelete.MetricUndoSegmentDeleteRepository;
import redv.magpie.metrics.undo.targetCreate.MetricUndoTargetCreate;
import redv.magpie.metrics.undo.targetCreate.MetricUndoTargetCreateRepository;
import redv.magpie.metrics.undo.targetDelete.MetricUndoTargetDelete;
import redv.magpie.metrics.undo.targetDelete.MetricUndoTargetDeleteRepository;
import redv.magpie.metrics.uploadProduct.MetricUploadProduct;
import redv.magpie.metrics.uploadProduct.MetricUploadProductRepository;
import redv.magpie.metrics.visit.feedbackPage.MetricVisitFeedbackPage;
import redv.magpie.metrics.visit.feedbackPage.MetricVisitFeedbackPageRepository;
import redv.magpie.metrics.visit.rfiHistoryPage.MetricVisitRfiHistoryPage;
import redv.magpie.metrics.visit.rfiHistoryPage.MetricVisitRfiHistoryPageRepository;
import redv.magpie.metrics.visit.scoiPage.MetricVisitScoiPage;
import redv.magpie.metrics.visit.scoiPage.MetricVisitScoiPageRepository;
import redv.magpie.metrics.visit.site.MetricVisitSite;
import redv.magpie.metrics.visit.site.MetricVisitSiteRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.scois.Scoi;
import redv.magpie.tgts.Target;
import redv.magpie.tgts.TargetJson;
import redv.magpie.tgts.TargetRepository;
import redv.magpie.tgts.exploitDates.ExploitDateJson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Short.parseShort;

@Service
@Slf4j
public class MetricsService {
  static final long MILLISECONDS_IN_A_DAY = 86400000L;

  private RfiRepository rfiRepository;
  private TargetRepository targetRepository;
  private MetricClickGetsRepository metricClickGetsRepository;
  private MetricVisitSiteRepository metricVisitSiteRepository;
  private MetricClickSortRepository metricClickSortRepository;
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  private MetricChangeRfiRepository metricChangeRfiRepository;
  private MetricClickRefreshRepository metricClickRefreshRepository;
  private MetricCreateExploitDateRepository metricCreateExploitDateRepository;
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  private MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  private MetricCreateTargetRepository metricCreateTargetRepository;
  private MetricCreateTargetFromGetsRepository metricCreateTargetFromGetsRepository;
  private MetricChangeTargetRepository metricChangeTargetRepository;
  private MetricDeleteTargetRepository metricDeleteTargetRepository;
  private MetricCreateSegmentRepository metricCreateSegmentRepository;
  private MetricChangeSegmentRepository metricChangeSegmentRepository;
  private MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  private MetricCreateIxnRepository metricCreateIxnRepository;
  private MetricChangeIxnRepository metricChangeIxnRepository;
  private MetricDeleteIxnRepository metricDeleteIxnRepository;
  private MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository;
  private MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository;
  private MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository;
  private MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository;
  private MetricCancelAddSegmentRepository metricCancelAddSegmentRepository;
  private MetricLoginRepository metricLoginRepository;
  private MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository;
  private MetricClickRollupRepository metricClickRollupRepository;
  private MetricClickImportRepository metricClickImportRepository;
  private MetricClickCollapseRepository metricClickCollapseRepository;
  private MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository;
  private MetricUndoTargetCreateRepository metricUndoTargetCreateRepository;
  private MetricUploadProductRepository metricUploadProductRepository;
  private MetricDownloadProductRepository metricDownloadProductRepository;
  private MetricClickScoreboardRepository metricClickScoreboardRepository;
  private MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository;
  private MetricCreateScoiRepository metricCreateScoiRepository;
  private MetricChangeScoiRepository metricChangeScoiRepository;
  private MetricVisitScoiPageRepository metricVisitScoiPageRepository;
  private MetricVisitRfiHistoryPageRepository metricVisitRfiHistoryPageRepository;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
  }

  @Autowired
  public void setMetricClickGetsRepository(MetricClickGetsRepository metricClickGetsRepository) {
    this.metricClickGetsRepository = metricClickGetsRepository;
  }

  @Autowired
  public void setMetricSiteVisitRepository(MetricVisitSiteRepository metricVisitSiteRepository) {
    this.metricVisitSiteRepository = metricVisitSiteRepository;
  }

  @Autowired
  public void setMetricClickSortRepository(MetricClickSortRepository metricClickSortRepository) {
    this.metricClickSortRepository = metricClickSortRepository;
  }

  @Autowired
  public void setMetricChangeRfiPriorityRepository(
    MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository) {
    this.metricChangeRfiPriorityRepository = metricChangeRfiPriorityRepository;
  }

  @Autowired
  public void setMetricChangeRfiRepository(MetricChangeRfiRepository metricChangeRfiRepository) {
    this.metricChangeRfiRepository = metricChangeRfiRepository;
  }

  @Autowired
  public void setMetricClickRefreshRepository(MetricClickRefreshRepository metricClickRefreshRepository) {
    this.metricClickRefreshRepository = metricClickRefreshRepository;
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
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricCreateTargetFromGetsRepository(
    MetricCreateTargetFromGetsRepository metricCreateTargetFromGetsRepository) {
    this.metricCreateTargetFromGetsRepository = metricCreateTargetFromGetsRepository;
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
  public void setMetricCreateSegmentRepository(MetricCreateSegmentRepository metricCreateSegmentRepository) {
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
  }

  @Autowired
  public void setMetricChangeSegmentRepository(MetricChangeSegmentRepository metricChangeSegmentRepository) {
    this.metricChangeSegmentRepository = metricChangeSegmentRepository;
  }

  @Autowired
  public void setMetricDeleteSegmentRepository(MetricDeleteSegmentRepository metricDeleteSegmentRepository) {
    this.metricDeleteSegmentRepository = metricDeleteSegmentRepository;
  }

  @Autowired
  public void setMetricCreateIxnRepository(MetricCreateIxnRepository metricCreateIxnRepository) {
    this.metricCreateIxnRepository = metricCreateIxnRepository;
  }

  @Autowired
  public void setMetricChangeIxnRepository(MetricChangeIxnRepository metricChangeIxnRepository) {
    this.metricChangeIxnRepository = metricChangeIxnRepository;
  }

  @Autowired
  public void setMetricDeleteIxnRepository(MetricDeleteIxnRepository metricDeleteIxnRepository) {
    this.metricDeleteIxnRepository = metricDeleteIxnRepository;
  }

  @Autowired
  public void setMetricUndoIxnDeleteRepository(MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository) {
    this.metricUndoIxnDeleteRepository = metricUndoIxnDeleteRepository;
  }

  @Autowired
  public void setMetricUndoSegmentDeleteRepository(
    MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository) {
    this.metricUndoSegmentDeleteRepository = metricUndoSegmentDeleteRepository;
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
  public void setMetricCancelAddSegmentRepository(MetricCancelAddSegmentRepository metricCancelAddSegmentRepository) {
    this.metricCancelAddSegmentRepository = metricCancelAddSegmentRepository;
  }

  @Autowired
  public void setMetricLoginRepository(MetricLoginRepository metricLoginRepository) {
    this.metricLoginRepository = metricLoginRepository;
  }

  @Autowired
  public void setMetricClickTrackNarrativeRepository(
    MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository) {
    this.metricClickTrackNarrativeRepository = metricClickTrackNarrativeRepository;
  }

  @Autowired
  public void setMetricClickRollupRepository(MetricClickRollupRepository metricClickRollupRepository) {
    this.metricClickRollupRepository = metricClickRollupRepository;
  }

  @Autowired
  public void setMetricClickImportRepository(MetricClickImportRepository metricClickImportRepository) {
    this.metricClickImportRepository = metricClickImportRepository;
  }

  @Autowired
  public void setMetricClickCollapseRepository(MetricClickCollapseRepository metricClickCollapseRepository) {
    this.metricClickCollapseRepository = metricClickCollapseRepository;
  }

  @Autowired
  public void setMetricUndoChangeRfiPriorityRepository(
    MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository) {
    this.metricUndoChangeRfiPriorityRepository = metricUndoChangeRfiPriorityRepository;
  }

  @Autowired
  public void setMetricUndoTargetCreateRepository(
    MetricUndoTargetCreateRepository metricUndoTargetCreateRepository) {
    this.metricUndoTargetCreateRepository = metricUndoTargetCreateRepository;
  }

  @Autowired
  public void setMetricVisitFeedbackPageRepository(
    MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository) {
    this.metricVisitFeedbackPageRepository = metricVisitFeedbackPageRepository;
  }

  @Autowired
  public void setMetricUploadProductRepository(
    MetricUploadProductRepository metricUploadProductRepository) {
    this.metricUploadProductRepository = metricUploadProductRepository;
  }

  @Autowired
  public void setMetricDownloadProductRepository(
    MetricDownloadProductRepository metricDownloadProductRepository) {
    this.metricDownloadProductRepository = metricDownloadProductRepository;
  }

  @Autowired
  public void setMetricClickScoreboardRepository(
    MetricClickScoreboardRepository metricClickScoreboardRepository) {
    this.metricClickScoreboardRepository = metricClickScoreboardRepository;
  }

  @Autowired
  public void setMetricCreateScoiRepository(
    MetricCreateScoiRepository metricCreateScoiRepository) {
    this.metricCreateScoiRepository = metricCreateScoiRepository;
  }

  @Autowired
  public void setMetricChangeScoiRepository(
    MetricChangeScoiRepository metricChangeScoiRepository) {
    this.metricChangeScoiRepository = metricChangeScoiRepository;
  }

  @Autowired
  public void setMetricVisitScoiPageRepository(MetricVisitScoiPageRepository metricVisitScoiPageRepository) {
    this.metricVisitScoiPageRepository = metricVisitScoiPageRepository;
  }

  @Autowired
  public void setMetricVisitRfiHistoryPageRepository(
    MetricVisitRfiHistoryPageRepository metricVisitRfiHistoryPageRepository) {
    this.metricVisitRfiHistoryPageRepository = metricVisitRfiHistoryPageRepository;
  }

  public void addVisitSite() {
    MetricVisitSite metricVisitSite = new MetricVisitSite(new Date());
    this.metricVisitSiteRepository.save(metricVisitSite);
  }

  public void addClickRefresh() {
    MetricClickRefresh metricClickRefresh = new MetricClickRefresh(new Date());
    this.metricClickRefreshRepository.save(metricClickRefresh);
  }

  public void addClickGets(MetricClickGetsJson metricClickGetsJson) {
    MetricClickGets metricClickGets = new MetricClickGets(
      new Date(),
      metricClickGetsJson.getStatus(),
      metricClickGetsJson.getUrl()

    );
    this.metricClickGetsRepository.save(metricClickGets);
  }

  public void addClickSort(MetricClickSortJson metricClickSortJson) {
    MetricClickSort metricClickSort = new MetricClickSort(
      new Date(),
      metricClickSortJson.getKey(),
      metricClickSortJson.isOrderAscending()
    );
    this.metricClickSortRepository.save(metricClickSort);
  }

  public void addChangeRfiPriority(List<MetricChangeRfiPriority> metricChangeRfiPriorities) {
    this.metricChangeRfiPriorityRepository.saveAll(metricChangeRfiPriorities);
  }

  public void addChangeRfi(MetricChangeRfi metricChangeRfi) {
    this.metricChangeRfiRepository.save(metricChangeRfi);
  }

  public void addChangeExploitDate(ExploitDateJson exploitDate) {
    this.metricChangeExploitDateRepository.save(new MetricChangeExploitDate(exploitDate));
  }

  public void addCreateTarget(long targetId, TargetJson target, String name, String userName, Boolean isCopy) {
    this.metricCreateTargetRepository.save(new MetricCreateTarget(targetId, target, name, userName, isCopy));
  }

  public void addDeleteExploitDate(long exploitDateId) {
    metricDeleteExploitDateRepository.save(new MetricDeleteExploitDate(exploitDateId));
  }

  public void addDeleteTarget(long targetId) {
    this.metricDeleteTargetRepository.save(new MetricDeleteTarget(targetId));
  }

  public void addChangeTarget(Target oldTarget, TargetJson newTarget, String userName) {
    List<MetricChangeTarget> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldTarget.compare(newTarget)) {
      try {
        MetricChangeTarget changeTarget = new MetricChangeTarget(
          field,
          newTarget,
          now,
          userName
        );
        metrics.add(changeTarget);
      } catch (Exception e) {
        log.error("Error creating change target metric with unknown field: " + field);
      }
    }
    metricChangeTargetRepository.saveAll(metrics);
  }

  public void addCreateSegment(long segmentId, SegmentJson segmentJson) {
    metricCreateSegmentRepository.save(new MetricCreateSegment(segmentId, segmentJson));
  }

  public void addChangeSegment(SegmentJson newSegment) {
    metricChangeSegmentRepository.save(new MetricChangeSegment(newSegment));
  }

  public void addDeleteSegment(long segmentId, boolean hadIxns) {
    metricDeleteSegmentRepository.save(new MetricDeleteSegment(segmentId, hadIxns));
  }

  public void addCreateIxn(long ixnId, IxnJson ixn, String userName) {
    metricCreateIxnRepository.save(new MetricCreateIxn(ixnId, ixn, userName));
  }

  public void addDeleteIxn(long ixnId) {
    metricDeleteIxnRepository.save(new MetricDeleteIxn(ixnId));
  }

  public void addChangeIxn(IxnJson newIxn, Ixn oldIxn, String userName) {
    List<MetricChangeIxn> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldIxn.compare(newIxn)) {
      try {
        metrics.add(new MetricChangeIxn(field, newIxn, now, userName));
      } catch (Exception e) {
        log.error("Error creating change ixn metric with unknown field: " + field);
      }
    }
    metricChangeIxnRepository.saveAll(metrics);
  }

  public void addCreateExploitDate(long lastExploitDateId, ExploitDateJson exploitDateJson) {
    metricCreateExploitDateRepository.save(new MetricCreateExploitDate(lastExploitDateId, exploitDateJson));
  }

  public void addUndoIxnDelete(long ixnId) {
    metricUndoIxnDeleteRepository.save(new MetricUndoIxnDelete(ixnId));
  }

  public void addUndoChangeRfiPriority(long rfiId, String userName) {
    metricUndoChangeRfiPriorityRepository.save(new MetricUndoChangeRfiPriority(rfiId, userName));
  }

  public void addUndoSegmentDelete(long segmentId) {
    metricUndoSegmentDeleteRepository.save(new MetricUndoSegmentDelete(segmentId));
  }

  public void addUndoTargetDelete(long targetId) {
    metricUndoTargetDeleteRepository.save(new MetricUndoTargetDelete(targetId));
  }

  public void addUndoExploitDateDelete(long exploitDateId) {
    metricUndoExploitDateDeleteRepository.save(new MetricUndoExploitDateDelete(exploitDateId));
  }

  public void addCancelAddSegment(long targetId) {
    metricCancelAddSegmentRepository.save(new MetricCancelAddSegment(targetId));
  }

  public void addLoginMetric(String userName) {
    metricLoginRepository.save(new MetricLogin(userName));
  }

  public void addUploadFileMetric(String rfiId, long uploadId, String userName) {
    metricUploadProductRepository.save(new MetricUploadProduct(parseShort(rfiId), uploadId, userName));
  }

  public void addDownloadProduct(long rfiId, String userName) {
    metricDownloadProductRepository.save(new MetricDownloadProduct(rfiId, userName));
  }

  public void addClickScoreboard(String userName) {
    metricClickScoreboardRepository.save(new MetricClickScoreboard(userName));
  }

  public void addVisitFeedbackPage(String rfiNum) {
    metricVisitFeedbackPageRepository.save(new MetricVisitFeedbackPage(rfiNum));
  }

  public void addCreateScoi(long scoiId, String userName) {
    metricCreateScoiRepository.save(new MetricCreateScoi(scoiId, userName));
  }

  public void addChangeScoiMetrics(Scoi oldScoi, Scoi newScoi, String userName) {
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldScoi.compare(newScoi)) {
      try {
        metricChangeScoiRepository.save(new MetricChangeScoi(field, newScoi, now, userName));
      } catch (Exception e) {
        log.error("Failed to save MetricChangeScoi with field " + field);
      }
    }
  }

  public void addClickRollup(MetricClickRollupJson metricClickRollupJson) {
    metricClickRollupRepository.save(new MetricClickRollup(metricClickRollupJson));
  }

  public void addClickImport(MetricClickImportJson metricClickImportJson) {
    metricClickImportRepository.save(new MetricClickImport(metricClickImportJson));
  }

  public void addVisitScoiPage(String userName) {
    metricVisitScoiPageRepository.save(new MetricVisitScoiPage(userName));
  }

  public void addClickCollapse(String userName) {
    metricClickCollapseRepository.save(new MetricClickCollapse(userName));
  }

  public void addVisitRfiHistoryPage(String userName) {
    metricVisitRfiHistoryPageRepository.save(new MetricVisitRfiHistoryPage(userName));
  }

  public void addClickTrackNarrative(
    MetricClickTrackNarrativeJson metricClickTrackNarrativeJson) {
    metricClickTrackNarrativeRepository.save(new MetricClickTrackNarrative(metricClickTrackNarrativeJson));
  }

  public void addUndoTargetCreate(long targetId, String userName) {
    metricUndoTargetCreateRepository.save(new MetricUndoTargetCreate(targetId, userName));
  }

  public void addCreateTargetFromGets(Target target, Timestamp timestamp) {
    metricCreateTargetFromGetsRepository.save(new MetricCreateTargetFromGets(target, timestamp));
  }

  public long[] getClickGetsCount() {
    return new long[]{
      metricClickGetsRepository.findAllByStatus("OPEN").size(),
      metricClickGetsRepository.findAllByStatus("PENDING").size()
    };
  }

  public long[] getAverageWorkflowTime() {
    int totalTimePending = 0;
    int totalTimeOpen = 0;
    int numberRfis = 0;

    List<Rfi> closedRfis = rfiRepository.findAllClosedWithDefinedReceiveDate();

    for (Rfi rfi : closedRfis) {
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {

        Date openTime = metricOpen.getDatetime();
        long daysPending = (openTime.getTime() - rfi.getReceiveDate().getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimePending += daysPending;

        Date closedTime = metricClose.getDatetime();
        long daysOpen = (closedTime.getTime() - openTime.getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimeOpen += daysOpen;
        numberRfis++;
      }
    }

    if (numberRfis > 0) {
      return new long[]{totalTimeOpen / numberRfis, totalTimePending / numberRfis};
    }
    return new long[]{0, 0};
  }

  public long getAverageCompletionTimeLast3Rfis() {
    int totalTimeOpen = 0;
    int numberRfis = 0;

    List<Rfi> closedRfis = rfiRepository.findAllClosedWithDefinedReceiveDate();

    for (int i = 0; i < closedRfis.size() && numberRfis < 3; i++) {
      Rfi rfi = closedRfis.get(i);
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {

        Date openTime = metricOpen.getDatetime();
        Date closedTime = metricClose.getDatetime();
        long daysOpen = (closedTime.getTime() - openTime.getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimeOpen += daysOpen;
        numberRfis++;
      }
    }

    if (numberRfis > 0) {
      return MILLISECONDS_IN_A_DAY * (totalTimeOpen / numberRfis);
    }

    return -1;
  }

  public long getAverageTgtCreationsPerWeek() {
    return getAveragePerWeek(metricCreateTargetRepository.findAll());
  }

  public long getAverageIxnCreationsPerWeek() {
    return getAveragePerWeek(metricCreateIxnRepository.findAll());
  }

  public long[] getAverageDeletionsPerWeek() {
    return new long[]{
      getAveragePerWeek(metricDeleteExploitDateRepository.findAll()),
      getAveragePerWeek(metricDeleteTargetRepository.findAll()),
      getAveragePerWeek(metricDeleteSegmentRepository.findAll()),
      getAveragePerWeek(metricDeleteIxnRepository.findAll())
    };
  }

  public long[] getAverageUndosPerWeek() {
    return new long[]{
      getAveragePerWeek(metricUndoExploitDateDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoTargetDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoSegmentDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoIxnDeleteRepository.findAll())
    };
  }

  public long[] getAverageEditsPerWeek() {
    List<MetricChangeTarget> tgtEdits = new ArrayList<>();
    for (MetricChangeTarget metric : metricChangeTargetRepository.findAll()) {
      try {
        MetricChangeTarget lastMetric = tgtEdits.get(tgtEdits.size() - 1);
        if (!(metric.getTimestamp().equals(lastMetric.getTimestamp()) &&
          metric.getTargetId() == lastMetric.getTargetId())) {
          tgtEdits.add(metric);
        }
      } catch (Exception e) {
        tgtEdits.add(metric);
      }
    }

    List<MetricChangeIxn> ixnEdits = new ArrayList<>();
    for (MetricChangeIxn metric : metricChangeIxnRepository.findAll()) {
      try {
        MetricChangeIxn lastMetric = ixnEdits.get(ixnEdits.size() - 1);
        if (!(metric.getTimestamp().equals(lastMetric.getTimestamp()) && metric.getIxnId() == lastMetric.getIxnId())) {
          ixnEdits.add(metric);
        }
      } catch (Exception e) {
        ixnEdits.add(metric);
      }
    }

    return new long[]{
      getAveragePerWeek(metricChangeExploitDateRepository.findAll()),
      getAveragePerWeek(tgtEdits),
      getAveragePerWeek(metricChangeSegmentRepository.findAll()),
      getAveragePerWeek(ixnEdits)
    };
  }

  public long getAverageUniqueLoginsPerWeek() {
    if (metricLoginRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueWeeklyLogins = 0;
    long weeks = 1;
    long now = new Date().getTime();
    Timestamp weekStart = metricLoginRepository.findAll().get(0).getTimestamp();
    Timestamp weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);

    while (weekStart.getTime() < now) {
      long uniqueLoginsThisWeek = metricLoginRepository.findAllUniqueLoginsBetween(weekStart, weekEnd).size();
      totalUniqueWeeklyLogins += uniqueLoginsThisWeek;
      weekStart = weekEnd;
      weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);
      if (weekEnd.getTime() <= now) {
        weeks++;
      }
    }
    return Math.round((float) totalUniqueWeeklyLogins / (float) weeks);
  }

  public long getHoursWorkedBetween(Date startTime, Date endTime) {
    if (metricLoginRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueDailyLogins = 0;
    Timestamp dayStart = new Timestamp(startTime.getTime());
    Timestamp dayEnd = new Timestamp(dayStart.getTime() + MILLISECONDS_IN_A_DAY);

    while (dayStart.getTime() < endTime.getTime()) {
      long uniqueLoginsThisDay = metricLoginRepository.findAllUniqueLoginsBetween(dayStart, dayEnd).size();
      totalUniqueDailyLogins += uniqueLoginsThisDay;
      dayStart = dayEnd;
      dayEnd = new Timestamp(dayStart.getTime() + MILLISECONDS_IN_A_DAY);
    }
    return totalUniqueDailyLogins * 5; //estimating 5 hours worked per day per user
  }

  public long getAveragePrioritizationsPerWeek() {
    if (metricChangeRfiPriorityRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueWeeklyPrioritizations = 0;
    long weeks = 1;
    long now = new Date().getTime();
    Date weekStart = metricChangeRfiPriorityRepository.findAll().get(0).getDatetime();
    Date weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);

    while (weekStart.getTime() < now) {
      long uniquePrioritizationsThisWeek = metricChangeRfiPriorityRepository
        .findAllUniquePrioritizationsDuringWeek(weekStart, weekEnd).size();
      totalUniqueWeeklyPrioritizations += uniquePrioritizationsThisWeek;
      if (weekEnd.getTime() <= now) {
        weeks++;
      }
      weekStart = weekEnd;
      weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);
    }

    return Math.round((float) totalUniqueWeeklyPrioritizations / (float) weeks);
  }

  public int getLtiovMetPercentage() {
    List<Rfi> closedRfis = rfiRepository.findAllClosed();
    int totalRfis = 0;
    int completedBeforeLtiov = 0;

    for (Rfi rfi : closedRfis) {
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      Timestamp rfiLtiov = rfi.getLtiov();

      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {
        if (rfiLtiov == null || metricClose.getDatetime().before(rfiLtiov)) {
          completedBeforeLtiov++;
        }
        totalRfis++;
      }
    }

    if (totalRfis == 0) {
      return 0;
    } else {
      return Math.round(((float) completedBeforeLtiov / (float) totalRfis) * 100);
    }
  }

  public Date getRfiStartDate(String rfiNum) {
    MetricChangeRfi startDateMetric = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiNum);
    if (startDateMetric == null) {
      return null;
    }
    return startDateMetric.getDatetime();
  }

  public Date getRfiCloseDate(String rfiNum) {
    try {
      return metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfiNum).getDatetime();
    } catch (Exception e) {
      log.trace("Close date not found for RFI " + rfiNum);
      return null;
    }
  }

  public long getRfisCompleted(Date startDate, Date endDate) {
    return metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(
      startDate, endDate).size();
  }

  public long getTargetsCreatedWithinDateRange(Date startDate, Date endDate) {
    return metricCreateTargetRepository.findTargetsCreatedBetweenDateRange(
      startDate, endDate).size();
  }

  public int getUniqueCustomersBetween(Date startDate, Date endDate) {
    List<MetricChangeRfi> allClosedBetweenDateRange =
      metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(startDate, endDate);

    List<String> uniqueCustomers = new ArrayList<>();

    for (MetricChangeRfi closedMetric : allClosedBetweenDateRange) {
      MetricChangeRfi openMetric = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(closedMetric.getRfiNum());
      if (openMetric != null && openMetric.getDatetime()
        .before(new Date(closedMetric.getDatetime().getTime() - MetricsService.MILLISECONDS_IN_A_DAY))) {
        String customer = rfiRepository.findByRfiNum(closedMetric.getRfiNum()).getCustomerUnit();

        if (!uniqueCustomers.contains(customer)) {
          uniqueCustomers.add(customer);
        }
      }
    }

    return uniqueCustomers.size();
  }

  public int getUnworkedRfiPercentage() {
    List<MetricChangeRfi> rfisOpened = metricChangeRfiRepository.findAllStatusChangeToOpen();
    int totalOpenedClosedRfis = 0;
    int unworkedRfis = 0;

    for (MetricChangeRfi rfiOpened : rfisOpened) {
      MetricChangeRfi rfiClosed = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfiOpened.getRfiNum());
      if (rfiClosed != null) {
        totalOpenedClosedRfis++;
        if (rfiClosed.getDatetime()
          .before(new Date(rfiOpened.getDatetime().getTime() + MetricsService.MILLISECONDS_IN_A_DAY))) {
          unworkedRfis++;
        }
      }
    }

    if (unworkedRfis == 0) {
      if (totalOpenedClosedRfis == 0) {
        return 0;
      } else {
        return 100;
      }
    }

    return Math.round(100 * (float) unworkedRfis / (float) totalOpenedClosedRfis);
  }

  public List<UserPerformanceMetric> getUserPerformanceMetrics() {
    List<MetricChangeIxn> trackCompletions = metricChangeIxnRepository.findAllStatusChangeToComplete();
    List<AcceptRejectTally> tallies = new ArrayList<>();

    for (MetricChangeIxn trackCompletion : trackCompletions) {
      try {
        //Get the first approval status change to approved or rejected after the track completion
        MetricChangeIxn firstTrackApproveReject = metricChangeIxnRepository
          .findRejectionOrAcceptanceByIxnIdAfterTime(trackCompletion.getIxnId(), trackCompletion.getTimestamp()).get(0);

        //Try to find the username within the existing list
        AcceptRejectTally tallyToIncrement = null;
        for (AcceptRejectTally tally : tallies) {
          if (tally.getUserName().equals(trackCompletion.getUserName())) {
            tallyToIncrement = tally;
            break;
          }
        }

        //username not found, add to list
        if (tallyToIncrement == null) {
          tallyToIncrement = new AcceptRejectTally(trackCompletion.getUserName());
          tallies.add(tallyToIncrement);
        }

        //increment accepted & total accordingly
        if (firstTrackApproveReject.getNewData().equals(IxnApprovalStatus.APPROVED)) {
          tallyToIncrement.incrementAccepted();
        }

        tallyToIncrement.incrementTotal();

      } catch (IndexOutOfBoundsException e) {
        // No approve or reject found, ignore
      }
    }

    List<UserPerformanceMetric> metrics = new ArrayList<>();
    for (AcceptRejectTally tally : tallies) {
      metrics.add(new UserPerformanceMetric(tally.getUserName(),
        Math.round(((float) tally.getAccepted() / tally.getTotal()) * 100)));
    }

    return metrics;
  }

  public long getAverageTracksCompletedPerWeek() {
    return getAveragePerWeek(metricChangeIxnRepository.findByNewDataEquals(IxnStatus.COMPLETED));
  }

  public long getEstimatedCompletionTimeByNumberOfTargets(long rfiId) {
    // Get rfis closed within last 6 months
    Date sixMonthsAgo = new Date(new Date().getTime() - 180 * MetricsService.MILLISECONDS_IN_A_DAY);
    List<MetricChangeRfi> allClosedRfis =
      metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(sixMonthsAgo, new Date());

    long totalOpenTime = 0;
    int totalNumTargets = 0;

    // filter out rfis without an open metric or targets associated
    // get number of targets (not deleted) for all of those rfis, exclude rfis with no targets
    // calculate total time the rfis were open
    for (MetricChangeRfi rfiClose : allClosedRfis) {
      long rfiCloseId = rfiRepository.findByRfiNum(rfiClose.getRfiNum()).getId();
      if (
        metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiClose.getRfiNum()) != null
          &&
          !targetRepository.findAllByRfiId(rfiCloseId).isEmpty()
      ) {
        long openTime = rfiClose.getDatetime().getTime() -
          metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiClose.getRfiNum()).getDatetime().getTime();
        int numTargets = targetRepository.findAllByRfiId(rfiCloseId).size();
        totalOpenTime += openTime;
        totalNumTargets += numTargets;
      }
    }

    try {
      // Get total number of targets for requested rfiId
      // divide total targets  by total rfis open time to get average tgt/day over past 6 months
      // return that number / tgts per day
      long numTargetsForRequestedRfi = targetRepository.findAllByRfiId(rfiId).size();

      //If tgts/day is 0 or undefined, or num targets for requested rfi is 0 return null
      if (totalOpenTime == 0 || totalNumTargets == 0 || numTargetsForRequestedRfi == 0) {
        return -1;
      }

      return (long) ((float) numTargetsForRequestedRfi / ((float) totalNumTargets / (float) totalOpenTime));
    } catch (Exception e) {
      log.trace("Could not get completion time by targets:", e);
      return -1;
    }
  }

  private long getAveragePerWeek(List<? extends TimestampMetric> metrics) {
    try {
      long startDate = metrics.get(0).getTimestamp().getTime();
      long count = metrics.size();
      long now = new Date().getTime();
      int weeksSinceStartDate = Math.round((float) (now - startDate) / (float) (7 * MILLISECONDS_IN_A_DAY));
      if (weeksSinceStartDate == 0) {
        weeksSinceStartDate = 1;
      }
      return Math.round((float) count / (float) weeksSinceStartDate);
    } catch (Exception e) {
      return 0;
    }
  }
}
