ALTER TABLE data_ixn
    ADD track_analyst TEXT,
    ADD status        TEXT,
    ADD lead_checker  TEXT,
    ADD final_checker TEXT;

UPDATE data_ixn
    SET status = 'NOT_STARTED';

ALTER TABLE metric_change_target
    CHANGE target_id data_id INT;

create table metric_change_ixn
(
    id        INT AUTO_INCREMENT,
    data_id   INT,
    timestamp DATETIME,
    field     TEXT,
    old_data  TEXT,
    new_data  TEXT,
    primary key (id)
)
