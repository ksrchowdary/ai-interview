import { supabase } from '../supabase';
import { QueryError } from '../database/queries';
import { STRIPE_CONFIG } from './config';
import type { StripeSession, PaymentHistory } from './types';

export async function createCheckoutSession(
  userId: string,
  priceId: keyof typeof STRIPE_CONFIG.prices
): Promise<StripeSession> {
  if (!userId) {
    throw new QueryError('User ID is required');
  }

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      priceId: STRIPE_CONFIG.prices[priceId],
      credits: STRIPE_CONFIG.creditAmounts[priceId],
      userId,
    },
  });

  if (error) throw error;
  return data;
}

export async function getPaymentHistory(userId: string) {
  if (!userId) {
    throw new QueryError('User ID is required');
  }

  return supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}