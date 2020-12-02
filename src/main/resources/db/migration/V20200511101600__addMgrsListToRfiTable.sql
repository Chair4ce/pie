alter table data_rfi
    add column mgrs_list TEXT;

insert into data_rfi (id, priority, status, last_update)
values (-1, -1, 'CLOSED', '1970-01-01 00:00:00');

insert into data_exploit_date (id, rfi_id)
values (-1, -1);

create table metric_create_target_from_gets
(
    id        INT AUTO_INCREMENT,
    rfi_id    INT,
    mgrs      TEXT,
    timestamp DATETIME,
    primary key (id)
);
