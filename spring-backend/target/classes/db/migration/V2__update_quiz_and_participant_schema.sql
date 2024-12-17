-- Drop existing foreign key constraint
ALTER TABLE participant DROP CONSTRAINT IF EXISTS participant_quiz_id_fkey;

-- Update quiz table to use UUID
ALTER TABLE quiz DROP COLUMN IF EXISTS quiz_id;
ALTER TABLE quiz ALTER COLUMN id TYPE VARCHAR(255);

-- Update participant table
ALTER TABLE participant ALTER COLUMN quiz_id TYPE VARCHAR(255);

-- Add foreign key constraint
ALTER TABLE participant 
ADD CONSTRAINT participant_quiz_id_fkey 
FOREIGN KEY (quiz_id) REFERENCES quiz(id);
