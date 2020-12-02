alter table metric_create_target
    add column is_copy BOOL;

update metric_create_target
    set is_copy = false;
