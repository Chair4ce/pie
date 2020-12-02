insert into data_user (user_name)
values ('sdt.test');

insert into data_rfi (id, rfi_num, gets_url, status, last_update, customer_unit, ltiov, country, description, priority,
                      receive_date, justification, customer_title, customer_given_name, customer_surname,
                      customer_email, customer_comm_phone, customer_dsn_phone, customer_tsvoip, mgrs_list)
values (-1, 'ABC-123', '', 'CLOSED', '1970-01-01 00:00:00', '', null, '', '', -1, '1970-01-01 00:00:00', '', '', '', '',
        '', '', '', '', '');

insert into data_exploit_date (id, exploit_date, rfi_id, deleted)
values (-1, '1970-01-01 00:00:00', -1, null);

insert into data_product (id, rfi_id, file_name, content_type, data)
values (1, 14, 'doc-1.kml', 'application/vnd.google-earth.kml+xml', X'9fad5e9eefdfb449');

insert into data_product (id, rfi_id, file_name, content_type, data)
values (2, 15, 'doc-2.kml', 'application/vnd.google-earth.kml+xml', X'9fad5e9eefdfb449');
