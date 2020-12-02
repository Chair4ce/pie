package redv.magpie.tgts;

import redv.magpie.tgts.exploitDates.ExploitDate;
import redv.magpie.tgts.exploitDates.ExploitDateJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(TargetController.URI)
public class TargetController {
  public static final String URI = "/api/targets";

  TargetService targetService;

  @Autowired
  public TargetController(TargetService targetService) {
    this.targetService = targetService;
  }

  @Autowired
  public void setTargetService(TargetService targetService) {
    this.targetService = targetService;
  }

  @GetMapping
  public List<TargetGet> getTargets(@RequestParam(value = "rfiId") long rfiId) {
    return targetService.getTargets(rfiId);
  }

  @GetMapping(path = "/dates")
  public List<ExploitDate> getExploitDates(@RequestParam(value = "rfiId") long rfiId) {
    return targetService.getExploitDates(rfiId);
  }

  @PostMapping(path = "/post")
  public void postTarget(@Valid @RequestBody List<TargetJson> targetJsons,
                         @RequestParam(name = "userName", defaultValue = "") String userName,
                         @RequestParam(name = "isCopy", defaultValue = "false") String isCopyString) {
    boolean isCopy = false;
    if (isCopyString.equals("true")) {
      isCopy = true;
    }
    targetService.postTarget(targetJsons, userName, isCopy);
  }

  @PostMapping(path = "/dates/post")
  public long postExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {
    List<ExploitDate> exploitDates = targetService.postExploitDate(exploitDateJson);
    ExploitDate newestDate = exploitDates.get(0);
    for (ExploitDate exploitDate : exploitDates) {
      if (exploitDate.getId() > newestDate.getId()) {
        newestDate = exploitDate;
      }
    }
    return newestDate.getId();
  }

  @DeleteMapping(path = "/delete")
  public List<TargetGet> deleteTarget(@RequestParam("targetId") long targetId) {
    return targetService.setDeletedTarget(targetId);
  }

  @DeleteMapping(path = "/delete-targets")
  public List<TargetGet> deleteTargets(@Valid @RequestBody List<TargetJson> targets,
                                    @RequestParam(name = "userName", defaultValue = "") String userName) {
    return targetService.setDeletedTargets(targets, userName);
  }

  @DeleteMapping(path = "/dates/delete")
  public List<ExploitDate> deleteExploitDate(@RequestParam("exploitDateId") long exploitDateId) {
    return targetService.setDeletedExploitDate(exploitDateId);
  }
}
