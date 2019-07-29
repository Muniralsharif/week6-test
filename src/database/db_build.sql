
BEGIN;
    DROP TABLE IF EXISTs cities
    CASCADE;

CREATE TABLE cities
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)NOT NULL ,
    country text not null

);
INSERT INTO cities
    (name,country)
VALUES
    ('Aman', 'jordan'),
    ('Hebron', 'Palestine'),
    ('London', 'England');


COMMIT;