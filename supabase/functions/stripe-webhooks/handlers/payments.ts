import { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

export async function handlePaymentSuccess(
  paymentIntent: Stripe.PaymentIntent,
  supabase: SupabaseClient
) {
  const { metadata } = paymentIntent;
  if (!metadata?.userId || !metadata?.credits) {
    throw new Error('Missing required metadata');
  }

  const userId = metadata.userId;
  const credits = parseInt(metadata.credits, 10);

  // Update payment record
  const { error: paymentError } = await supabase
    .from('payments')
    .update({ status: 'succeeded' })
    .eq('stripe_session_id', paymentIntent.id);

  if (paymentError) throw paymentError;

  // Add credits to user's balance
  const { error: creditError } = await supabase.rpc(
    'add_credits',
    { user_id: userId, amount: credits }
  );

  if (creditError) throw creditError;

  return { userId, credits };
}