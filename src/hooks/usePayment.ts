import { useState } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { createCheckoutSession } from '@/lib/stripe/api';
import type { PriceId } from '@/lib/stripe/config';

export function usePayment() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (priceId: PriceId) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to purchase credits',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const session = await createCheckoutSession(user.id, priceId);
      window.location.href = session.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handlePurchase,
  };
}