/*
  # Add job description relation to interviews

  1. Changes
    - Add job_description_id column to interviews table
    - Add foreign key constraint to job_descriptions table
    - Add index for performance

  2. Security
    - No changes to RLS policies needed as existing policies cover the new column
*/

-- Add job_description_id column
ALTER TABLE interviews 
ADD COLUMN IF NOT EXISTS job_description_id uuid REFERENCES job_descriptions(id);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS interviews_job_description_id_idx 
ON interviews(job_description_id);