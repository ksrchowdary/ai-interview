export function transactionTemplate(data: {
  type: 'purchase' | 'subscription';
  amount: number;
  credits: number;
  date: string;
}) {
  return `
    <h1>Transaction Confirmation</h1>
    <div style="margin:20px 0;padding:20px;background:#f5f5f5;border-radius:4px;">
      <p><strong>Type:</strong> ${data.type === 'purchase' ? 'Credit Purchase' : 'Subscription'}</p>
      <p><strong>Amount:</strong> $${data.amount}</p>
      <p><strong>Credits:</strong> ${data.credits}</p>
      <p><strong>Date:</strong> ${data.date}</p>
    </div>
  `;
}