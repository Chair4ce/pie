alter table data_rfi
    change column customer customer_unit TEXT,
    add column customer_title            TEXT,
    add column customer_given_name       TEXT,
    add column customer_surname          TEXT,
    add column customer_email            TEXT,
    add column customer_comm_phone       TEXT,
    add column customer_dsn_phone        TEXT,
    add column customer_svoip            TEXT,
    add column customer_tsvoip           TEXT;

update data_rfi
set customer_title      = '',
    customer_given_name = '',
    customer_surname    = '',
    customer_email      = '',
    customer_comm_phone = '',
    customer_dsn_phone  = '',
    customer_svoip      = '',
    customer_tsvoip     = '';
