import { Logo } from '@/components/layout/Logo';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
  onClose: () => void;
}

export function AuthPage({ mode, onClose }: AuthPageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <div className="min-h-full w-full max-w-[400px] p-4 sm:p-6">
          <div className="relative mt-8 rounded-lg bg-background p-6 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            
            <div className="mb-8">
              <Logo className="mx-auto" />
            </div>

            {mode === 'sign-in' ? (
              <SignInForm onSignUp={onClose} />
            ) : (
              <SignUpForm onSignIn={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}