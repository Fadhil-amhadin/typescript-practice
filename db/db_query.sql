CREATE DATABASE home_banner_db;

--\c into home_banner_db

CREATE TABLE banner(
    banner_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);