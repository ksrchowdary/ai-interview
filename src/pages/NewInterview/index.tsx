import { useSession } from '@/hooks/useSession';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { NewInterviewForm } from './NewInterviewForm';

export function NewInterviewPage() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-lg mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create New Interview</h1>
          <p className="text-muted-foreground mt-2">
            Start a new interview practice session
          </p>
        </div>
        
        <NewInterviewForm />
      </div>
    </div>
  );
}