

CREATE DATABASE tododb;

CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        title text,
        completed boolean,
        priority integer,
        notes text,
        duedate text,
        status integer
);
