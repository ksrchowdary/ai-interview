import { supabase } from '../supabase';
import { AuthError } from './errors';

// Refresh token if it's close to expiring
export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (!session) return null;
    
    // Refresh if token expires in less than 60 minutes
    const expiresAt = session.expires_at || 0;
    const shouldRefresh = (expiresAt * 1000) - Date.now() < 1000 * 60 * 60;
    
    if (shouldRefresh) {
      const { data: { session: newSession }, error: refreshError } = 
        await supabase.auth.refreshSession();
        
      if (refreshError) throw new AuthError(refreshError.message);
      return newSession;
    }
    
    return session;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to refresh session');
  }
}

// Set up auto refresh of tokens
export function initTokenRefresh() {
  // Check token every 30 minutes
  const REFRESH_INTERVAL = 1000 * 60 * 30;
  
  const interval = setInterval(async () => {
    try {
      await refreshSession();
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  }, REFRESH_INTERVAL);

  return () => clearInterval(interval);
}