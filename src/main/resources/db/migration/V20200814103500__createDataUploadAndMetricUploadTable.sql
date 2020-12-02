create table data_upload
(
    id                  INT AUTO_INCREMENT,
    rfi_id              INT,
    file_name           TEXT,
    content_type        TEXT,
    data                MEDIUMBLOB,
    primary key (id)
);

create table metric_upload_file
(
    id                  INT AUTO_INCREMENT,
    rfi_id              INT,
    upload_id           INT,
    user_name           TEXT,
    timestamp           TIMESTAMP,
    primary key (id)
);
