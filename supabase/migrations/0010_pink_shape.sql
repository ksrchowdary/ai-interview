/*
  # Fix Performance Logs Policies

  1. Changes
    - Add insert policies for performance and error logs
    - Add policies for users to view their own logs
    - Update admin policies to use proper role check

  2. Security
    - Enable RLS for all tables
    - Ensure users can only access their own data
    - Allow admins full access
*/

-- Add insert policies for performance logs
CREATE POLICY "Users can insert performance logs"
  ON performance_logs FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (user_id IS NULL OR user_id = auth.uid())
  );

CREATE POLICY "Users can view own performance logs"
  ON performance_logs FOR SELECT
  USING (
    user_id = auth.uid()
  );

-- Add insert policies for error logs
CREATE POLICY "Users can insert error logs"
  ON error_logs FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (user_id IS NULL OR user_id = auth.uid())
  );

CREATE POLICY "Users can view own error logs"
  ON error_logs FOR SELECT
  USING (
    user_id = auth.uid()
  );

-- Update admin policies to use proper role check
DROP POLICY IF EXISTS "Admins can view all performance logs" ON performance_logs;
DROP POLICY IF EXISTS "Admins can view all error logs" ON error_logs;

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