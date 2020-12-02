create table data_user
(
    id        INT AUTO_INCREMENT,
    user_name TEXT,
    primary key (id)
);

create table metric_login
(
    id        INT AUTO_INCREMENT,
    user_name TEXT,
    timestamp DATETIME,
    primary key (id)
);
