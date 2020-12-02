create table metric_create_ixn
(
    id           INT AUTO_INCREMENT,
    rfi_num      TEXT,
    exploit_date  DATETIME,
    target_name   TEXT,
    segment_start DATETIME,
    segment_end   DATETIME,
    ixn_id       INT,
    timestamp    DATETIME,
    primary key (id)
);