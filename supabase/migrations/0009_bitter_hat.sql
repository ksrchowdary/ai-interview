/*
  # Add Performance and Error Logging

  1. New Tables
    - `performance_logs` - Store performance metrics
    - `error_logs` - Store application errors
  
  2. Schema Updates
    - Add role column to profiles table
  
  3. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- Add role column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
CHECK (role IN ('user', 'admin'));

-- Create performance logs table
CREATE TABLE IF NOT EXISTS performance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric text NOT NULL,
  value float NOT NULL,
  user_agent text,
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create error logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error text NOT NULL,
  stack text,
  component text,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE performance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX performance_logs_metric_idx ON performance_logs(metric);
CREATE INDEX performance_logs_timestamp_idx ON performance_logs(timestamp);
CREATE INDEX error_logs_timestamp_idx ON error_logs(timestamp);

-- Create policies for admin access
CREATE POLICY "Admins can view all performance logs"
  ON performance_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all error logs"
  ON error_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create function to clean old logs
CREATE OR REPLACE FUNCTION clean_old_logs()
RETURNS void AS $$
BEGIN
  -- Delete performance logs older than 30 days
  DELETE FROM performance_logs
  WHERE timestamp < NOW() - INTERVAL '30 days';
  
  -- Delete error logs older than 90 days
  DELETE FROM error_logs
  WHERE timestamp < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;