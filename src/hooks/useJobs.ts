import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from './useQuery';
import { useToast } from './use-toast';
import {
  getJobDescriptions,
  createJobDescription,
  updateJobDescription,
  deleteJobDescription,
  type JobDescription,
} from '@/lib/api/jobs';

export function useJobs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const { execute, isLoading } = useQuery<JobDescription[]>();

  const fetchJobs = useCallback(async () => {
    if (!user) return;
    
    const data = await execute(
      () => getJobDescriptions(user.id),
      {
        onSuccess: (data) => {
          if (data) setJobs(data);
        },
      }
    );
    
    return data;
  }, [user, execute]);

  const createJob = useCallback(async (data: Omit<JobDescription, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const job = await execute(
      () => createJobDescription(user.id, data),
      {
        onSuccess: (data) => {
          if (data) {
            setJobs(prev => [data, ...prev]);
            toast({
              title: 'Success',
              description: 'Job description saved successfully',
            });
          }
        },
      }
    );

    return job;
  }, [user, execute, toast]);

  const updateJob = useCallback(async (id: string, data: Partial<JobDescription>) => {
    if (!user) return null;

    const job = await execute(
      () => updateJobDescription(user.id, id, data),
      {
        onSuccess: (data) => {
          if (data) {
            setJobs(prev => prev.map(j => j.id === id ? data : j));
            toast({
              title: 'Success',
              description: 'Job description updated successfully',
            });
          }
        },
      }
    );

    return job;
  }, [user, execute, toast]);

  const deleteJob = useCallback(async (id: string) => {
    if (!user) return;

    await execute(
      () => deleteJobDescription(user.id, id),
      {
        onSuccess: () => {
          setJobs(prev => prev.filter(j => j.id !== id));
          toast({
            title: 'Success',
            description: 'Job description deleted successfully',
          });
        },
      }
    );
  }, [user, execute, toast]);

  return {
    jobs,
    isLoading,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
  };
}