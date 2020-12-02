create table rfi_priority_change
(
    id       INT AUTO_INCREMENT,
    rfi_id TEXT,
    old_pri INT,
    new_pri INT,
    datetime DATETIME,
    PRIMARY KEY (id)
);
