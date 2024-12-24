import type { Interview } from '@/types';

export interface ProgressMetrics {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  scoreImprovement: number;
  totalPracticeTime: number;
  strongestTopics: string[];
  areasForImprovement: string[];
}

export function calculateProgress(interviews: Interview[]): ProgressMetrics {
  const completed = interviews.filter(i => i.status === 'completed');
  const scores = completed.map(i => i.feedback?.score || 0);
  
  // Calculate score improvement (comparing last 3 vs first 3 interviews)
  const first3Avg = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3 || 0;
  const last3Avg = scores.slice(-3).reduce((a, b) => a + b, 0) / 3 || 0;
  
  return {
    totalInterviews: interviews.length,
    completedInterviews: completed.length,
    averageScore: scores.reduce((a, b) => a + b, 0) / scores.length || 0,
    scoreImprovement: last3Avg - first3Avg,
    totalPracticeTime: completed.length * 30, // 30 minutes per interview
    strongestTopics: [], // TODO: Implement topic analysis
    areasForImprovement: [], // TODO: Implement improvement areas analysis
  };
}