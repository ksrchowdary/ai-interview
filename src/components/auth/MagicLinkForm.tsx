import { useState } from 'react';
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
import { ArrowLeft } from 'lucide-react';
import { signInWithMagicLink } from '@/lib/auth/providers';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type MagicLinkForm = z.infer<typeof schema>;

interface MagicLinkFormProps {
  onBack: () => void;
}

export function MagicLinkForm({ onBack }: MagicLinkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<MagicLinkForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: MagicLinkForm) {
    try {
      setIsLoading(true);
      await signInWithMagicLink(data.email);
      setSent(true);
      toast({
        title: 'Magic link sent!',
        description: 'Check your email for the login link.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send magic link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {sent ? 'Check your email' : 'Sign in with magic link'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {sent
            ? 'We sent you a login link. Be sure to check your spam too.'
            : 'We will email you a magic link for a password-free sign in.'}
        </p>
      </div>

      {!sent && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send magic link'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}