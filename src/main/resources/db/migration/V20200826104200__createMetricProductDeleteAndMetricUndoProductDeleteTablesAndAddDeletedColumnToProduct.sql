alter table data_product
    add column deleted TIMESTAMP;

create table metric_delete_product
(
    id        INT AUTO_INCREMENT,
    rfi_num   TEXT,
    user_name TEXT,
    timestamp timestamp,
    primary key (id)
);

create table metric_undo_product_delete
(
    id        INT AUTO_INCREMENT,
    rfi_num   TEXT,
    user_name TEXT,
    timestamp timestamp,
    primary key (id)
);
