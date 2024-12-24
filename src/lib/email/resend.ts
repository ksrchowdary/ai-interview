import { supabase } from '../supabase';
import type { EmailOptions } from './types';

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { error } = await supabase.functions.invoke('send-email', {
    body: options
  });

  if (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function checkEmailPreferences(userId: string, type: string): Promise<boolean> {
  const { data: prefs, error } = await supabase
    .from('email_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Failed to get email preferences:', error);
    return false;
  }

  switch (type) {
    case 'marketing':
      return prefs.marketing;
    case 'transactional':
      return prefs.transactional;
    case 'reports':
      return prefs.reports;
    default:
      return false;
  }
}