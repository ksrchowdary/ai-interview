import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';

export function CreditBalance() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Interview Credits</CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{user?.credits || 0}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Used for practice interviews
        </p>
      </CardContent>
    </Card>
  );
}