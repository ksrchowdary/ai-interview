import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'sign-in' | 'sign-up';
}

export function AuthDialog({ isOpen, onClose, defaultView = 'sign-in' }: AuthDialogProps) {
  const [view, setView] = useState<'sign-in' | 'sign-up'>(defaultView);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogTitle className="sr-only">
          {view === 'sign-in' ? 'Sign In' : 'Create Account'}
        </DialogTitle>
        {view === 'sign-in' ? (
          <SignInForm onSignUp={() => setView('sign-up')} />
        ) : (
          <SignUpForm onSignIn={() => setView('sign-in')} />
        )}
      </DialogContent>
    </Dialog>
  );
}