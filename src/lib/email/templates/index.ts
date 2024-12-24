import { EMAIL_TEMPLATES } from '../config';
import { welcomeTemplate } from './welcome';
import { passwordResetTemplate } from './password-reset';
import { interviewSummaryTemplate } from './interview-summary';
import { transactionTemplate } from './transaction';
import { sessionReportTemplate } from './session-report';

export const templates = {
  [EMAIL_TEMPLATES.WELCOME]: welcomeTemplate,
  [EMAIL_TEMPLATES.PASSWORD_RESET]: passwordResetTemplate,
  [EMAIL_TEMPLATES.INTERVIEW_SUMMARY]: interviewSummaryTemplate,
  [EMAIL_TEMPLATES.TRANSACTION_CONFIRMATION]: transactionTemplate,
  [EMAIL_TEMPLATES.SESSION_REPORT]: sessionReportTemplate,
} as const;