ALTER TABLE data_target
    ADD status TEXT;
UPDATE data_target
    SET status = 'NOT_STARTED';
