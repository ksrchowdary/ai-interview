/*
  # Add conversation storage tables

  1. New Tables
    - `transcripts`
      - `id` (uuid, primary key)
      - `interview_id` (uuid, foreign key)
      - `speaker` (text)
      - `content` (text)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `interview_id` (uuid, foreign key)
      - `is_ai` (boolean)
      - `content` (text)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews(id) ON DELETE CASCADE NOT NULL,
  speaker text NOT NULL,
  content text NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews(id) ON DELETE CASCADE NOT NULL,
  is_ai boolean NOT NULL DEFAULT false,
  content text NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Transcripts policies
CREATE POLICY "Users can view own transcripts"
  ON transcripts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM interviews
    WHERE interviews.id = transcripts.interview_id
    AND interviews.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own transcripts"
  ON transcripts FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM interviews
    WHERE interviews.id = transcripts.interview_id
    AND interviews.user_id = auth.uid()
  ));

-- Chat messages policies
CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM interviews
    WHERE interviews.id = chat_messages.interview_id
    AND interviews.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM interviews
    WHERE interviews.id = chat_messages.interview_id
    AND interviews.user_id = auth.uid()
  ));