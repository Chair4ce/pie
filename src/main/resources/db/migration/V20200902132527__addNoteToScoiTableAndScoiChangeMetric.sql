alter table data_scoi
    add column note TEXT;

update data_scoi
set note = '';

create table metric_change_scoi
(
    id        INT AUTO_INCREMENT,
    scoi_id   INT,
    field     TEXT,
    new_data  TEXT,
    timestamp TIMESTAMP,
    primary key (id)
)
