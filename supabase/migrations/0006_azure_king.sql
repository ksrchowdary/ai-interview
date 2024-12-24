/*
  # Add payments table and related functions

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `amount` (integer)
      - `credits` (integer)
      - `status` (text)
      - `stripe_session_id` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on payments table
    - Add policy for users to view their own payments
*/

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount integer NOT NULL,
  credits integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  stripe_session_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (user_id = auth.uid());

-- Create function to handle successful payments
CREATE OR REPLACE FUNCTION handle_successful_payment()
RETURNS trigger AS $$
BEGIN
  -- Add credits to user's balance
  UPDATE profiles
  SET credits = credits + NEW.credits
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for successful payments
CREATE TRIGGER on_payment_success
  AFTER UPDATE ON payments
  FOR EACH ROW
  WHEN (OLD.status = 'pending' AND NEW.status = 'succeeded')
  EXECUTE FUNCTION handle_successful_payment();