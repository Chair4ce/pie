package redv.magpie.products;

import redv.magpie.metrics.MetricsService;
import redv.magpie.metrics.delete.product.MetricDeleteProductRepository;
import redv.magpie.metrics.undo.productDelete.MetricUndoProductDeleteRepository;
import redv.magpie.rfis.RfiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

@RestController
@RequestMapping(ProductController.URI)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@Slf4j
public class ProductController {
  public static final String URI = "/api/product";

  ProductRepository productRepository;
  RfiRepository rfiRepository;
  MetricDeleteProductRepository metricDeleteProductRepository;
  MetricUndoProductDeleteRepository metricUndoProductDeleteRepository;
  ProductService productService;
  MetricsService metricsService;

  @Autowired
  public void setProductRepository(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setMetricDeleteProductRepository(
    MetricDeleteProductRepository metricDeleteProductRepository) {
    this.metricDeleteProductRepository = metricDeleteProductRepository;
  }

  @Autowired
  public void setMetricUndoProductDeleteRepository(
    MetricUndoProductDeleteRepository metricUndoProductDeleteRepository) {
    this.metricUndoProductDeleteRepository = metricUndoProductDeleteRepository;
  }

  @Autowired
  public void setProductService(ProductService productService) {
    this.productService = productService;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @PostMapping
  public ResponseEntity<Void> uploadNewFile(@NotNull @RequestParam("file") MultipartFile multipartFile,
                                            @RequestParam(value = "rfiId", defaultValue = "") String rfiId,
                                            @RequestParam(value = "userName", defaultValue = "") String userName)
    throws IOException {
    return productService.uploadNewFile(multipartFile, rfiId, userName);
  }

  @PostMapping(path = "/undo-delete")
  public void undoDeleteProduct(@NotNull @RequestParam("rfiId") long rfiId, @RequestParam("userName") String userName) {
    productService.undoDeleteProduct(rfiId, userName);
  }

  @GetMapping
  public ResponseEntity<byte[]> downloadProduct(@RequestParam(value = "rfiId", defaultValue = "-1") long rfiId,
                                                @RequestParam(value = "userName", defaultValue = "") String userName) {
    return productService.downloadProduct(rfiId, userName);
  }

  @DeleteMapping(path = "/delete")
  public void deleteProduct(@NotNull @RequestParam("rfiId") long rfiId, @RequestParam("userName") String userName) {
    productService.setDeleteProduct(rfiId, userName);
  }
}
