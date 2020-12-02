create table metric_create_exploit_date
(
    id              INT AUTO_INCREMENT,
    rfi_id          INT,
    exploit_date_id INT,
    exploit_date    DATETIME,
    timestamp       DATETIME,
    primary key (id)
);

drop table metric_change_exploit_date;

create table metric_change_exploit_date
(
    id               INT AUTO_INCREMENT,
    exploit_date_id  INT,
    new_exploit_date DATETIME,
    timestamp        DATETIME,
    primary key (id)
);

drop table metric_delete_exploit_date;

create table metric_delete_exploit_date
(
    id              INT AUTO_INCREMENT,
    exploit_date_id INT,
    timestamp       DATETIME,
    primary key (id)
);

drop table metric_create_target;

create table metric_create_target
(
    id              INT AUTO_INCREMENT,
    rfi_id          INT,
    exploit_date_id INT,
    target_id       INT,
    name            TEXT,
    mgrs            TEXT,
    notes           TEXT,
    description     TEXT,
    timestamp       DATETIME,
    primary key (id)
);

alter table metric_change_target
    drop column old_data,
    change data_id target_id INT;

drop table metric_delete_target;

create table metric_delete_target
(
    id        INT AUTO_INCREMENT,
    target_id INT,
    timestamp DATETIME,
    primary key (id)
);

drop table metric_create_segment;

create table metric_create_segment
(
    id              INT AUTO_INCREMENT,
    rfi_id          INT,
    exploit_date_id INT,
    target_id       INT,
    segment_id      INT,
    segment_start   DATETIME,
    segment_end     DATETIME,
    timestamp       DATETIME,
    primary key (id)
);

drop table metric_change_segment;

create table metric_change_segment
(
    id                INT AUTO_INCREMENT,
    segment_id        INT,
    new_segment_start DATETIME,
    new_segment_end   DATETIME,
    timestamp         DATETIME,
    primary key (id)
);

drop table metric_delete_segment;

create table metric_delete_segment
(
    id         INT AUTO_INCREMENT,
    segment_id INT,
    had_ixns   BOOLEAN,
    timestamp  DATETIME,
    primary key (id)
);

drop table metric_create_ixn;

create table metric_create_ixn
(
    id              INT AUTO_INCREMENT,
    rfi_id          INT,
    exploit_date_id INT,
    target_id       INT,
    segment_id      INT,
    ixn_id          INT,
    exploit_analyst TEXT,
    time            DATETIME,
    activity        TEXT,
    track           TEXT,
    track_analyst   TEXT,
    lead_checker    TEXT,
    final_checker   TEXT,
    timestamp       DATETIME,
    primary key (id)
);

alter table metric_change_ixn
    drop column old_data,
    change data_id ixn_id INT;

drop table metric_delete_ixn;

create table metric_delete_ixn
(
    id        INT AUTO_INCREMENT,
    ixn_id    INT,
    timestamp DATETIME,
    primary key (id)
);
