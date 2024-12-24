import { useParams, Navigate } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { InterviewSession } from '@/components/interviews/InterviewSession';
import { ROUTES } from '@/lib/routes';

export function InterviewPage() {
  const { id } = useParams();
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  if (!id) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <InterviewSession />;
}