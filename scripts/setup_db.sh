#!/usr/bin/env bash
mysql -u root -e "create database piedev;"
mysql -u root -e "create user 'pie'@'localhost';"
mysql -u root -e "GRANT ALL PRIVILEGES ON piedev.* TO 'pie'@'localhost';"
