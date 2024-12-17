-- Drop tables if they exist
DROP TABLE IF EXISTS question_options;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS participant;

-- Create Quiz table
CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    quiz_id VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create Question table
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    quiz_id BIGINT REFERENCES quiz(id)
);

-- Create Question Options table
CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id BIGINT REFERENCES question(id),
    options TEXT NOT NULL
);

-- Create Participant table
CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    quiz_id BIGINT REFERENCES quiz(id),
    user_name VARCHAR(255) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
