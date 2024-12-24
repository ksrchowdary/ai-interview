import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from './DashboardLayout';
import { DashboardHeader } from './DashboardHeader';
import { UpcomingInterviews } from './widgets/UpcomingInterviews';
import { InterviewStats } from './widgets/InterviewStats';
import { RecentActivity } from './widgets/RecentActivity';
import { CreditsWidget } from './widgets/CreditsWidget';

export function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreditsWidget />
        <InterviewStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <UpcomingInterviews className="lg:col-span-2" />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}