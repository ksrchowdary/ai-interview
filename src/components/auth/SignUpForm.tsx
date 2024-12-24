import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/security/validation';
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
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { OAuthButtons } from './OAuthButtons';
import { MagicLinkForm } from './MagicLinkForm';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignUpFormProps {
  onSignIn: () => void;
}

export function SignUpForm({ onSignIn }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMagicLink, setShowMagicLink] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: SignUpForm) {
    try {
      setIsLoading(true);
      await signUp(data.email, data.password);
      toast({
        title: 'Account created!',
        description: 'You can now sign in with your new account.',
      });
      onSignIn();
    } catch (error) {
      // Error is handled by useAuth
    } finally {
      setIsLoading(false);
    }
  }

  if (showMagicLink) {
    return <MagicLinkForm onBack={() => setShowMagicLink(false)} />;
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose your preferred sign up method
        </p>
      </div>

      <OAuthButtons onMagicLink={() => setShowMagicLink(true)} />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <button
          onClick={onSignIn}
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}