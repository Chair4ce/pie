package redv.magpie.login;

import redv.magpie.metrics.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(LoginController.URI)
public class LoginController {
  public static final String URI = "/api/login";
  private MetricsService metricsService;
  private UserRepository userRepository;

  @Autowired
  public LoginController(MetricsService metricsService, UserRepository userRepository) {
    this.metricsService = metricsService;
    this.userRepository = userRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostMapping
  public ResponseEntity<String> login(@Valid @RequestBody String userName) {
    if (userRepository.findByUserName(userName.toLowerCase()) != null) {
      metricsService.addLoginMetric(userName.toLowerCase());
      return new ResponseEntity<>("", HttpStatus.OK);
    }
    return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
  }

  @PostMapping(path = "/register")
  public ResponseEntity<String> registerNewUser(@Valid @RequestBody String userName) {
    if (userRepository.findByUserName(userName.toLowerCase()) != null) {
      return new ResponseEntity<>("", HttpStatus.CONFLICT);
    }
    userRepository.save(new User(userName));
    metricsService.addLoginMetric(userName.toLowerCase());
    return new ResponseEntity<>("", HttpStatus.CREATED);
  }
}
