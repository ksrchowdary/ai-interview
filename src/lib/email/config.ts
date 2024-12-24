import { z } from 'zod';

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  PASSWORD_RESET: 'password-reset',
  INTERVIEW_SUMMARY: 'interview-summary',
  TRANSACTION_CONFIRMATION: 'transaction-confirmation',
  SESSION_REPORT: 'session-report',
} as const;

export const emailPreferencesSchema = z.object({
  marketing: z.boolean().default(true),
  transactional: z.boolean().default(true),
  reports: z.boolean().default(true),
  digest: z.enum(['daily', 'weekly', 'never']).default('weekly'),
});

export type EmailPreferences = z.infer<typeof emailPreferencesSchema>;

export const EMAIL_SUBJECTS = {
  [EMAIL_TEMPLATES.WELCOME]: 'Welcome to InterviewAI! 🎉',
  [EMAIL_TEMPLATES.PASSWORD_RESET]: 'Reset Your Password',
  [EMAIL_TEMPLATES.INTERVIEW_SUMMARY]: 'Your Interview Summary',
  [EMAIL_TEMPLATES.TRANSACTION_CONFIRMATION]: 'Transaction Confirmation',
  [EMAIL_TEMPLATES.SESSION_REPORT]: 'Your Interview Session Report',
} as const;