package redv.magpie.tgts;

import redv.magpie.ixns.*;
import redv.magpie.metrics.MetricsService;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateJson;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class TargetService {
  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;
  private IxnService ixnService;
  private TargetNameRepository targetNameRepository;

  @Autowired
  public TargetService(RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository,
                       SegmentRepository segmentRepository,
                       IxnRepository ixnRepository,
                       IxnService ixnService,
                       TargetNameRepository targetNameRepository
  ) {
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
    this.ixnService = ixnService;
    this.targetNameRepository = targetNameRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
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
  public void setSegmentRepository(SegmentRepository segmentRepository) {
    this.segmentRepository = segmentRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @Autowired
  public void setTargetNameRepository(TargetNameRepository targetNameRepository) {
    this.targetNameRepository = targetNameRepository;
  }

  public List<TargetGet> getTargets(long rfiId) {
    List<Target> targets = targetRepository.findAllByRfiId(rfiId);
    List<TargetGet> targetGets = new ArrayList<>();

    for (Target target : targets) {
      targetGets.add(new TargetGet(target, ixnService.targetContainsRejectedTracks(target.getId())));
    }

    return targetGets;
  }

  public List<ExploitDate> getExploitDates(long rfiId) {
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(rfiId);
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

  public void postTarget(List<TargetJson> targetJsons, String userName, Boolean isCopy) {
    for (TargetJson targetJson : targetJsons) {
      if (targetJson.getTargetId() > 0) {
        editTarget(targetJson, userName);
      } else {
        addTarget(targetJson, userName, isCopy);
      }
    }
  }

  public List<ExploitDate> postExploitDate(ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findRfiById(exploitDateJson.getRfiId());
    if (rfi == null) {
      // Failback in case there is no rfi associated with the provided rfiId
      log.error("Error posting exploit date: RFI with id " + exploitDateJson.getRfiId() +
        " not found");
      return new ArrayList<>();
    }

    ExploitDate newExploitDate = new ExploitDate(
      exploitDateJson.getNewExploitDate(),
      rfi.getId()
    );

    if (exploitDateJson.getExploitDateId() > 0) {
      newExploitDate.setId(exploitDateJson.getExploitDateId());
    }

    if (
      exploitDateRepository.findAllByRfiId(rfi.getId()).stream()
        .noneMatch(exploitDate -> exploitDate.getExploitDate().equals(newExploitDate.getExploitDate()))
    ) {

      if (exploitDateRepository.findById(exploitDateJson.getExploitDateId()).isPresent()) {
        ExploitDate oldDate = exploitDateRepository.findById(exploitDateJson.getExploitDateId()).get();

        if (oldDate.getDeleted() == null) {
          metricsService.addChangeExploitDate(exploitDateJson);
          exploitDateRepository.save(newExploitDate);
        } else {
          metricsService.addUndoExploitDateDelete(exploitDateJson.getExploitDateId());
          List<Target> targets = targetRepository
            .findAllByExploitDateIdAndDeletedIsNotNull(exploitDateJson.getExploitDateId());
          for (Target target : targets) {
            target.setDeleted(null);
          }
          targetRepository.saveAll(targets);
          oldDate.setDeleted(null);
          exploitDateRepository.save(oldDate);
        }
      } else {
        exploitDateRepository.save(newExploitDate);
        long lastExploitDateId =
          exploitDateRepository.findAll().get(exploitDateRepository.findAll().size() - 1).getId();
        metricsService.addCreateExploitDate(lastExploitDateId, exploitDateJson);
      }
    }
    return exploitDateRepository.findAllByRfiId(rfi.getId());
  }

  public List<TargetGet> setDeletedTarget(long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      Target target = targetRepository.findById(targetId).get();

      target.setDeleted(new Timestamp(new Date().getTime()));

      targetRepository.save(target);

      metricsService.addDeleteTarget(targetId);

      ixnService.assignTracks(target.getRfiId(), target.getName());

      return this.getTargets(target.getRfiId());
    } else {
      log.error("Error deleting target: could not find target with id " + targetId);
      return new ArrayList<>();
    }
  }

  public List<TargetGet> setDeletedTargets(List<TargetJson> targets, String userName) {
    Timestamp now = new Timestamp(new Date().getTime());
    for (TargetJson target : targets) {
      Target toDelete = targetRepository
        .findByRfiIdAndExploitDateIdAndMgrs(target.getRfiId(), target.getExploitDateId(), target.getMgrs());
      if (toDelete != null) {
        toDelete.setDeleted(now);
        targetRepository.save(toDelete);
        this.metricsService.addUndoTargetCreate(toDelete.getId(), userName);
        ixnService.assignTracks(target.getRfiId(), toDelete.getName());
      } else {
        log.error(
          "Error deleting target: could not find target with MGRS " + target.getMgrs() + " and exploit date id " +
            target.getExploitDateId());
      }
    }
    return this.getTargets(targets.get(0).getRfiId());
  }

  public void deleteTarget(long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      List<Ixn> ixns = ixnRepository.findAllByTargetId(targetId);
      List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
      ixnRepository.deleteAll(ixns);
      segmentRepository.deleteAll(segments);

      targetRepository.deleteById(targetId);
    } else {
      log.error("Error deleting target: Could not find target by id " + targetId);
    }
  }

  public List<ExploitDate> setDeletedExploitDate(long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        setDeletedTarget(target.getId());
        ixnService.assignTracks(target.getRfiId(), target.getName());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      metricsService.addDeleteExploitDate(exploitDateId);
      ExploitDate exploitDate = exploitDateRepository.findById(exploitDateId).get();
      exploitDate.setDeleted(new Timestamp(new Date().getTime()));
      exploitDateRepository.save(exploitDate);
      return this.getExploitDates(exploitDate.getRfiId());
    } else {
      log.error("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
      return new ArrayList<>();
    }
  }

  public void deleteExploitDate(long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        deleteTarget(target.getId());
        ixnService.assignTracks(target.getRfiId(), target.getName());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      metricsService.addDeleteExploitDate(exploitDateId);
      exploitDateRepository.deleteById(exploitDateId);
    } else {
      log.error("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
    }
  }

  private void addTarget(TargetJson targetJson, String userName, Boolean isCopy) {
    long exploitDateId = targetJson.getExploitDateId();

    Target duplicate = targetRepository.findByRfiIdAndExploitDateIdAndMgrs(targetJson.getRfiId(), exploitDateId,
      targetJson.getMgrs());
    if (duplicate == null) {
      Target target = this.assignOrGenerateName(targetJson);

      targetRepository.save(target);

      //Metrics
      if (rfiRepository.findById(targetJson.getRfiId()).isPresent()) {
        if (exploitDateRepository.findById(exploitDateId).isPresent()) {
          long lastTargetId = targetRepository.findAll().get(targetRepository.findAll().size() - 1).getId();

          metricsService.addCreateTarget(lastTargetId, targetJson, target.getName(), userName, isCopy);
        } else {
          log.error("Error finding exploit date by id: " + exploitDateId);
        }
      } else {
        log.error("Error finding rfi by id: " + targetJson.getRfiId());
      }
    }
  }

  private void editTarget(TargetJson targetJson, String userName) {
    if (targetRepository.findById(targetJson.getTargetId()).isPresent()) {
      long exploitDateId = targetRepository.findById(targetJson.getTargetId()).get().getExploitDateId();
      if (exploitDateRepository.findById(exploitDateId).isPresent()) {
        Target targetWithSameMgrsAsJson = targetRepository.findByRfiIdAndExploitDateIdAndMgrs(targetJson.getRfiId(),
          targetJson.getExploitDateId(), targetJson.getMgrs());

        if (targetWithSameMgrsAsJson != null && targetWithSameMgrsAsJson.getId() != targetJson.getTargetId()) {
          return; //mgrs conflict, do nothing
        }

        Target oldTarget = targetRepository.findById(targetJson.getTargetId()).get();
        String oldName = oldTarget.getName();
        Target newTarget = this.assignOrGenerateName(targetJson);

        if (oldTarget.getDeleted() != null) {
          this.metricsService.addUndoTargetDelete(oldTarget.getId());
          newTarget.setDeleted(null);
        } else {
          this.metricsService.addChangeTarget(oldTarget, targetJson, userName);
        }

        targetRepository.save(newTarget);

        if (!oldName.equals(newTarget.getName())) {
          ixnService.assignTracks(oldTarget.getRfiId(), oldName);
          ixnService.assignTracks(newTarget.getRfiId(), newTarget.getName());
        }

      } else {
        log.error("Error updating target: Could not find exploit date by id " + exploitDateId);
      }

    } else {
      log.error("Error updating target: Could not find target by id " + targetJson.getTargetId());
    }
  }

  private Target assignOrGenerateName(TargetJson targetJson) {
    String newTargetNameString;

    TargetName targetName = targetNameRepository.findByMgrs(targetJson.getMgrs());
    if (targetName == null) {
      DateFormat twoDigitYear = new SimpleDateFormat("yy");
      String currentYear = twoDigitYear.format(new Date());

      if (targetNameRepository.findAll().size() == 0) {
        newTargetNameString = currentYear + "-0001";
      } else {
        String lastNameFromDatabase =
          targetNameRepository.findAll().get(targetNameRepository.findAll().size() - 1).getName();
        int lastNameNumber = Integer.parseInt(lastNameFromDatabase.substring(3));

        newTargetNameString = currentYear + "-" + StringUtils.leftPad(String.valueOf(lastNameNumber + 1), 4, '0');
      }

      targetNameRepository.save(new TargetName(targetJson.getMgrs(), newTargetNameString));
    } else {
      newTargetNameString = targetName.getName();
    }
    return new Target(targetJson, newTargetNameString);
  }

  public List<Target> getDeletedTargets() {
    return targetRepository.findAllByDeletedIsNotNull();
  }

  public List<ExploitDate> getDeletedExploitDates() {
    return exploitDateRepository.findAllByDeletedIsNotNull();
  }

  public long findNumByRfiId(long rfiId) {
    return targetRepository.findAllByRfiId(rfiId).size();
  }

  public void saveGetsTarget(Target target, Timestamp timestamp) {
    targetRepository.save(target);
    metricsService.addCreateTargetFromGets(target, timestamp);
  }
}
