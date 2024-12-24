import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';
import { useInterviews } from '@/hooks/useInterviews';
import { getInterviewRoute } from '@/lib/routes';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  jobDescriptionId: z.string().min(1, 'Please select a job description'),
});

type NewInterviewForm = z.infer<typeof schema>;

export function NewInterviewForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { jobs } = useJobs();
  const { createInterview } = useInterviews();
  const navigate = useNavigate();
  
  const form = useForm<NewInterviewForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      jobDescriptionId: '',
    },
  });

  const onSubmit = async (data: NewInterviewForm) => {
    try {
      setIsLoading(true);
      const interview = await createInterview({
        title: data.title,
        jobDescriptionId: data.jobDescriptionId,
      });
      
      if (interview) {
        navigate(getInterviewRoute(interview.id));
      }
    } catch (error) {
      console.error('Failed to create interview:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Failed to create interview. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Frontend Developer Interview" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobDescriptionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job description" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} {job.company ? `at ${job.company}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Start Interview'}
          </Button>
        </div>
      </form>
    </Form>
  );
}