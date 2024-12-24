import { useEffect } from 'react';
import { useInterviews } from '@/hooks/useInterviews';
import { DashboardLayout } from '../Dashboard/DashboardLayout';
import { StatsGrid } from '@/components/analytics/StatsGrid';
import { ScoreChart } from '@/components/analytics/ScoreChart';
import { ProgressMetrics } from '@/components/analytics/ProgressMetrics';

export function AnalyticsPage() {
  const { interviews, fetchInterviews } = useInterviews();

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your interview performance and progress
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatsGrid interviews={interviews} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ScoreChart interviews={interviews} />
          <ProgressMetrics interviews={interviews} />
        </div>
      </div>
    </DashboardLayout>
  );
}