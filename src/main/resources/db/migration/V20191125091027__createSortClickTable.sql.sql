create table sort_click
(
    id       int auto_increment,
    datetime datetime,
    sort_key TEXT,
    sort_order_ascending BOOL,
    primary key (id)
);
