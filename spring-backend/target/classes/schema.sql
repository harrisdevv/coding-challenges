-- Drop tables if they exist
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;

-- Create quiz table
CREATE TABLE quiz (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create question table
CREATE TABLE question (
    id BIGSERIAL PRIMARY KEY,
    quiz_id VARCHAR(36) REFERENCES quiz(id),
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create participant table
CREATE TABLE participant (
    id BIGSERIAL PRIMARY KEY,
    quiz_id VARCHAR(36) REFERENCES quiz(id),
    name VARCHAR(255) NOT NULL,
    score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
