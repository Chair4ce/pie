create table metric_undo_target_create
(
    id            INT AUTO_INCREMENT,
    target_id     INT,
    user_name     TEXT,
    timestamp     DATETIME,
    primary key (id)
);
