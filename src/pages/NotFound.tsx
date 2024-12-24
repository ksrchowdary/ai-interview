import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Page not found
        </p>
        <Button asChild className="mt-4">
          <Link to={ROUTES.HOME}>Go back home</Link>
        </Button>
      </div>
    </div>
  );
}