alter table data_ixn
    ADD track_narrative TEXT;

update data_ixn
    set track_narrative = '';

create table metric_click_track_narrative
(
    id INT AUTO_INCREMENT,
    ixn_id INT,
    user_name TEXT,
    timestamp DATETIME,
    primary key (id)
);
