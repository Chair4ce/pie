package redv.magpie.metrics.undo.targetDelete;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricUndoTargetDeleteRepository extends JpaRepository<MetricUndoTargetDelete, Long> {
}
