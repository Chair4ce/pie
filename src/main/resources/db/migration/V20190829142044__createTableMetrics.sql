CREATE TABLE metric
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    action  VARCHAR(64),
    context VARCHAR(512),
    PRIMARY KEY (id)
);
