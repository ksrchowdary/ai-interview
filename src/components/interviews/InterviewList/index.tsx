import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useInterviews } from '@/hooks/useInterviews';
import { ROUTES } from '@/lib/routes';
import { InterviewCard } from './InterviewCard';
import { EmptyState } from './EmptyState';

export function InterviewList() {
  const navigate = useNavigate();
  const { interviews, deleteInterview } = useInterviews();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteInterview(id);
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePlay = (id: string) => {
    navigate(`/interview/${id}`);
  };

  if (!interviews.length) {
    return (
      <Card>
        <EmptyState onNewInterview={() => navigate(ROUTES.NEW_INTERVIEW)} />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onPlay={handlePlay}
          onDelete={handleDelete}
          isDeleting={isDeleting === interview.id}
        />
      ))}
    </div>
  );
}