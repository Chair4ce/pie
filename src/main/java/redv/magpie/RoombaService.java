package redv.magpie;

import redv.magpie.ixns.IxnService;
import redv.magpie.ixns.Segment;
import redv.magpie.products.Product;
import redv.magpie.products.ProductService;
import redv.magpie.tgts.Target;
import redv.magpie.tgts.TargetService;
import redv.magpie.tgts.exploitDates.ExploitDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class RoombaService {
  public static final long TIME_DELAY_IN_MS = 86400000L;

  IxnService ixnService;
  ProductService productService;
  TargetService targetService;

  @Autowired
  public RoombaService(IxnService ixnService, ProductService productService, TargetService targetService) {
    this.ixnService = ixnService;
    this.productService = productService;
    this.targetService = targetService;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @Autowired
  public void setTargetService(TargetService targetService) {
    this.targetService = targetService;
  }

  @Autowired
  public void setProductService(ProductService productService) {
    this.productService = productService;
  }

  @Scheduled(fixedDelay = TIME_DELAY_IN_MS)
  public void clean() {
    Timestamp deleteCutoff = new Timestamp(new Date().getTime() - RoombaService.TIME_DELAY_IN_MS);

    List<ExploitDate> exploitDates = targetService.getDeletedExploitDates();
    List<Target> targets = targetService.getDeletedTargets();
    List<Segment> segments = ixnService.getDeletedSegments();
    List<Product> products = productService.getDeletedProducts();

    for (ExploitDate exploitDate : exploitDates) {
      if (exploitDate.getDeleted() != null && exploitDate.getDeleted().before(deleteCutoff)) {
        targetService.deleteExploitDate(exploitDate.getId());
      }
    }

    for (Target target : targets) {
      if (target.getDeleted() != null && target.getDeleted().before(deleteCutoff)) {
        targetService.deleteTarget(target.getId());
      }
    }

    for (Segment segment : segments) {
      if (segment.getDeleted() != null && segment.getDeleted().before(deleteCutoff)) {
        ixnService.deleteSegment(segment.getId());
      }
    }

    for (Product product : products) {
      if (product.getDeleted() != null && product.getDeleted().before(deleteCutoff)) {
        productService.deleteProduct(product.getId());
      }
    }
  }
}
