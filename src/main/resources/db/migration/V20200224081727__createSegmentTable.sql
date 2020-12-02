create table data_segment(
    id INT AUTO_INCREMENT,
    rfi_id INT,
    exploit_date_id INT,
    target_id INT,
    start_time DATETIME,
    end_time DATETIME,
    primary key (id),
    foreign key (rfi_id) references data_rfi(id),
    foreign key (exploit_date_id) references data_exploit_date(id),
    foreign key (target_id) references data_target(id)
);