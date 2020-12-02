create table metric_undo_target_delete
(
    id INT AUTO_INCREMENT,
    target_id INT,
    timestamp DATETIME,
    primary key (id)
);

alter table data_target
    add column deleted DATETIME;
