export interface StripeSession {
  id: string;
  url: string;
}

export interface PaymentHistory {
  id: string;
  user_id: string;
  amount: number;
  credits: number;
  status: 'succeeded' | 'failed' | 'pending';
  created_at: string;
}

export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  current_period_end: string;
  cancel_at?: string | null;
  canceled_at?: string | null;
  created_at: string;
}