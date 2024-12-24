import type { Interview } from '@/types';
import type { InterviewFilters } from '@/components/interviews/InterviewFilters';

export function filterInterviews(
  interviews: Interview[],
  filters: InterviewFilters
): Interview[] {
  return interviews
    .filter((interview) => {
      // Search filter
      if (filters.search && !interview.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && interview.status !== filters.status) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by date or score
      if (filters.sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      
      const scoreA = a.feedback?.score || 0;
      const scoreB = b.feedback?.score || 0;
      return scoreB - scoreA;
    });
}