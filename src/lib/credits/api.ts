import { supabase } from '../supabase';
import { QueryError } from '../database/queries';

export async function deductCredits(userId: string, amount: number = 1) {
  if (!userId) throw new QueryError('User ID is required');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;
  if (!profile || profile.credits < amount) {
    throw new QueryError('Insufficient credits');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ credits: profile.credits - amount })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function checkCredits(userId: string, required: number = 1) {
  if (!userId) return { hasCredits: false, remainingCredits: 0, error: 'User not found' };

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) return { hasCredits: false, remainingCredits: 0, error: error.message };

  return {
    hasCredits: profile.credits >= required,
    remainingCredits: profile.credits,
  };
}