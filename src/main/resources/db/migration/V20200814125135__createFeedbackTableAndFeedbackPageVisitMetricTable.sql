CREATE TABLE data_rfi_feedback
(
    id      INT AUTO_INCREMENT,
    rfi_num TEXT,
    stars   INT,
    PRIMARY KEY (id)
);

CREATE TABLE metric_visit_feedback_page
(
    id        INT AUTO_INCREMENT,
    rfi_num   TEXT,
    timestamp TIMESTAMP,
    PRIMARY KEY (id)
);
