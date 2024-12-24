import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export class QueryError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
    public readonly details?: string
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

export function handleQueryError(error: PostgrestError): never {
  // PGRST116 means no rows found when using .single()
  if (error.code === 'PGRST116') {
    throw new QueryError('No data found', error.code, error.status, error.details);
  }
  
  throw new QueryError(
    error.message,
    error.code,
    error.status,
    error.details
  );
}

export async function safeQuery<T>(
  query: Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<T | null> {
  const { data, error } = await query;
  
  if (error) {
    // Don't throw for expected "no rows" cases
    if (error.code === 'PGRST116') return null;
    handleQueryError(error);
  }
  
  return data;
}