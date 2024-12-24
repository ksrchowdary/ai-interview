import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { signInWithOAuth } from '@/lib/auth/providers';
import { useToast } from '@/hooks/use-toast';

interface OAuthButtonsProps {
  onMagicLink?: () => void;
}

export function OAuthButtons({ onMagicLink }: OAuthButtonsProps) {
  const { toast } = useToast();

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        onClick={() => handleOAuth('github')}
        className="gap-2"
      >
        <Github className="h-4 w-4" />
        Continue with GitHub
      </Button>
      
      <Button
        variant="outline"
        onClick={onMagicLink}
        className="gap-2"
      >
        <Mail className="h-4 w-4" />
        Continue with Magic Link
      </Button>
    </div>
  );
}