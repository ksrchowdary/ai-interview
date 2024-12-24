import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import { formatDistanceToNow } from '@/lib/utils';

export function SubscriptionStatus() {
  const { subscription, isLoading, cancelSubscription } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No active subscription</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <span className="text-sm capitalize">{subscription.status}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium">Current Period Ends</span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(subscription.current_period_end), { addSuffix: true })}
              </span>
            </div>
          </div>

          {subscription.status === 'active' && !subscription.cancel_at && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={cancelSubscription}
            >
              Cancel Subscription
            </Button>
          )}

          {subscription.cancel_at && (
            <p className="text-sm text-muted-foreground">
              Your subscription will end {' '}
              {formatDistanceToNow(new Date(subscription.cancel_at), { addSuffix: true })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}