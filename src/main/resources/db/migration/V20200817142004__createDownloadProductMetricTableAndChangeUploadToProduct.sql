CREATE TABLE metric_download_product
(
    id INT AUTO_INCREMENT,
    rfi_id INT,
    user_name TEXT,
    timestamp TIMESTAMP,
    PRIMARY KEY (id)
);

alter table data_upload RENAME TO data_product;

alter table metric_upload_file RENAME TO metric_upload_product;
