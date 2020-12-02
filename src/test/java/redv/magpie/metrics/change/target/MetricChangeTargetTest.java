package redv.magpie.metrics.change.target;

import redv.magpie.tgts.TargetJson;
import org.junit.Test;

import java.sql.Timestamp;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class MetricChangeTargetTest {
  @Test
  public void createsMetricsBasedOnField() throws Exception {
    TargetJson target2 = new TargetJson(
      1, 1,
      "12QWE1231231230",
      "New Notes",
      "New Description"
    );

    Timestamp now = new Timestamp(new Date().getTime());

    MetricChangeTarget metric2 = new MetricChangeTarget("mgrs", target2, now, "billy.bob.joe");
    MetricChangeTarget metric3 = new MetricChangeTarget("notes", target2, now, "billy.bob.joe");
    MetricChangeTarget metric4 = new MetricChangeTarget("description", target2, now, "billy.bob.joe");

    assertEquals("mgrs", metric2.getField());
    assertEquals("12QWE1231231230", metric2.getNewData());

    assertEquals("notes", metric3.getField());
    assertEquals("New Notes", metric3.getNewData());

    assertEquals("description", metric4.getField());
    assertEquals("New Description", metric4.getNewData());
  }

}
