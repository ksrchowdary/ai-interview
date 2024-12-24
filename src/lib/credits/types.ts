export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'debit' | 'credit';
  description: string;
  created_at: string;
}

export interface CreditCheck {
  hasCredits: boolean;
  remainingCredits: number;
  error?: string;
}