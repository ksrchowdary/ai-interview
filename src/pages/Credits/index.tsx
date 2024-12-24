import { DashboardLayout } from '../Dashboard/DashboardLayout';
import { CreditBalance } from '@/components/credits/CreditBalance';
import { PaymentHistory } from '@/components/credits/PaymentHistory';
import { CreditPackages } from '@/components/credits/CreditPackages';
import { SubscriptionStatus } from '@/components/credits/SubscriptionStatus';

export function CreditsPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Credits</h1>
          <p className="text-muted-foreground">
            Manage your interview credits and subscriptions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <CreditBalance />
          <SubscriptionStatus />
        </div>

        <div className="space-y-8">
          <CreditPackages />
          <PaymentHistory />
        </div>
      </div>
    </DashboardLayout>
  );
}