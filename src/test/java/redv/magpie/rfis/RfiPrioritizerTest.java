package redv.magpie.rfis;

import org.junit.Test;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.*;

public class RfiPrioritizerTest {
  final RandomRfi randomRfi = new RandomRfi();

  @Test
  public void prioritizesOpenRfis() {
    Rfi rfi1 = randomRfi.setRfiId("1").setLastUpdate(new Date(12345)).setStatus("OPEN").setPriority(1).toRfi();
    Rfi rfi2 = randomRfi.setRfiId("2").setLastUpdate(new Date(22345)).setStatus("OPEN").toRfi();
    Rfi rfi3 = randomRfi.setRfiId("3").setLastUpdate(new Date(32345)).setStatus("OPEN").toRfi();
    Rfi rfi4 = randomRfi.setRfiId("4").setLastUpdate(new Date(42345)).setStatus("OPEN").toRfi();
    Rfi rfi5 = randomRfi.setRfiId("5").setLastUpdate(new Date(52345)).setStatus("OPEN").toRfi();
    Rfi rfi6 = randomRfi.setRfiId("6").setLastUpdate(new Date(62345)).setStatus("CLOSED").toRfi();
    Rfi rfi7 = randomRfi.setRfiId("7").setLastUpdate(new Date(72345)).setStatus("NEW").toRfi();

    List<Rfi> rfis = Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6, rfi7);
    RfiPrioritizer.prioritize(rfis);

    assertEquals(-1, rfi7.getPriority());
    assertEquals(-1, rfi6.getPriority());
    assertEquals(1, rfi1.getPriority());
    assertThat(rfi2.getPriority(), greaterThan(-1));
    assertThat(rfi3.getPriority(), greaterThan(-1));
    assertThat(rfi4.getPriority(), greaterThan(-1));
    assertThat(rfi5.getPriority(), greaterThan(-1));
  }
}
