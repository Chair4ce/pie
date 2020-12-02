create table data_scoi
(
    id   INT AUTO_INCREMENT,
    name TEXT,
    mgrs TEXT,
    primary key (id)
);

create table metric_create_scoi
(
    id        INT AUTO_INCREMENT,
    scoi_id   INT,
    user_name TEXT,
    timestamp TIMESTAMP,
    primary key (id)
);
