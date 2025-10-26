-- Setup script for local database to match Neon DB structure
-- This runs automatically on Docker container startup

-- Create the drizzle and api roles (users)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'drizzle') THEN
    CREATE ROLE drizzle WITH LOGIN PASSWORD 'drizzle';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'api') THEN
    CREATE ROLE api WITH LOGIN PASSWORD 'api';
  END IF;
END
$$;

-- Grant drizzle user permissions to create and manage tables (for migrations)
GRANT CREATE ON SCHEMA public TO drizzle;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO drizzle;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO drizzle;

-- Grant api user read/write permissions on all existing tables
GRANT USAGE ON SCHEMA public TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api;

-- Set default privileges so future tables created by drizzle automatically grant permissions to api
ALTER DEFAULT PRIVILEGES FOR ROLE drizzle IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api;

ALTER DEFAULT PRIVILEGES FOR ROLE drizzle IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO api;
