package redv.magpie.products;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.metrics.delete.product.MetricDeleteProduct;
import redv.magpie.metrics.delete.product.MetricDeleteProductRepository;
import redv.magpie.metrics.downloadProduct.MetricDownloadProduct;
import redv.magpie.metrics.downloadProduct.MetricDownloadProductRepository;
import redv.magpie.metrics.undo.productDelete.MetricUndoProductDelete;
import redv.magpie.metrics.undo.productDelete.MetricUndoProductDeleteRepository;
import redv.magpie.metrics.uploadProduct.MetricUploadProductRepository;
import redv.magpie.rfis.Rfi;
import redv.magpie.rfis.RfiRepository;
import io.restassured.http.ContentType;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.io.File;
import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.*;

@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=",
    "GETS_URI_CLOSED=",
    "GETS_REQUEST_TIME_FRAME_IN_DAYS=20"
  }
)
public class ProductControllerTest extends BaseIntegrationTest {
  RfiRepository rfiRepository;
  ProductRepository productRepository;
  MetricUploadProductRepository metricUploadProductRepository;
  MetricDownloadProductRepository metricDownloadProductRepository;
  MetricDeleteProductRepository metricDeleteProductRepository;
  MetricUndoProductDeleteRepository metricUndoProductDeleteRepository;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setProductRepository(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Autowired
  public void setMetricUploadFileRepository(MetricUploadProductRepository metricUploadProductRepository) {
    this.metricUploadProductRepository = metricUploadProductRepository;
  }

  @Autowired
  public void setMetricUploadProductRepository(
    MetricUploadProductRepository metricUploadProductRepository) {
    this.metricUploadProductRepository = metricUploadProductRepository;
  }

  @Autowired
  public void setMetricDownloadProductRepository(MetricDownloadProductRepository metricDownloadProductRepository) {
    this.metricDownloadProductRepository = metricDownloadProductRepository;
  }

  @Autowired
  public void setMetricDeleteProductRepository(MetricDeleteProductRepository metricDeleteProductRepository) {
    this.metricDeleteProductRepository = metricDeleteProductRepository;
  }

  @Autowired
  public void setMetricUndoProductDeleteRepository(
    MetricUndoProductDeleteRepository metricUndoProductDeleteRepository) {
    this.metricUndoProductDeleteRepository = metricUndoProductDeleteRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    productRepository.deleteAll();
    metricUploadProductRepository.deleteAll();
    metricDownloadProductRepository.deleteAll();
    metricDeleteProductRepository.deleteAll();
    metricUndoProductDeleteRepository.deleteAll();
  }

  @Test
  public void savesUploadsToRepo() {
    Rfi rfi =
      new Rfi("SDT20-0001", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");
    rfiRepository.save(rfi);
    long rfiId = rfiRepository.findByRfiNum("SDT20-0001").getId();

    File file = new File("./src/main/resources/TestFilePleaseIgnore.kml");

    given()
      .port(port)
      .multiPart("file", file)
      .param("name", file.getName())
      .accept(ContentType.JSON)
      .when()
      .post(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    long uploadId = productRepository.findAll().get(0).getId();

    assertEquals(1, metricUploadProductRepository.findAll().size());
    assertEquals("billy.bob.joe", metricUploadProductRepository.findAll().get(0).getUserName());
    assertEquals(rfiId, metricUploadProductRepository.findAll().get(0).getRfiId());
    assertEquals(uploadId, metricUploadProductRepository.findAll().get(0).getUploadId());
    assertEquals(1, productRepository.findAll().size());
    assertEquals("TestFilePleaseIgnore.kml", productRepository.findAll().get(0).getFileName());
    assertEquals(rfiId, productRepository.findAll().get(0).getRfiId());
  }

  @Test
  public void returnsFileFromRepo() {
    Rfi rfi =
      new Rfi("SDT20-0001", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");
    rfiRepository.save(rfi);
    long rfiId = rfiRepository.findByRfiNum("SDT20-0001").getId();

    File file = new File("./src/main/resources/TestFilePleaseIgnore.kml");

    given()
      .port(port)
      .multiPart("file", file)
      .param("name", file.getName())
      .accept(ContentType.JSON)
      .when()
      .post(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    given()
      .port(port)
      .when()
      .get(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(200);

    given()
      .port(port)
      .when()
      .get(ProductController.URI + "?rfiId=" + (rfiId + 1) + "&userName=billy.bob.joe")
      .then()
      .statusCode(404);

    assertEquals(2, metricDownloadProductRepository.findAll().size());

    MetricDownloadProduct metric = metricDownloadProductRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void deletesProducts() {
    Rfi rfi =
      new Rfi("SDT20-0001", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");
    rfiRepository.save(rfi);
    long rfiId = rfiRepository.findByRfiNum("SDT20-0001").getId();

    File file = new File("./src/main/resources/TestFilePleaseIgnore.kml");

    given()
      .port(port)
      .multiPart("file", file)
      .param("name", file.getName())
      .accept(ContentType.JSON)
      .when()
      .post(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    long uploadId = productRepository.findAll().get(0).getId();

    //Delete

    given()
      .port(port)
      .when()
      .delete(ProductController.URI + "/delete?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(200);

    Product product = productRepository.findById(uploadId).get();

    List<Product> deletedProducts = productRepository.findAllByRfiIdAndDeletedIsNotNull(rfiId);

    assertEquals(1, deletedProducts.size());

    assertNotNull(product.getDeleted());

    assertEquals(1, productRepository.findAll().size());

    assertEquals(1, metricDeleteProductRepository.findAll().size());
    MetricDeleteProduct metric1 = metricDeleteProductRepository.findAll().get(0);

    assertEquals("billy.bob.joe", metric1.getUserName());
    assertEquals("SDT20-0001", metric1.getRfiNum());

    //Undo delete

    given()
      .port(port)
      .when()
      .post(ProductController.URI + "/undo-delete?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, productRepository.findAll().size());
    assertEquals("TestFilePleaseIgnore.kml", productRepository.findAll().get(0).getFileName());
    assertEquals(rfiId, productRepository.findAll().get(0).getRfiId());

    assertEquals(1, metricUndoProductDeleteRepository.findAll().size());
    MetricUndoProductDelete metric2 = metricUndoProductDeleteRepository.findAll().get(0);

    assertEquals("billy.bob.joe", metric2.getUserName());
    assertEquals("SDT20-0001", metric2.getRfiNum());

  }
}
