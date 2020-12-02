create table target
(
    id INT AUTO_INCREMENT,
    rfi_id INT,
    exploit_date_id INT,
    name TEXT,
    mgrs TEXT,
    notes TEXT,
    description TEXT,
    primary key (id),
    FOREIGN KEY (rfi_id) REFERENCES rfi(id),
    FOREIGN KEY (exploit_date_id) REFERENCES exploit_date(id)
);