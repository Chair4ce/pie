ALTER table data_ixn
    drop column lead_checker,
    change final_checker checker TEXT,
    ADD COLUMN approval_status   TEXT;

UPDATE data_ixn
set approval_status = 'NOT_REVIEWED';

ALTER table metric_create_ixn
    drop column lead_checker,
    change final_checker checker TEXT;
