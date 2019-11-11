DROP TABLE IF EXISTS yinusers;

CREATE TABLE yinusers(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK(first != ''),
    last VARCHAR(255) NOT NULL CHECK(last != ''),
    imgurl VARCHAR(300),
    bio VARCHAR(300),
    selection VARCHAR(300) NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
);