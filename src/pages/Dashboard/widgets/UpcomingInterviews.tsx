import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useInterviews } from '@/hooks/useInterviews';
import { NewInterviewDialog } from '@/components/interviews/NewInterviewDialog';

interface UpcomingInterviewsProps {
  className?: string;
}

export function UpcomingInterviews({ className }: UpcomingInterviewsProps) {
  const [showNewInterview, setShowNewInterview] = useState(false);
  const { interviews } = useInterviews();

  const pendingInterviews = interviews.filter(
    interview => interview.status === 'pending'
  ).slice(0, 3);

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Upcoming Interviews
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-2">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingInterviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No interviews scheduled</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Schedule your next practice interview to stay prepared
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => setShowNewInterview(true)}
                >
                  Schedule Interview
                </Button>
              </div>
            ) : (
              pendingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h4 className="font-medium">{interview.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(interview.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm">Start</Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <NewInterviewDialog
        open={showNewInterview}
        onClose={() => setShowNewInterview(false)}
      />
    </>
  );
}