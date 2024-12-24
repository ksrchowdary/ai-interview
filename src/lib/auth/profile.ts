import { supabase } from '../supabase';
import { AuthError } from './errors';
import { safeQuery } from '../database/queries';
import type { User } from '@/types';

export async function getProfile(userId: string): Promise<User | null> {
  try {
    return await safeQuery(
      supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    );
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to fetch profile');
  }
}

export async function createProfile(userId: string, email: string): Promise<User> {
  try {
    const profile = await safeQuery(
      supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email,
            credits: 3,
          },
        ])
        .select()
        .single()
    );

    if (!profile) {
      throw new AuthError('Failed to create profile');
    }

    return profile;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to create profile');
  }
}

export async function ensureProfile(userId: string, email: string): Promise<User> {
  const profile = await getProfile(userId);
  if (profile) return profile;
  return createProfile(userId, email);
}