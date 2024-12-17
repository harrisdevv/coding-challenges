-- Connect to quiz_db
\c quiz_db;

-- Create a test participant
INSERT INTO participant (quiz_id, user_name) 
VALUES ('QUIZ123', 'TestUser1');

-- Query participants
SELECT * FROM participant;

-- Create an index on quiz_id
CREATE INDEX idx_quiz_id ON participant(quiz_id);

-- Get participants for a specific quiz
SELECT * FROM participant WHERE quiz_id = 'QUIZ123';

-- Count participants per quiz
SELECT quiz_id, COUNT(*) as participant_count 
FROM participant 
GROUP BY quiz_id;

-- Delete test data
DELETE FROM participant WHERE quiz_id = 'QUIZ123';

-- Get table information
\d+ participant;

-- Get database size
SELECT pg_size_pretty(pg_database_size('quiz_db'));

-- Check table size
SELECT pg_size_pretty(pg_total_relation_size('participant'));

-- Check active connections
SELECT * FROM pg_stat_activity WHERE datname = 'quiz_db';
