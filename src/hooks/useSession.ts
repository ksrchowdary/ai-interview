import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { refreshSession } from '@/lib/auth/tokens';
import { ROUTES } from '@/lib/routes';

const SESSION_CHECK_INTERVAL = 1000 * 60 * 5; // 5 minutes

export function useSession(requireAuth = true) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate, requireAuth]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial token refresh
    refreshSession().catch(console.error);

    // Set up periodic token refresh
    const interval = setInterval(() => {
      refreshSession().catch(console.error);
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return { isAuthenticated };
}