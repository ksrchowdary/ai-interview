import { useState, useCallback } from 'react';
import { filterInterviews } from '@/lib/utils/filterInterviews';
import type { Interview } from '@/types';
import type { InterviewFilters } from '@/components/interviews/InterviewFilters';

export function useInterviewFilters(interviews: Interview[]) {
  const [filters, setFilters] = useState<InterviewFilters>({
    search: '',
    status: 'all',
    sortBy: 'date',
  });

  const filteredInterviews = filterInterviews(interviews, filters);

  const updateFilters = useCallback((newFilters: InterviewFilters) => {
    setFilters(newFilters);
  }, []);

  return {
    filters,
    filteredInterviews,
    updateFilters,
  };
}