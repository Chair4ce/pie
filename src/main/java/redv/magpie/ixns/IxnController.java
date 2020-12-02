package redv.magpie.ixns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(IxnController.URI)
public class IxnController {
  public static final String URI = "/api/ixn";

  private IxnService ixnService;

  @Autowired
  public IxnController(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @GetMapping(path = "/segment/{targetId}")
  public List<Segment> getSegments(@PathVariable("targetId") long targetId) {
    return ixnService.getSegments(targetId);
  }

  @GetMapping(path = "/{targetId}")
  public List<Ixn> getIxns(@PathVariable("targetId") long targetId) {
    return ixnService.getIxns(targetId);
  }

  @PostMapping(path = "/check-renumber")
  public boolean checkRenumber(@Valid @RequestBody IxnJson ixnJson) {
    Ixn ixn = new Ixn(ixnJson);
    ixn.setId(ixnJson.getId());
    return ixnService.checkRenumber(ixn);
  }

  @PostMapping(path = "/segment/post")
  public Segment postSegment(@Valid @RequestBody SegmentJson segmentJson) {
    return ixnService.postSegment(segmentJson);
  }

  @PostMapping(path = "/post")
  public void postIxn(@Valid @RequestBody IxnJson ixnJson, @RequestParam(name="userName", defaultValue = "") String userName) {
    ixnService.postIxn(ixnJson, userName);
  }

  @DeleteMapping(path = "/{ixnId}")
  public void deleteIxn(@PathVariable("ixnId") long ixnId) {
    ixnService.deleteIxn(ixnId);
  }

  @DeleteMapping(path = "/segment/{segmentId}")
  public void deleteSegment(@PathVariable("segmentId") long segmentId) {
    ixnService.setDeletedSegment(segmentId);
  }
}
