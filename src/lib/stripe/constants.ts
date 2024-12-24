// Stripe webhook events we handle
export const STRIPE_EVENTS = {
  PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_FAILED: 'payment_intent.payment_failed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  SUBSCRIPTION_TRIAL_ENDING: 'customer.subscription.trial_will_end',
} as const;

// Subscription status types
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  PAST_DUE: 'past_due',
  TRIALING: 'trialing',
  UNPAID: 'unpaid',
} as const;

// Error messages
export const STRIPE_ERRORS = {
  INVALID_PRICE: 'Invalid price ID',
  INVALID_CUSTOMER: 'Customer not found',
  PAYMENT_FAILED: 'Payment failed',
  SUBSCRIPTION_NOT_FOUND: 'Subscription not found',
  INSUFFICIENT_CREDITS: 'Insufficient credits',
} as const;