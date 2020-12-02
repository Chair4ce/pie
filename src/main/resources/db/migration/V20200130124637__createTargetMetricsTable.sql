create table metric_create_target
(
    id INT AUTO_INCREMENT,
    rfi_num TEXT,
    exploit_date DATETIME,
    name TEXT,
    timestamp DATETIME,
    primary key (id)
);

RENAME TABLE
    rfi TO data_rfi,
    target TO data_target,
    exploit_date TO data_exploit_date;