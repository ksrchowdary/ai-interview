import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Check } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { STRIPE_CONFIG } from '@/lib/stripe/config';

const packages = [
  { 
    id: 'credits_10' as const,
    credits: 10, 
    price: 19,
    features: [
      'Basic interview scenarios',
      'Text feedback',
      'Performance tracking'
    ]
  },
  { 
    id: 'credits_25' as const,
    credits: 25, 
    price: 39,
    popular: true,
    features: [
      'Advanced scenarios',
      'Video feedback',
      'Custom questions',
      'Priority support'
    ]
  },
  { 
    id: 'credits_100' as const,
    credits: 100, 
    price: 99,
    features: [
      'All features',
      'Team management',
      'Custom integrations',
      'Dedicated support'
    ]
  },
];

export function CreditPackages() {
  const { isLoading, handlePurchase } = usePayment();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Purchase Credits</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={pkg.popular ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                {pkg.credits} Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-3xl font-bold">${pkg.price}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  ${(pkg.price / pkg.credits).toFixed(2)} per credit
                </p>
              </div>

              <ul className="space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={pkg.popular ? "default" : "outline"}
                disabled={isLoading}
                onClick={() => handlePurchase(pkg.id)}
              >
                {isLoading ? 'Processing...' : 'Purchase'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}