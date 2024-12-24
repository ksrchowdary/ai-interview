import { supabase } from '../supabase';
import { useStore } from '@/store';
import { getCurrentUser } from './session';
import { initTokenRefresh } from './tokens';

export async function initAuth() {
  const { setUser } = useStore.getState();
  
  try {
    // Get initial user state
    const user = await getCurrentUser();
    if (user) setUser(user);

    // Set up token refresh
    const cleanup = initTokenRefresh();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          return;
        }

        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile);
          }
        } catch (error) {
          console.error('Failed to handle auth change:', error);
          setUser(null);
        }
      }
    );

    // Return cleanup function
    return () => {
      cleanup();
      subscription.unsubscribe();
    };
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
}

export * from './session';
export * from './errors';
export * from './providers';
export * from './tokens';
export * from './rbac';
export * from './profile';