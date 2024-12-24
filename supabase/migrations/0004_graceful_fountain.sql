/*
  # Add Profile Features

  1. New Tables
    - `documents` - For storing resumes and other files
    - `job_descriptions` - For storing job descriptions
    - `skills` - For storing user skills
  
  2. Changes
    - Add new columns to profiles table
    
  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Add new columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS headline text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS experience_level text;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  size integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  company text,
  description text NOT NULL,
  requirements text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  level text NOT NULL,
  years integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Documents policies
CREATE POLICY "Users can manage own documents"
  ON documents FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Job descriptions policies
CREATE POLICY "Users can manage own job descriptions"
  ON job_descriptions FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Skills policies
CREATE POLICY "Users can manage own skills"
  ON skills FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());