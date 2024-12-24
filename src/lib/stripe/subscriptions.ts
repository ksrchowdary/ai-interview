import { supabase } from '../supabase';
import { QueryError } from '../database/queries';
import type { Subscription, SubscriptionStatus } from './types';

export async function getSubscription(userId: string): Promise<Subscription | null> {
  if (!userId) throw new QueryError('User ID is required');

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubscriptionStatus(
  subscriptionId: string, 
  status: SubscriptionStatus
): Promise<void> {
  if (!subscriptionId) throw new QueryError('Subscription ID is required');

  const { error } = await supabase
    .from('subscriptions')
    .update({ status })
    .eq('id', subscriptionId);

  if (error) throw error;
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  if (!subscriptionId) throw new QueryError('Subscription ID is required');

  const { error } = await supabase.functions.invoke('cancel-subscription', {
    body: { subscriptionId }
  });

  if (error) throw error;
}