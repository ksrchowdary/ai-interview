import { useSession } from '@/hooks/useSession';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { DashboardLayout } from '../Dashboard/DashboardLayout';
import { ProfileForm } from './ProfileForm';

export function ProfilePage() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
}