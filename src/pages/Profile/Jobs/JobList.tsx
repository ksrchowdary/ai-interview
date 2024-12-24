import { useState } from 'react';
import { formatDistanceToNow } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import type { JobDescription } from '@/lib/api/jobs';

interface JobListProps {
  jobs: JobDescription[];
  isLoading?: boolean;
}

export function JobList({ jobs, isLoading }: JobListProps) {
  const { deleteJob } = useJobs();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteJob(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading job descriptions...
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No job descriptions yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your target job descriptions to help tailor your interview practice
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              {job.company && (
                <p className="text-sm text-muted-foreground">{job.company}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(job.id)}
                disabled={deletingId === job.id}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="text-xs text-muted-foreground">
                Added {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}