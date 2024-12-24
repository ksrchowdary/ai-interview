import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from './useQuery';
import { useToast } from './use-toast';
import {
  getInterviews,
  createInterview,
  deleteInterview,
} from '@/lib/api/interviews';
import type { Interview } from '@/types';

export function useInterviews() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const { execute, isLoading } = useQuery<Interview[]>();

  const fetchInterviews = useCallback(async () => {
    if (!user) return;
    
    const data = await execute(
      () => getInterviews(user.id),
      {
        onSuccess: (data) => {
          if (data) setInterviews(data);
        },
      }
    );
    
    return data;
  }, [user, execute]);

  const createNewInterview = useCallback(async (title: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create an interview',
        variant: 'destructive',
      });
      return null;
    }

    const interview = await execute(
      () => createInterview({
        user_id: user.id,
        title,
      }),
      {
        onSuccess: (data) => {
          if (data) {
            setInterviews(prev => [data, ...prev]);
            toast({
              title: 'Interview created',
              description: 'Your new interview session has been created.',
            });
          }
        },
      }
    );

    return interview;
  }, [user, execute, toast]);

  const deleteExistingInterview = useCallback(async (id: string) => {
    if (!user) return;

    await execute(
      () => deleteInterview(id, user.id),
      {
        onSuccess: () => {
          setInterviews(prev => prev.filter(i => i.id !== id));
          toast({
            title: 'Interview deleted',
            description: 'Your interview session has been deleted.',
          });
        },
      }
    );
  }, [user, execute, toast]);

  return {
    interviews,
    isLoading,
    fetchInterviews,
    createInterview: createNewInterview,
    deleteInterview: deleteExistingInterview,
  };
}