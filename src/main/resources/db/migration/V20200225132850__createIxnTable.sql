create table data_ixn (
    id INT AUTO_INCREMENT,
    rfi_id INT,
    exploit_date_id INT,
    target_id INT,
    segment_id INT,
    exploit_analyst TEXT,
    time DATETIME,
    activity TEXT,
    track TEXT,
    primary key (id),
    foreign key (rfi_id) references data_rfi(id),
    foreign key (exploit_date_id) references data_exploit_date(id),
    foreign key (target_id) references data_target(id),
    foreign key (segment_id) references data_segment(id)
)