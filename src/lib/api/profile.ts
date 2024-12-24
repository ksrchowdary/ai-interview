import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';
import type { User } from '@/types';

export interface ProfileUpdateData {
  name?: string;
  headline?: string;
  bio?: string;
  experience_level?: string;
}

export async function updateProfile(userId: string, data: ProfileUpdateData): Promise<User> {
  const { name, headline, bio, experience_level } = data;
  
  return safeQuery(
    supabase
      .from('profiles')
      .update({
        name,
        headline,
        bio,
        experience_level,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()
  );
}