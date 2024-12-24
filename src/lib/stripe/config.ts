// Stripe API configuration
export const STRIPE_CONFIG = {
  // Price IDs from your Stripe Dashboard
  prices: {
    credits_10: 'price_H5ggYwtDq5YPwb',  // $19 for 10 credits
    credits_25: 'price_H5ggYwtDq5YPwc',  // $39 for 25 credits
    credits_100: 'price_H5ggYwtDq5YPwd', // $99 for 100 credits
  },

  // Credit amounts corresponding to price IDs
  creditAmounts: {
    credits_10: 10,
    credits_25: 25,
    credits_100: 100,
  },

  // Subscription plans
  subscriptions: {
    monthly: {
      starter: 'price_H5ggYwtDq5YPwe',    // $29/month - 50 credits/month
      professional: 'price_H5ggYwtDq5YPwf', // $49/month - 100 credits/month
      enterprise: 'price_H5ggYwtDq5YPwg',  // $99/month - 250 credits/month
    },
    yearly: {
      starter: 'price_H5ggYwtDq5YPwh',     // $290/year - 50 credits/month
      professional: 'price_H5ggYwtDq5YPwi', // $490/year - 100 credits/month
      enterprise: 'price_H5ggYwtDq5YPwj',   // $990/year - 250 credits/month
    }
  },

  // Credit allocations for subscription plans
  subscriptionCredits: {
    starter: 50,
    professional: 100,
    enterprise: 250
  }
} as const;

export type PriceId = keyof typeof STRIPE_CONFIG.prices;
export type SubscriptionPlanId = keyof typeof STRIPE_CONFIG.subscriptionCredits;