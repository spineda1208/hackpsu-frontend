-- Create roles
CREATE ROLE drizzle WITH LOGIN PASSWORD 'drizzle';
CREATE ROLE api WITH LOGIN PASSWORD 'api';

-- Connect to the watchout database
\connect watchout

-- Grant drizzle user full permissions on public schema (for migrations)
GRANT CREATE ON SCHEMA public TO drizzle;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO drizzle;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO drizzle;
GRANT ALL PRIVILEGES ON ALL ROUTINES IN SCHEMA public TO drizzle;

-- Grant api user read/write permissions on public schema (for app runtime)
GRANT USAGE ON SCHEMA public TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api;
