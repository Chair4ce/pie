package redv.magpie.rfis;

import org.junit.Test;
import java.util.*;

public class RfiTest {
  final RandomRfi randomRfi = new RandomRfi();

  @Test
  public void canSortByDescendingDate() {
    Rfi rfiOld = randomRfi.setLastUpdate(new Date(123456789)).toRfi();
    Rfi rfiMiddle = randomRfi.setLastUpdate(new Date(345678912)).toRfi();
    Rfi rfiNew = randomRfi.setLastUpdate(new Date(567891234)).toRfi();

    List<Rfi> rfiList = Arrays.asList(rfiMiddle, rfiOld, rfiNew);
    rfiList.sort(new SortByRecentFirst());

    assert(rfiList.get(0).equals(rfiNew));
    assert(rfiList.get(1).equals(rfiMiddle));
    assert(rfiList.get(2).equals(rfiOld));
  }

  @Test
  public void sortByPriority() {
    Rfi rfiFirst = randomRfi.setPriority(1).toRfi();
    Rfi rfiSecond = randomRfi.setPriority(2).toRfi();
    Rfi rfiThird = randomRfi.setPriority(3).toRfi();

    List<Rfi> rfiList = Arrays.asList(rfiSecond, rfiThird, rfiFirst);
    rfiList.sort(new SortByAscendingPriority());

    assert(rfiList.get(0).equals(rfiFirst));
    assert(rfiList.get(1).equals(rfiSecond));
    assert(rfiList.get(2).equals(rfiThird));
  }
}
