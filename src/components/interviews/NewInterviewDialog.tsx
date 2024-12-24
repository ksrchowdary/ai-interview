import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useInterviews } from '@/hooks/useInterviews';
import { getInterviewRoute } from '@/lib/routes';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type NewInterviewForm = z.infer<typeof schema>;

interface NewInterviewDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NewInterviewDialog({ open, onClose }: NewInterviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { createInterview } = useInterviews();
  const navigate = useNavigate();
  
  const form = useForm<NewInterviewForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: NewInterviewForm) => {
    try {
      setIsLoading(true);
      const interview = await createInterview(data);
      if (interview) {
        navigate(getInterviewRoute(interview.id));
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Interview Session</DialogTitle>
          <DialogDescription>
            Create a new interview practice session
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend Developer Interview" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Start Interview'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}