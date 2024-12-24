import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { DashboardLayout } from '../../Dashboard/DashboardLayout';
import { JobForm } from './JobForm';
import { JobList } from './JobList';
import type { JobDescription } from '@/lib/api/jobs';

export function JobsPage() {
  const { jobs, isLoading, fetchJobs, createJob } = useJobs();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSubmit = async (data: Omit<JobDescription, 'id' | 'created_at' | 'updated_at'>) => {
    await createJob(data);
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Job Descriptions</h1>
            <p className="text-muted-foreground">
              Manage your target job descriptions and requirements
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>

        {showForm ? (
          <div className="mb-6">
            <JobForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <JobList jobs={jobs} isLoading={isLoading} />
        )}
      </div>
    </DashboardLayout>
  );
}