alter table metric_change_rfi_priority
    add column user_name TEXT;

update metric_change_rfi_priority
    set user_name = '';

create table metric_undo_change_rfi_priority
(
    id INT AUTO_INCREMENT,
    rfi_id INT,
    user_name TEXT,
    timestamp DATETIME,
    primary key (id)
);
