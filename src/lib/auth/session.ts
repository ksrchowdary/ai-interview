import { supabase } from '../supabase';
import { AuthError } from './errors';
import type { User } from '@/types';

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new AuthError(
        'Failed to get current session',
        error.name,
        error.status
      );
    }
    
    return session;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to get current session');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getCurrentSession();
    if (!session?.user) return null;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    return profile;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}