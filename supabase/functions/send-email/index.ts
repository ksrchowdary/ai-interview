import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/@resend/server';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  try {
    const { to, subject, html, replyTo } = await req.json();

    // Validate required fields
    if (!to || !subject || !html) {
      throw new Error('Missing required fields');
    }

    const data = await resend.emails.send({
      from: Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@interviewai.com',
      to,
      subject,
      html,
      reply_to: replyTo,
    });

    // Log email send attempt
    await logEmailSend(to, subject, 'success');

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Log failed email attempt
    await logEmailSend(error.to, error.subject, 'failed', error.message);

    return new Response(
      JSON.stringify({ 
        error: error.message,
        code: error.statusCode 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: error.statusCode || 400,
      }
    );
  }
});

async function logEmailSend(
  to: string,
  subject: string,
  status: 'success' | 'failed',
  error?: string
) {
  const { supabaseClient } = await import('./supabase.ts');
  
  await supabaseClient
    .from('email_logs')
    .insert({
      to,
      subject,
      status,
      error,
      sent_at: new Date().toISOString(),
    });
}