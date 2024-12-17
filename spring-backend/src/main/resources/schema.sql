-- Drop tables if they exist
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;

-- Create quiz table
CREATE TABLE quiz (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create question table
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    quiz_id VARCHAR(255) REFERENCES quiz(id)
);

-- Create participant table
CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    score INTEGER DEFAULT 0,
    quiz_id VARCHAR(255) REFERENCES quiz(id)
);
