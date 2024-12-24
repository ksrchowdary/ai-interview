import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className = '' }: AuthButtonsProps) {
  return (
    <div className={`items-center gap-4 ${className}`}>
      <Button 
        variant="ghost" 
        className="text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        Sign In
      </Button>
      <Button 
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Get Started
      </Button>
    </div>
  );
}