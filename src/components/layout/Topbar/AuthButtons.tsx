import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthPage } from '@/components/auth/AuthPage';
import { useAuth } from '@/hooks/useAuth';

interface AuthButtonsProps {
  className?: string;
  size?: 'default' | 'lg';
}

export function AuthButtons({ className = '', size = 'default' }: AuthButtonsProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { user, signOut } = useAuth();

  const handleAuth = (mode: 'sign-in' | 'sign-up') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  if (user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button 
          variant="ghost" 
          onClick={signOut}
          className={`${size === 'lg' ? 'text-lg' : 'text-base'}`}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <Button 
          variant="ghost" 
          onClick={() => handleAuth('sign-in')}
          className={`${size === 'lg' ? 'text-lg' : 'text-base'}`}
        >
          Sign in
        </Button>
        <Button 
          onClick={() => handleAuth('sign-up')}
          className={`${size === 'lg' ? 'text-lg' : 'text-base'}`}
        >
          Get started
        </Button>
      </div>

      {showAuth && (
        <AuthPage 
          mode={authMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}