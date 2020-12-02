create table metric_change_segment
(
    id                INT AUTO_INCREMENT,
    rfi_num           TEXT,
    exploit_date      DATETIME,
    target_name       TEXT,
    old_segment_start DATETIME,
    old_segment_end   DATETIME,
    new_segment_start DATETIME,
    new_segment_end   DATETIME,
    timestamp         DATETIME,
    primary key (id)
);

create table metric_delete_segment
(
    id            INT AUTO_INCREMENT,
    rfi_num       TEXT,
    exploit_date  DATETIME,
    target_name   TEXT,
    segment_start DATETIME,
    segment_end   DATETIME,
    had_ixns      BOOL,
    timestamp     DATETIME,
    primary key (id)
);
