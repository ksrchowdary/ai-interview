import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';

export function CreditsWidget() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Available Credits
        </CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{user?.credits || 0}</div>
        <Button variant="link" className="mt-2 h-auto p-0">
          Get more credits
        </Button>
      </CardContent>
    </Card>
  );
}