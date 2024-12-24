import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from '@/lib/utils';
import { getPaymentHistory } from '@/lib/stripe/api';
import type { PaymentHistory as Payment } from '@/lib/stripe/types';

export function PaymentHistory() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const { data } = await getPaymentHistory(user.id);
        if (data) setPayments(data);
      } catch (error) {
        console.error('Failed to load payment history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, [user?.id]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!payments.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No payments yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {formatDistanceToNow(new Date(payment.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.credits}</TableCell>
                <TableCell className="capitalize">{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}