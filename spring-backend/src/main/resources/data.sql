-- Sample Quiz Data
INSERT INTO quiz (quiz_id, title, description) 
VALUES 
('VOCAB-101', 'Basic English Vocabulary', 'Test your knowledge of common English words'),
('IDIOMS-202', 'English Idioms', 'Learn common English idioms and their meanings'),
('GRAMMAR-303', 'Grammar Essentials', 'Practice essential English grammar rules')
RETURNING id;

-- Questions for VOCAB-101
INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'What is the meaning of "arduous"?', 'Difficult and tiring', id 
FROM quiz WHERE quiz_id = 'VOCAB-101';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'Choose the synonym for "benevolent":', 'Kind', id 
FROM quiz WHERE quiz_id = 'VOCAB-101';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'What does "ephemeral" mean?', 'Lasting for a very short time', id 
FROM quiz WHERE quiz_id = 'VOCAB-101';

-- Questions for IDIOMS-202
INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'What does "It''s raining cats and dogs" mean?', 'It''s raining very heavily', id 
FROM quiz WHERE quiz_id = 'IDIOMS-202';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'Complete the idiom: "Break a ___"', 'leg', id 
FROM quiz WHERE quiz_id = 'IDIOMS-202';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'What does "piece of cake" mean?', 'Something very easy to do', id 
FROM quiz WHERE quiz_id = 'IDIOMS-202';

-- Questions for GRAMMAR-303
INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'Choose the correct form: "She ___ to the store."', 'went', id 
FROM quiz WHERE quiz_id = 'GRAMMAR-303';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'Select the proper article: "___ university"', 'a', id 
FROM quiz WHERE quiz_id = 'GRAMMAR-303';

INSERT INTO question (question_text, correct_answer, quiz_id) 
SELECT 'Identify the correct tense: "I have been studying"', 'Present Perfect Continuous', id 
FROM quiz WHERE quiz_id = 'GRAMMAR-303';

-- Options for VOCAB-101 questions
INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Easy and simple'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'VOCAB-101' AND q.question_text LIKE '%arduous%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Difficult and tiring'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'VOCAB-101' AND q.question_text LIKE '%arduous%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Fast and quick'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'VOCAB-101' AND q.question_text LIKE '%arduous%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Slow and steady'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'VOCAB-101' AND q.question_text LIKE '%arduous%';

-- Options for IDIOMS-202 questions
INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Cruel'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'IDIOMS-202' AND q.question_text LIKE '%benevolent%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Kind'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'IDIOMS-202' AND q.question_text LIKE '%benevolent%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Lazy'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'IDIOMS-202' AND q.question_text LIKE '%benevolent%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Smart'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'IDIOMS-202' AND q.question_text LIKE '%benevolent%';

-- Options for GRAMMAR-303 questions
INSERT INTO question_options (question_id, options) 
SELECT q.id, 'go'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%She ___ to the store%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'went'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%She ___ to the store%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'the'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%___ university%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'a'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%___ university%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Present Perfect'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%I have been studying%';

INSERT INTO question_options (question_id, options) 
SELECT q.id, 'Present Perfect Continuous'
FROM question q
JOIN quiz qz ON q.quiz_id = qz.id
WHERE qz.quiz_id = 'GRAMMAR-303' AND q.question_text LIKE '%I have been studying%';
