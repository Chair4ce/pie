CREATE TABLE rfi
(
    id      INT AUTO_INCREMENT,
    priority TEXT,
    rfi_id TEXT,
    gets_status TEXT,
    info TEXT,
    customer TEXT,
    start TEXT,
    end TEXT,
    rfi_status TEXT,
    exploited_coi TEXT,
    tracks TEXT,
    PRIMARY KEY (id)
);
