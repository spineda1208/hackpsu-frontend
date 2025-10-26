-- Connect to the watchout database
\connect watchout

-- Ensure schema_owner exists and owns the public schema
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'schema_owner') THEN
    CREATE ROLE schema_owner NOLOGIN;
  END IF;
END
$$;

ALTER SCHEMA public OWNER TO schema_owner;

-- Setup drizzle user permissions
GRANT CONNECT ON DATABASE watchout TO drizzle;
GRANT schema_owner TO drizzle;

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES ON ALL TABLES IN SCHEMA public TO drizzle;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO drizzle;

-- Set default privileges for future tables/sequences created by schema_owner
ALTER DEFAULT PRIVILEGES FOR ROLE schema_owner IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES ON TABLES TO drizzle;
ALTER DEFAULT PRIVILEGES FOR ROLE schema_owner IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO drizzle;

-- Setup api user permissions
GRANT CONNECT ON DATABASE watchout TO api;
GRANT USAGE ON SCHEMA public TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api;

-- Set default privileges for future tables created by schema_owner
ALTER DEFAULT PRIVILEGES FOR ROLE schema_owner IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api;
