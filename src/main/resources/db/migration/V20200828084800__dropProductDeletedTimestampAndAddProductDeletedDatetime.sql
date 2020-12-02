alter table data_product
    drop column deleted;

alter table data_product
    add column deleted DATETIME;
