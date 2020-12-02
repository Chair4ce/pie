create table metric_undo_segment_delete
(
    id INT AUTO_INCREMENT,
    segment_id INT,
    timestamp DATETIME,
    primary key (id)
);

alter table data_segment
    add column deleted DATETIME;
