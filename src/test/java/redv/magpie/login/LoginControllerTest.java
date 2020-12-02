package redv.magpie.login;

import redv.magpie.BaseIntegrationTest;
import redv.magpie.metrics.login.MetricLoginRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.*;

public class LoginControllerTest extends BaseIntegrationTest {

  @Autowired
  UserRepository userRepository;
  @Autowired
  MetricLoginRepository metricLoginRepository;

  @Before
  public void clean() {
    userRepository.deleteAll();
    metricLoginRepository.deleteAll();
  }

  @Test
  public void registersNewUsersWithoutDuplicates() {
    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body("billy.bob.joe")
      .when()
      .post(LoginController.URI + "/register")
      .then()
      .statusCode(201);

    assertEquals("billy.bob.joe", userRepository.findAll().get(0).getUserName());
    assertEquals(1, metricLoginRepository.findAll().size());
    assertEquals("billy.bob.joe", metricLoginRepository.findAll().get(0).getUserName());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body("billy.bob.joe")
      .when()
      .post(LoginController.URI + "/register")
      .then()
      .statusCode(409);

    assertEquals(1, userRepository.findAll().size());
  }

  @Test
  public void logsExistingUsersIn() {
    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body("billy.bob.joe")
      .when()
      .post(LoginController.URI)
      .then()
      .statusCode(401);

    assertEquals(0, metricLoginRepository.findAll().size());

    userRepository.save(new User("billy.bob.joe"));

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body("billy.bob.joe")
      .when()
      .post(LoginController.URI)
      .then()
      .statusCode(200);

    assertEquals("billy.bob.joe", metricLoginRepository.findAll().get(0).getUserName());
  }
}
