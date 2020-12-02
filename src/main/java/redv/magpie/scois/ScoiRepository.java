package redv.magpie.scois;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoiRepository extends JpaRepository<Scoi, Long> {
  Scoi findByName(String name);
}
