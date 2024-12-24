import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterviews } from '@/hooks/useInterviews';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Play, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ROUTES, getInterviewRoute } from '@/lib/routes';

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

  const handleStart = (id: string) => {
    navigate(getInterviewRoute(id));
  };

  if (!interviews.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground">No interviews found</p>
          <Button 
            className="mt-4"
            onClick={() => navigate(ROUTES.NEW_INTERVIEW)}
          >
            Start New Interview
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <Card key={interview.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{interview.title}</CardTitle>
              <CardDescription>
                {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {interview.status === 'pending' && (
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleStart(interview.id)}
                >
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive"
                    disabled={isDeleting === interview.id}
                    onClick={() => handleDelete(interview.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm">
                  Status: <span className="capitalize">{interview.status}</span>
                </div>
                {interview.feedback && (
                  <div className="text-sm">
                    Score: {interview.feedback.score}%
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}