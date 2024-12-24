import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, Target, TrendingUp } from 'lucide-react';
import type { Interview } from '@/types';

interface StatsGridProps {
  interviews: Interview[];
}

export function StatsGrid({ interviews }: StatsGridProps) {
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter(i => i.status === 'completed').length;
  const averageScore = interviews
    .filter(i => i.feedback?.score)
    .reduce((acc, i) => acc + (i.feedback?.score || 0), 0) / completedInterviews || 0;
  
  const stats = [
    {
      title: 'Total Interviews',
      value: totalInterviews,
      icon: Activity,
      color: 'text-blue-500',
    },
    {
      title: 'Completed',
      value: completedInterviews,
      icon: Target,
      color: 'text-green-500',
    },
    {
      title: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      title: 'Practice Time',
      value: `${(completedInterviews * 30).toFixed(0)}m`,
      icon: Clock,
      color: 'text-orange-500',
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={cn("h-4 w-4", stat.color)} />
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}