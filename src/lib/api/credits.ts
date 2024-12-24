import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';

export async function deductCredits(userId: string, amount: number = 1) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (!profile || profile.credits < amount) {
    throw new QueryError('Insufficient credits');
  }

  return safeQuery(
    supabase
      .from('profiles')
      .update({ credits: profile.credits - amount })
      .eq('id', userId)
      .select()
      .single()
  );
}

export async function addCredits(userId: string, amount: number) {
  return safeQuery(
    supabase
      .from('profiles')
      .update({ 
        credits: supabase.raw(`credits + ${amount}`) 
      })
      .eq('id', userId)
      .select()
      .single()
  );
}