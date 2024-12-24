import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useInterviews } from '@/hooks/useInterviews';
import { useInterviewFilters } from '@/hooks/useInterviewFilters';
import { InterviewsTable } from './InterviewsTable';
import { InterviewFilters } from '@/components/interviews/InterviewFilters';
import { DashboardLayout } from '../Dashboard/DashboardLayout';
import { ROUTES } from '@/lib/routes';

export function InterviewsPage() {
  const { interviews, deleteInterview } = useInterviews();
  const { filteredInterviews, updateFilters } = useInterviewFilters(interviews);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Interviews</h1>
            <p className="text-muted-foreground">
              Manage your interview practice sessions
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to={ROUTES.NEW_INTERVIEW}>
              <PlusCircle className="h-4 w-4" />
              New Interview
            </Link>
          </Button>
        </div>

        <InterviewFilters onFilterChange={updateFilters} />

        {filteredInterviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No interviews found</p>
            <Button asChild className="mt-4">
              <Link to={ROUTES.NEW_INTERVIEW}>Start your first interview</Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <InterviewsTable
              interviews={filteredInterviews}
              onDelete={deleteInterview}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}