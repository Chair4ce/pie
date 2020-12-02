alter table metric_create_ixn
    add column user_name TEXT;

alter table metric_change_ixn
    add column user_name TEXT;

alter table metric_create_target
    add column user_name TEXT;

alter table metric_change_target
    add column user_name TEXT;
