-- Create roles
CREATE ROLE schema_owner NOLOGIN;
CREATE ROLE drizzle WITH LOGIN PASSWORD 'drizzle';
CREATE ROLE api WITH LOGIN PASSWORD 'api';

-- Connect to the watchout database
\connect watchout

ALTER SCHEMA public OWNER TO schema_owner;

-- Setup drizzle user
GRANT CONNECT ON DATABASE watchout TO drizzle;
GRANT schema_owner TO drizzle;

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES ON ALL TABLES IN SCHEMA public TO drizzle;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO drizzle;

-- Setup api user
GRANT CONNECT ON DATABASE watchout TO api;
GRANT USAGE ON SCHEMA public TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api;
