import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Play, Archive, Trash, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Interview } from '@/types';

interface InterviewsTableProps {
  interviews: Interview[];
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

export function InterviewsTable({ interviews, onDelete, onArchive }: InterviewsTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await onDelete(id);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Score</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.map((interview) => (
          <TableRow key={interview.id}>
            <TableCell className="font-medium">{interview.title}</TableCell>
            <TableCell className="capitalize">{interview.status}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
            </TableCell>
            <TableCell>
              {interview.feedback?.score ? `${interview.feedback.score}%` : '-'}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/interview/${interview.id}`}>
                    <Play className="h-4 w-4" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onArchive(interview.id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}