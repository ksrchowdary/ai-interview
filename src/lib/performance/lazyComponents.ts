import { lazy } from 'react';

// Lazy load heavy components
export const LazyInterviewSession = lazy(() => 
  import('@/components/interviews/InterviewSession').then(mod => ({
    default: mod.InterviewSession
  }))
);

export const LazyAnalytics = lazy(() => 
  import('@/components/analytics/ScoreChart').then(mod => ({
    default: mod.ScoreChart
  }))
);

export const LazyPaymentHistory = lazy(() => 
  import('@/components/credits/PaymentHistory').then(mod => ({
    default: mod.PaymentHistory
  }))
);