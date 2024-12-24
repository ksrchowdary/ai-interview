import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';
import { STRIPE_EVENTS } from '../_shared/constants.ts';
import { handlePaymentSuccess } from './handlers/payments.ts';
import { handleSubscriptionChange } from './handlers/subscriptions.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No signature found');
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured');
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    let result;

    switch (event.type) {
      case STRIPE_EVENTS.PAYMENT_SUCCEEDED:
        result = await handlePaymentSuccess(event.data.object, supabaseClient);
        break;

      case STRIPE_EVENTS.SUBSCRIPTION_CREATED:
      case STRIPE_EVENTS.SUBSCRIPTION_UPDATED:
      case STRIPE_EVENTS.SUBSCRIPTION_DELETED:
        result = await handleSubscriptionChange(event.data.object, event.type, supabaseClient);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});