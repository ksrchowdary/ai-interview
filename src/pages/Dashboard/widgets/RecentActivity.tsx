import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ArrowRight, Play } from 'lucide-react';
import { useInterviews } from '@/hooks/useInterviews';
import { formatDistanceToNow } from 'date-fns';

export function RecentActivity() {
  const { interviews } = useInterviews();
  const recentInterviews = interviews.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link to="/interviews">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInterviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Activity className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No recent activity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start practicing to see your activity here
              </p>
            </div>
          ) : (
            recentInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <h4 className="font-medium">{interview.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
                  </p>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/interview/${interview.id}`}>
                    <Play className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}