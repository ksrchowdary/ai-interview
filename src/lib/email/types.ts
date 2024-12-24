export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface EmailPreferences {
  marketing: boolean;
  transactional: boolean;
  reports: boolean;
  digest: 'daily' | 'weekly' | 'never';
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}