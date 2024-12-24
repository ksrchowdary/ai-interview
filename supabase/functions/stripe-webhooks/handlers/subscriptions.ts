import { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import { STRIPE_EVENTS } from '../../_shared/constants.ts';

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  eventType: string,
  supabase: SupabaseClient
) {
  const customerId = subscription.customer as string;
  
  // Get user ID from customer ID
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (userError || !userData) {
    throw new Error('User not found');
  }

  const userId = userData.id;
  const status = subscription.status;
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
  const cancelAt = subscription.cancel_at 
    ? new Date(subscription.cancel_at * 1000) 
    : null;

  switch (eventType) {
    case STRIPE_EVENTS.SUBSCRIPTION_CREATED:
    case STRIPE_EVENTS.SUBSCRIPTION_UPDATED:
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          status,
          current_period_end: currentPeriodEnd.toISOString(),
          cancel_at: cancelAt?.toISOString(),
          canceled_at: subscription.canceled_at 
            ? new Date(subscription.canceled_at * 1000).toISOString()
            : null,
        });
      break;

    case STRIPE_EVENTS.SUBSCRIPTION_DELETED:
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
  }

  return { userId, status };
}