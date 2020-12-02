package redv.magpie.tgts;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class TargetTest {

  @Test
  public void compareReturnsFieldsThatAreDifferent() {
    Target target1 = new Target(
      1, 1, 1,
      "SDT20-123",
      "12QWE1231231231",
      "Notes",
      "Description",
      TargetStatus.NOT_STARTED,
      "",
      "",
      null
    );

    TargetJson target2 = new TargetJson(
      1, 1,
      "12QWE1231231231",
      "Notes",
      "Description"
    );

    String[] expected = {};
    assertArrayEquals(expected, target1.compare(target2).toArray());


    target2 = new TargetJson(
      1, 1,
      "12QWE1231231231",
      "New Notes",
      "New Description"
    );

    expected = new String[]{"notes", "description"};
    assertArrayEquals(expected, target1.compare(target2).toArray());

    target2 = new TargetJson(
      1, 1,
      "12QWE1231231232",
      "",
      ""
    );

    expected = new String[]{"mgrs", "notes", "description"};
    assertArrayEquals(expected, target1.compare(target2).toArray());
  }
}
