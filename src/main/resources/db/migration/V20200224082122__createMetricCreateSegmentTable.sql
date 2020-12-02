create table metric_create_segment (
    id INT AUTO_INCREMENT,
    rfi_num TEXT,
    exploit_date DATETIME,
    target_name TEXT,
    segment_start DATETIME,
    segment_end DATETIME,
    timestamp DATETIME,
    primary key (id)
);