alter table data_target
    add column all_callouts text;

update data_target
    set all_callouts = '';

create table metric_click_import
(
    id            INT AUTO_INCREMENT,
    target_id     INT,
    ixns_imported INT,
    user_name     TEXT,
    timestamp     DATETIME,
    primary key (id)
);
