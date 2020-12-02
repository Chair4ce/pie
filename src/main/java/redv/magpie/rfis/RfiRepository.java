package redv.magpie.rfis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RfiRepository extends JpaRepository<Rfi, Long> {
  Rfi findRfiById(Long id);
  Rfi findByRfiNum(String rfiNum);

  @Query("SELECT rfi FROM Rfi rfi WHERE rfi.status = 'CLOSED' AND rfi.receiveDate IS NOT NULL AND rfi.id > 0")
  List<Rfi> findAllClosedWithDefinedReceiveDate();

  @Query("SELECT rfi FROM Rfi rfi WHERE rfi.status = 'CLOSED' AND rfi.id > 0")
  List<Rfi> findAllClosed();

  @Query("SELECT rfi FROM Rfi rfi WHERE rfi.status = 'OPEN' AND rfi.id > 0")
  List<Rfi> findAllOpen();
}
