import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InterviewFiltersProps {
  onFilterChange: (filters: InterviewFilters) => void;
}

export interface InterviewFilters {
  search: string;
  status: string;
  sortBy: 'date' | 'score';
}

export function InterviewFilters({ onFilterChange }: InterviewFiltersProps) {
  const [filters, setFilters] = useState<InterviewFilters>({
    search: '',
    status: 'all',
    sortBy: 'date',
  });

  const handleChange = (key: keyof InterviewFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-6">
      <Input
        placeholder="Search interviews..."
        value={filters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        className="max-w-sm"
      />
      
      <Select
        value={filters.status}
        onValueChange={(value) => handleChange('status', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(value) => handleChange('sortBy', value as 'date' | 'score')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="score">Score</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}