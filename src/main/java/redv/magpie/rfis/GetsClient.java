package redv.magpie.rfis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class GetsClient {
  @Value("${GETS_REQUEST_TIME_FRAME_IN_DAYS}")
  private int requestDays;

  public static String calculateDateStringDaysBeforeNow(int days) {
    DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyyMMdd");
    LocalDate localDate = LocalDate.now().minusDays(days);
    return dateFormat.format(localDate);
  }

  public Document rfiResponseDocument(String uri) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);

    DocumentBuilder db = dbf.newDocumentBuilder();
    InputStream stream;
    if (uri.contains("xml")) {
      stream = new ClassPathResource(uri).getInputStream();
    } else {
      if (uri.contains("CLOSED")) {
        uri += calculateDateStringDaysBeforeNow(requestDays);
      }
      stream = new URL(uri).openStream();
    }
    log.trace("Fetching from: " + uri);
    return db.parse(stream);
  }
}
