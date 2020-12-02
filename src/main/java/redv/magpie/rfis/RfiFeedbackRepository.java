package redv.magpie.rfis;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RfiFeedbackRepository extends JpaRepository<RfiFeedback, Long> {
  RfiFeedback findByRfiNum(String rfiNum);
}
