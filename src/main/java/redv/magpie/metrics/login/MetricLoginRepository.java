package redv.magpie.metrics.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface MetricLoginRepository extends JpaRepository<MetricLogin, Long> {
  @Query("SELECT DISTINCT login.userName FROM MetricLogin login WHERE login.timestamp BETWEEN ?1 AND ?2")
  List<MetricLogin> findAllUniqueLoginsBetween(Timestamp start, Timestamp end);
}
