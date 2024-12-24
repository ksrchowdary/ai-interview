import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { checkCredits, deductCredits } from '@/lib/credits/api';
import type { CreditCheck } from '@/lib/credits/types';

export function useCredits() {
  const { user, setUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const checkAvailableCredits = useCallback(async (required: number = 1): Promise<CreditCheck> => {
    if (!user) {
      return { hasCredits: false, remainingCredits: 0, error: 'Not authenticated' };
    }

    try {
      return await checkCredits(user.id, required);
    } catch (error) {
      console.error('Failed to check credits:', error);
      return { hasCredits: false, remainingCredits: 0, error: 'Failed to check credits' };
    }
  }, [user]);

  const useCredit = useCallback(async (amount: number = 1) => {
    if (!user) return false;

    try {
      setIsProcessing(true);
      const updatedProfile = await deductCredits(user.id, amount);
      if (updatedProfile) {
        setUser(updatedProfile);
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Insufficient Credits',
        description: 'Please purchase more credits to continue.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [user, setUser, toast]);

  return {
    credits: user?.credits || 0,
    isProcessing,
    checkCredits: checkAvailableCredits,
    useCredit,
  };
}