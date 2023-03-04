\echo 'Delete and recreate outlet db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE outlet;
CREATE DATABASE outlet;
\connect outlet

\i outlet-schema.sql

-- \echo 'Delete and recreate outlet_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' answer

-- DROP DATABASE outlet_test;
-- CREATE DATABASE outlet_test;
-- \connect outlet_test

-- \i outlet-schema.sql