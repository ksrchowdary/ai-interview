import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onNewInterview: () => void;
}

export function EmptyState({ onNewInterview }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium">No interviews found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Start practicing to improve your interview skills
      </p>
      <Button 
        className="mt-4"
        onClick={onNewInterview}
      >
        Start New Interview
      </Button>
    </div>
  );
}