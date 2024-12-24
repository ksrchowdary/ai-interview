/*
  # Add subscription management system

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `stripe_subscription_id` (text)
      - `status` (text)
      - `current_period_end` (timestamptz)
      - `cancel_at` (timestamptz, nullable)
      - `canceled_at` (timestamptz, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `subscriptions` table
    - Add policies for authenticated users to manage their subscriptions

  3. Changes
    - Add subscription status tracking
    - Add subscription lifecycle management
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE NOT NULL,
  status text NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at timestamptz,
  canceled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  
  -- Add constraint for valid status values
  CONSTRAINT valid_subscription_status CHECK (
    status IN (
      'active',
      'canceled',
      'incomplete',
      'incomplete_expired',
      'past_due',
      'trialing',
      'unpaid'
    )
  )
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX subscriptions_stripe_id_idx ON subscriptions(stripe_subscription_id);

-- Create policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  USING (user_id = auth.uid());

-- Add function to handle subscription updates
CREATE OR REPLACE FUNCTION handle_subscription_update()
RETURNS trigger AS $$
BEGIN
  -- Update user credits based on subscription status change
  IF NEW.status = 'active' AND OLD.status != 'active' THEN
    -- Add subscription credits
    UPDATE profiles
    SET credits = credits + 100  -- Adjust credit amount as needed
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for subscription updates
CREATE TRIGGER on_subscription_update
  AFTER UPDATE ON subscriptions
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION handle_subscription_update();