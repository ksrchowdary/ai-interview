import { useState, useCallback } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { useToast } from './use-toast';
import { QueryError } from '@/lib/database/queries';

interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

interface QueryOptions {
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

export function useQuery<T>() {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  const { toast } = useToast();

  const execute = useCallback(async (
    queryFn: () => Promise<T | null>,
    options?: QueryOptions
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await queryFn();
      setState({ data, error: null, isLoading: false });
      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      const queryError = error instanceof QueryError 
        ? error 
        : new QueryError('An unexpected error occurred');

      setState({ data: null, error: queryError, isLoading: false });
      
      // Show toast for unexpected errors only
      if (queryError.code !== 'PGRST116') {
        toast({
          title: 'Error',
          description: queryError.message,
          variant: 'destructive',
        });
      }

      options?.onError?.(queryError);
      return null;
    }
  }, [toast]);

  return {
    ...state,
    execute,
  };
}