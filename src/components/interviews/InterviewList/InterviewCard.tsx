import { formatDistanceToNow } from 'date-fns';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, MoreVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Interview } from '@/types';

interface InterviewCardProps {
  interview: Interview;
  onPlay: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function InterviewCard({ 
  interview, 
  onPlay, 
  onDelete,
  isDeleting 
}: InterviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <h3 className="font-semibold">{interview.title}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {interview.status === 'pending' && (
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => onPlay(interview.id)}
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
                disabled={isDeleting}
                onClick={() => onDelete(interview.id)}
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
  );
}