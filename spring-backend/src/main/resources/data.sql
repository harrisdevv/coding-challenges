-- Sample Quiz Data
INSERT INTO quiz (id, title, description) 
VALUES 
('VOCAB-101', 'Basic English Vocabulary', 'Test your knowledge of common English words'),
('IDIOMS-202', 'English Idioms', 'Learn common English idioms and their meanings'),
('GRAMMAR-303', 'Grammar Essentials', 'Practice essential English grammar rules');

-- Questions for VOCAB-101
INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('What is the meaning of "arduous"?', 'Difficult and tiring', 
 ARRAY['Easy and simple', 'Difficult and tiring', 'Quick and painless', 'Slow but steady'], 
 'VOCAB-101');

INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('Choose the synonym for "benevolent":', 'Kind',
 ARRAY['Cruel', 'Kind', 'Angry', 'Jealous'],
 'VOCAB-101');

INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('What does "ephemeral" mean?', 'Lasting for a very short time',
 ARRAY['Lasting forever', 'Lasting for a very short time', 'Extremely important', 'Very large'],
 'VOCAB-101');

-- Questions for IDIOMS-202
INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('What does "bite off more than you can chew" mean?', 'Take on more responsibility than you can handle',
 ARRAY['Eat too much food', 'Take on more responsibility than you can handle', 'Be very hungry', 'Have dental problems'],
 'IDIOMS-202');

INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('What does "break the ice" mean?', 'To make people feel more comfortable in a social situation',
 ARRAY['To make people feel more comfortable in a social situation', 'To break something frozen', 'To cause trouble', 'To feel cold'],
 'IDIOMS-202');

-- Questions for GRAMMAR-303
INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('Which sentence is in the present perfect tense?', 'I have been studying English for two years.',
 ARRAY['I am studying English.', 'I studied English.', 'I have been studying English for two years.', 'I will study English.'],
 'GRAMMAR-303');

INSERT INTO question (question_text, correct_answer, options, quiz_id) 
VALUES 
('Choose the correct form:', 'If I had known, I would have helped.',
 ARRAY['If I knew, I will help.', 'If I had known, I would have helped.', 'If I know, I help.', 'If I had know, I would helped.'],
 'GRAMMAR-303');
