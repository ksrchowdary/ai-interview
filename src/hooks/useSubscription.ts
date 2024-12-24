import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { 
  getSubscription, 
  cancelSubscription 
} from '@/lib/stripe/subscriptions';
import type { Subscription } from '@/lib/stripe/types';

export function useSubscription() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const data = await getSubscription(user.id);
        setSubscription(data);
      } catch (error) {
        console.error('Failed to load subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, [user?.id]);

  const handleCancel = async () => {
    if (!subscription?.id) return;

    try {
      await cancelSubscription(subscription.id);
      toast({
        title: 'Subscription canceled',
        description: 'Your subscription will end at the current billing period.',
      });
      // Refresh subscription data
      const updated = await getSubscription(user!.id);
      setSubscription(updated);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return {
    subscription,
    isLoading,
    cancelSubscription: handleCancel,
  };
}