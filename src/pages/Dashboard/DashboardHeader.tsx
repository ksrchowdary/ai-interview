import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your interview preparation progress.
        </p>
      </div>
      <Button asChild className="gap-2">
        <Link to={ROUTES.NEW_INTERVIEW}>
          <PlusCircle className="h-4 w-4" />
          New Interview
        </Link>
      </Button>
    </div>
  );
}