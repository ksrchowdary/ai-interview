import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { AuthError } from '@/lib/auth/errors';
import { ROUTES } from '@/lib/routes';

export function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, logout: storeLogout } = useStore(
    (state) => ({
      user: state.user,
      setUser: state.setUser,
      logout: state.logout,
    })
  );
  const { toast } = useToast();

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new AuthError(
          'Invalid email or password',
          error.name,
          error.status
        );
      }
      
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      throw error;
    }
  }, [toast]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            credits: 3, // Starting credits for new users
          },
        },
      });
      
      if (error) {
        throw new AuthError(
          'Failed to create account',
          error.name,
          error.status
        );
      }
      
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      throw error;
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear store state
      storeLogout();
      
      // Show success message
      toast({
        title: 'Signed out successfully',
        description: 'Come back soon!',
      });
      
      // Redirect to landing page
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  }, [storeLogout, navigate, toast]);

  return {
    user,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
}