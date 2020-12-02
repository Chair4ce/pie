alter table data_target
    ADD hourly_rollup TEXT;

update data_target
    set hourly_rollup = '';

create table metric_click_rollup
(
    id        INT AUTO_INCREMENT,
    target_id INT,
    user_name TEXT,
    timestamp DATETIME,
    primary key (id)
);
