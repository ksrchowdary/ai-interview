import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Interview } from '@/types';

interface ScoreChartProps {
  interviews: Interview[];
}

export function ScoreChart({ interviews }: ScoreChartProps) {
  const data = interviews
    .filter(interview => interview.feedback?.score)
    .map(interview => ({
      date: new Date(interview.created_at).toLocaleDateString(),
      score: interview.feedback?.score || 0,
    }))
    .slice(-10);

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="dashboard-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date"
                padding={{ left: 0, right: 0 }}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                domain={[0, 100]}
                padding={{ top: 20, bottom: 0 }}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  padding: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}