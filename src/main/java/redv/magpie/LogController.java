package redv.magpie;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping(LogController.URI)
public class LogController {
  public static final String URI = "/api/logs";

  //Use request parameters to fetch archived logs. Enter the date in yyyy-MM-dd format. The logs roll over to a new file
  //once they hit 10MB, so you may need to use the number parameter to pull all the logs for that day (they increment
  //starting from 0.
  @GetMapping
  public ResponseEntity<Resource> download(@RequestParam(name = "date", defaultValue = "") String date,
                                           @RequestParam(name = "number", defaultValue = "0") String number) {
    File log;
    InputStreamResource logResource;

    try {
      if (date.equals("")) {
        log = new File("logs/magpie.log");
      } else {
        log = new File("logs/archived/magpie-" + date + "." + number + ".log");
      }

      logResource = new InputStreamResource(new FileInputStream(log));
    } catch (IOException e) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND, "Log not found: logs/archived/magpie-" + date + "." + number + ".log"
      );
    }

    return ResponseEntity.ok()
      .contentLength(log.length())
      .contentType(MediaType.parseMediaType("application/octet-stream"))
      .body(logResource);
  }
}
