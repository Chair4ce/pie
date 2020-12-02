create table metric_change_target
(
    id        INT AUTO_INCREMENT,
    target_id INT,
    timestamp DATETIME,
    field     TEXT,
    old_data  TEXT,
    new_data  TEXT,
    primary key (id)
)
