import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateProgress } from '@/lib/analytics/progress';
import type { Interview } from '@/types';

interface ProgressMetricsProps {
  interviews: Interview[];
}

export function ProgressMetrics({ interviews }: ProgressMetricsProps) {
  const metrics = calculateProgress(interviews);
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Average Score</span>
            <span className="text-sm text-muted-foreground">
              {metrics.averageScore.toFixed(1)}%
            </span>
          </div>
          <Progress value={metrics.averageScore} />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm text-muted-foreground">
              {((metrics.completedInterviews / metrics.totalInterviews) * 100).toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={(metrics.completedInterviews / metrics.totalInterviews) * 100} 
          />
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Score Improvement</p>
          <p className="text-2xl font-bold">
            {metrics.scoreImprovement > 0 ? '+' : ''}
            {metrics.scoreImprovement.toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">
            Compared to your first 3 interviews
          </p>
        </div>
      </CardContent>
    </Card>
  );
}