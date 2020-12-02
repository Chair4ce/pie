CREATE TABLE rfi
(
    id          INT AUTO_INCREMENT,
    rfi_id      TEXT,
    gets_url    TEXT,
    status      TEXT,
    last_update DATETIME,
    customer    TEXT,
    ltiov       DATETIME,
    country     TEXT,
    description TEXT,
    priority    INT,
    PRIMARY KEY (id)
);
