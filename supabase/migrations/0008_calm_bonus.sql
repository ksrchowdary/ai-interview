/*
  # Email Preferences and Notifications System

  1. New Tables
    - `email_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `marketing` (boolean)
      - `transactional` (boolean)
      - `reports` (boolean)
      - `digest` (enum: daily, weekly, never)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `email_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `template` (text)
      - `sent_at` (timestamptz)
      - `status` (text)
      - `error` (text, nullable)

  2. Functions
    - Function to create default preferences for new users
    - Function to handle email logging

  3. Security
    - Enable RLS on both tables
    - Add policies for user access
*/

-- Create email digest type
CREATE TYPE email_digest AS ENUM ('daily', 'weekly', 'never');

-- Create email preferences table
CREATE TABLE IF NOT EXISTS email_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  marketing boolean DEFAULT true,
  transactional boolean DEFAULT true,
  reports boolean DEFAULT true,
  digest email_digest DEFAULT 'weekly',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create email logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  template text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  status text NOT NULL,
  error text,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX email_preferences_user_id_idx ON email_preferences(user_id);
CREATE INDEX email_logs_user_id_idx ON email_logs(user_id);
CREATE INDEX email_logs_template_idx ON email_logs(template);
CREATE INDEX email_logs_sent_at_idx ON email_logs(sent_at);

-- Create policies
CREATE POLICY "Users can view own email preferences"
  ON email_preferences FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own email preferences"
  ON email_preferences FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own email logs"
  ON email_logs FOR SELECT
  USING (user_id = auth.uid());

-- Function to create default preferences for new users
CREATE OR REPLACE FUNCTION create_default_email_preferences()
RETURNS trigger AS $$
BEGIN
  INSERT INTO email_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default preferences for new users
CREATE TRIGGER on_user_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_default_email_preferences();

-- Function to log emails
CREATE OR REPLACE FUNCTION log_email(
  p_user_id uuid,
  p_template text,
  p_status text,
  p_error text DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO email_logs (user_id, template, status, error, metadata)
  VALUES (p_user_id, p_template, p_status, p_error, p_metadata)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;