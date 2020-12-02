ALTER TABLE metric_change_scoi ADD user_name TEXT;

DROP TABLE facts;

ALTER TABLE metric_site_visit RENAME TO metric_visit_site;
