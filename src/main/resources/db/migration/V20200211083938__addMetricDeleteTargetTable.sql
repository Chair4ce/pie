create table metric_delete_target
(
    id           INT AUTO_INCREMENT,
    rfi_num      TEXT,
    exploit_date DATETIME,
    target_name  TEXT,
    timestamp    DATETIME,
    primary key (id)
)
