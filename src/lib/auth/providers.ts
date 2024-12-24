import { supabase } from '../supabase';
import { AuthError } from './errors';
import type { Provider } from '@supabase/supabase-js';

export type OAuthProvider = 'google' | 'github';

export async function signInWithOAuth(provider: OAuthProvider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw new AuthError(error.message);
    return data;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to sign in with OAuth provider');
  }
}

export async function signInWithMagicLink(email: string) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw new AuthError(error.message);
    return data;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to send magic link');
  }
}