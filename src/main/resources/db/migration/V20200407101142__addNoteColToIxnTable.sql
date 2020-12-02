alter table data_ixn
    add column note TEXT;

update data_ixn
    set note = '';
