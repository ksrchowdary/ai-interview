import { supabase } from '../supabase';
import { useStore } from '@/store';

interface PerformanceMetrics {
  pageLoadTime: number;
  ttfb: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
}

export function initPerformanceMonitoring() {
  // Get initial user state
  const store = useStore.getState();
  let userId = store.user?.id;

  // Monitor Core Web Vitals
  if ('web-vital' in window) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        logPerformanceMetric(entry.name, entry.value, userId);
      }
    }).observe({ entryTypes: ['web-vital'] });
  }

  // Monitor page load time
  window.addEventListener('load', () => {
    const pageLoadTime = performance.now();
    logPerformanceMetric('pageLoadTime', pageLoadTime, userId);
  });

  // Subscribe to auth state changes
  useStore.subscribe(
    (state) => state.user?.id,
    (newUserId) => {
      userId = newUserId;
      if (userId) {
        const pageLoadTime = performance.now();
        logPerformanceMetric('pageLoadTime', pageLoadTime, userId);
      }
    }
  );
}

async function logPerformanceMetric(
  metric: string, 
  value: number,
  userId?: string
) {
  if (!userId) return;

  try {
    await supabase
      .from('performance_logs')
      .insert([{
        metric,
        value,
        user_id: userId,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }]);
  } catch (error) {
    // Silently fail for performance logging
    console.debug('Failed to log performance metric:', error);
  }
}