package redv.magpie.rfis;

import redv.magpie.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes= Application.class)
@WebMvcTest(RfiController.class)
public class RfiControllerTestMvc {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private RfiController rfiController;

  @Test
  public void getRfisFromFrontEnd() throws Exception {
    String jsonString = "[{" +
      "\"rfiNum\":" + "\"20-005\"," +
      "\"priority\":" + "1" +
      "}]";

    mockMvc.perform(post("/api/rfi/update-priority")
      .contentType(APPLICATION_JSON)
      .content(jsonString))
      .andExpect(status().isOk());
  }
}
