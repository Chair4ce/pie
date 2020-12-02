package redv.magpie.ixns;

import redv.magpie.metrics.MetricsService;
import redv.magpie.tgts.Target;
import redv.magpie.tgts.TargetRepository;
import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateRepository;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
public class IxnService {
  private MetricsService metricsService;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;

  @Autowired
  public IxnService(MetricsService metricsService,
                    ExploitDateRepository exploitDateRepository,
                    TargetRepository targetRepository,
                    SegmentRepository segmentRepository,
                    IxnRepository ixnRepository) {
    this.metricsService = metricsService;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
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

  public List<Segment> getSegments(long targetId) {
    return segmentRepository.findAllByTargetId(targetId)
      .stream().filter(segment -> segment.getDeleted() == null)
      .sorted(Comparator.comparing(Segment::getStartTime))
      .collect(Collectors.toList());
  }

  public List<Ixn> getIxns(long targetId) {
    return ixnRepository.findAllByTargetId(targetId)
      .stream().filter(ixn -> segmentRepository.findByIdAndDeletedIsNull(ixn.getSegmentId()) != null)
      .sorted((Comparator.comparing(Ixn::getTime)))
      .collect(Collectors.toList());
  }

  public Segment postSegment(SegmentJson segmentJson) {
    Segment newSegment = new Segment(segmentJson);

    if (segmentJson.getId() > 0) {
      newSegment.setId(segmentJson.getId());
    }

    if (segmentJson.getId() > 0) {
      if (segmentRepository.findById(segmentJson.getId()).isPresent()) {
        Segment oldSegment = segmentRepository.findById(segmentJson.getId()).get();

        if (oldSegment.getDeleted() != null) {
          this.metricsService.addUndoSegmentDelete(oldSegment.getId());
          newSegment.setDeleted(null);
        } else {
          this.metricsService.addChangeSegment(segmentJson);
        }

        segmentRepository.save(newSegment);
      } else {
        log.error("Error editing segment: could not find segment with id " + segmentJson.getId());
      }
    } else {
      segmentRepository.save(newSegment);
      long lastSegmentId = segmentRepository.findAll().get(segmentRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateSegment(lastSegmentId, segmentJson);
    }

    if (segmentJson.getId() <= 0) {
      return segmentRepository.findAll().get(segmentRepository.findAll().size() - 1);
    }
    return new Segment();
  }

  public void postIxn(IxnJson ixnJson, String userName) {
    Ixn ixn = new Ixn(ixnJson);

    if (ixnJson.getId() > 0) {
      ixn.setId(ixnJson.getId());
      if (ixnRepository.findById(ixnJson.getId()).isPresent()) {
        this.metricsService.addChangeIxn(ixnJson, ixnRepository.findById(ixnJson.getId()).get(), userName);
      } else {
        this.metricsService.addUndoIxnDelete(ixnJson.getId());
      }
      ixnRepository.save(ixn);
    } else {
      ixnRepository.save(ixn);
      long lastIxnId = ixnRepository.findAll().get(ixnRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateIxn(lastIxnId, ixnJson, userName);
    }

    if (targetRepository.findById(ixnJson.getTargetId()).isPresent()) {
      assignTracks(ixnJson.getRfiId(), targetRepository.findById(ixnJson.getTargetId()).get().getName());
    }
  }

  public void deleteIxn(long ixnId) {
    if (ixnRepository.findById(ixnId).isPresent()) {
      Ixn ixn = ixnRepository.findById(ixnId).get();
      ixnRepository.deleteById(ixnId);

      metricsService.addDeleteIxn(ixnId);

      if (targetRepository.findById(ixn.getTargetId()).isPresent()) {
        assignTracks(ixn.getRfiId(), targetRepository.findById(ixn.getTargetId()).get().getName());
      }
    } else {
      log.error("Could not find ixn to delete with id " + ixnId);
    }
  }

  public void deleteSegment(long segmentId) {
    if (segmentRepository.findById(segmentId).isPresent()) {
      List<Ixn> ixns = ixnRepository.findAllBySegmentId(segmentId);
      ixnRepository.deleteAll(ixns);
      segmentRepository.deleteById(segmentId);
    } else {
      log.error("Error deleting segment: could not find segment with id " + segmentId);
    }
  }

  public void setDeletedSegment(long segmentId) {
    if (segmentRepository.findById(segmentId).isPresent()) {
      Segment segment = segmentRepository.findById(segmentId).get();

      boolean hadIxns = !ixnRepository.findAllBySegmentId(segmentId).isEmpty();

      segment.setDeleted(new Timestamp(new Date().getTime()));

      segmentRepository.save(segment);

      this.metricsService.addDeleteSegment(segmentId, hadIxns);

      if (targetRepository.findById(segment.getTargetId()).isPresent()) {
        assignTracks(segment.getRfiId(), targetRepository.findById(segment.getTargetId()).get().getName());
      }
    } else {
      log.error("Error deleting segment: could not find segment with id " + segmentId);
    }
  }

  public void assignTracks(long rfiId, String targetName) {
    List<Target> targets = targetRepository.findAllByRfiIdAndNameWithExploitDate(rfiId, targetName);
    List<Ixn> ixns = new ArrayList<>();

    sortTargetsByExploitDate(targets);

    for (Target target : targets) {
      List<Ixn> targetIxns = ixnRepository.findAllInProgressOrCompleteByTargetId(target.getId())
        .stream().filter(ixn -> segmentRepository.findByIdAndDeletedIsNull(ixn.getSegmentId()) != null)
        .sorted((Comparator.comparing(Ixn::getTime)))
        .collect(Collectors.toList());
      ixns.addAll(targetIxns);
    }

    List<String> renamings = new ArrayList<>();

    int trackNum = 1;
    for (Ixn ixnWithTrackIdToUpdate : ixns) {
      String newTrackId = targetName.substring(3) + "-" + StringUtils.leftPad(String.valueOf(trackNum), 3, '0');
      String oldTrackId = ixnWithTrackIdToUpdate.getTrack();
      ixnWithTrackIdToUpdate.setTrack(newTrackId);
      if (!oldTrackId.equals(newTrackId) && !oldTrackId.isEmpty()) {
        renamings.add(oldTrackId);
        renamings.add(newTrackId);
      }

      trackNum++;
    }
    parseTrackNarrativeUpdates(ixns, renamings);

    ixnRepository.saveAll(ixns);
  }

  private void sortTargetsByExploitDate(List<Target> targets) {
    targets.sort((target1, target2) -> {
      if (exploitDateRepository.findById(target1.getExploitDateId()).isPresent() &&
        exploitDateRepository.findById(target2.getExploitDateId()).isPresent()
      ) {
        ExploitDate date1 = exploitDateRepository.findById(target1.getExploitDateId()).get();
        ExploitDate date2 = exploitDateRepository.findById(target2.getExploitDateId()).get();
        return date1.getExploitDate().compareTo(date2.getExploitDate());
      }
      return 0;
    });
  }

  private void parseTrackNarrativeUpdates(List<Ixn> ixns, List<String> renamings) {
    for (Ixn ixnWithNarrativeToUpdate : ixns) {
      String newNarrative = ixnWithNarrativeToUpdate.getTrackNarrative();
      if (!renamings.isEmpty() &&
        Integer.parseInt(renamings.get(0).replace("-", "")) < Integer.parseInt(renamings.get(1).replace("-", ""))
        && ixnWithNarrativeToUpdate.getTrackNarrative() != null &&
        !ixnWithNarrativeToUpdate.getTrackNarrative().equals("")) {

        for (int i = renamings.size() - 2; i >= 0; i -= 2) {
          log.info(renamings.get(i) + " -> " + renamings.get(i + 1));
          newNarrative = newNarrative.replaceAll(Pattern.quote(renamings.get(i)), renamings.get(i + 1));
        }
      } else {
        for (int i = 0; i < renamings.size(); i += 2) {
          newNarrative = newNarrative.replaceAll(Pattern.quote(renamings.get(i)), renamings.get(i + 1));
        }
      }
      ixnWithNarrativeToUpdate.setTrackNarrative(newNarrative);
    }
  }

  public List<Segment> getDeletedSegments() {
    return segmentRepository.findAllByDeletedIsNotNull();
  }

  public long findNumByRfiId(long rfiId) {
    return ixnRepository.findAllByRfiId(rfiId).stream()
      .filter(ixn -> segmentRepository.findByIdAndDeletedIsNull(ixn.getSegmentId()) != null)
      .filter(ixn -> targetRepository.findByIdAndDeletedIsNull(ixn.getTargetId()) != null)
      .count();
  }

  public boolean checkRenumber(Ixn newIxn) {
    try {
      String targetName = targetRepository.findById(newIxn.getTargetId()).get().getName();
      List<Target> targets = targetRepository.findAllByRfiIdAndNameWithExploitDate(newIxn.getRfiId(), targetName);
      List<Ixn> ixns = new ArrayList<>();

      sortTargetsByExploitDate(targets);

      for (Target target : targets) {
        List<Ixn> targetIxns = ixnRepository.findAllInProgressOrCompleteByTargetId(target.getId())
          .stream().filter(ixn -> segmentRepository.findById(ixn.getSegmentId()).get().getDeleted() == null)
          .sorted((Comparator.comparing(Ixn::getTime)))
          .collect(Collectors.toList());
        ixns.addAll(targetIxns);
      }

      if (ixns.isEmpty()) {
        return false;
      }

      //If the new IXN is at the end, return false, otherwise return true
      if (newIxn.getStatus().equals(IxnStatus.DOES_NOT_MEET_EEI)) {
        //Removing a track
        return ixns.get(ixns.size() - 1).getId() != newIxn.getId();
      } else {
        //Adding a track
        Ixn lastIxn = ixns.get(ixns.size() - 1);
        long lastIxnDate =
          exploitDateRepository.findById(lastIxn.getExploitDateId()).get().getExploitDate().getTime()
            +
            lastIxn.getTime().getTime();
        long newIxnDate =
          exploitDateRepository.findById(newIxn.getExploitDateId()).get().getExploitDate().getTime()
            +
            newIxn.getTime().getTime();
        return newIxnDate < lastIxnDate;
      }
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  public boolean rfiContainsRejectedTracks(long rfiId) {
    List<Ixn> rejectedIxns = ixnRepository.findAllRejectedByRfiId(rfiId);
    for (Ixn ixn : rejectedIxns) {
      if (segmentRepository.findByIdAndDeletedIsNull(ixn.getSegmentId()) != null
        && targetRepository.findByIdAndDeletedIsNull(ixn.getTargetId()) != null
        && exploitDateRepository.findByIdAndDeletedIsNull(ixn.getExploitDateId()) != null
      ) {
        return true;
      }
    }
    return false;
  }

  public boolean targetContainsRejectedTracks(long targetId) {
    List<Ixn> rejectedIxns = ixnRepository.findAllRejectedByTargetId(targetId);
    for (Ixn ixn : rejectedIxns) {
      if (segmentRepository.findByIdAndDeletedIsNull(ixn.getSegmentId()) != null
      ) {
        return true;
      }
    }
    return false;
  }

  public boolean allTracksAreComplete(long rfiId) {
    List<Ixn> allIxnsForRfi = ixnRepository.findAllByRfiId(rfiId);

    for (Ixn ixn : allIxnsForRfi) {
      if (!ixn.getStatus().equals(IxnStatus.COMPLETED)) {
        return false;
      }
    }

    return true;
  }

}
