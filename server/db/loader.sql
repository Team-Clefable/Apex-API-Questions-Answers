--CREATE INDICES FOR foreign keys
-- CREATE INDEX questions_product_id_idx ON questions (product_id);


-- EC2 INSTANCE --

-- \COPY questions FROM '/home/ubuntu/projects/team-clefable/data/questions.csv' DELIMITER ',' CSV HEADER;

-- \COPY answers FROM '/home/ubuntu/projects/team-clefable/data/answers.csv' DELIMITER ',' CSV HEADER;

-- \COPY photos FROM '/home/ubuntu/projects/team-clefable/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- LOCAL INSTANCE --

\COPY questions FROM '/home/changerbang/projects/team-clefable/questions.csv' DELIMITER ',' CSV HEADER;

\COPY answers FROM '/home/changerbang/projects/team-clefable/answers.csv' DELIMITER ',' CSV HEADER;

\COPY photos FROM '/home/changerbang/projects/team-clefable/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- HOW TO RUN LOADER --
  --psql -d qa -f db/loader.sql


--HOW TO LOAD SCHEMA FILE --
  --\i /home/changerbang/projects/team-clefable/Clefable-API-Questions-Answers/server/db/schema.sql;