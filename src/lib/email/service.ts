import { supabase } from '../supabase';
import { EMAIL_TEMPLATES, EMAIL_SUBJECTS } from './config';
import { templates } from './templates';
import type { EmailPreferences } from './config';

export class EmailService {
  private static async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html }
    });

    if (error) throw error;
  }

  private static async getUserPreferences(userId: string): Promise<EmailPreferences> {
    const { data, error } = await supabase
      .from('email_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = templates[EMAIL_TEMPLATES.WELCOME]({ name });
    await this.sendEmail(to, EMAIL_SUBJECTS[EMAIL_TEMPLATES.WELCOME], html);
  }

  static async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    const html = templates[EMAIL_TEMPLATES.PASSWORD_RESET]({ resetLink });
    await this.sendEmail(to, EMAIL_SUBJECTS[EMAIL_TEMPLATES.PASSWORD_RESET], html);
  }

  static async sendInterviewSummary(userId: string, interviewId: string): Promise<void> {
    const prefs = await this.getUserPreferences(userId);
    if (!prefs.reports) return;

    // Get interview data and generate summary
    const { data: interview } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (!interview) return;

    const html = templates[EMAIL_TEMPLATES.INTERVIEW_SUMMARY]({
      interview,
      score: interview.feedback?.score || 0,
      strengths: interview.feedback?.strengths || [],
      improvements: interview.feedback?.improvements || [],
    });

    await this.sendEmail(
      interview.user_email,
      EMAIL_SUBJECTS[EMAIL_TEMPLATES.INTERVIEW_SUMMARY],
      html
    );
  }

  static async sendTransactionConfirmation(
    to: string,
    type: 'purchase' | 'subscription',
    amount: number,
    credits: number
  ): Promise<void> {
    const html = templates[EMAIL_TEMPLATES.TRANSACTION_CONFIRMATION]({
      type,
      amount,
      credits,
      date: new Date().toLocaleDateString(),
    });

    await this.sendEmail(
      to,
      EMAIL_SUBJECTS[EMAIL_TEMPLATES.TRANSACTION_CONFIRMATION],
      html
    );
  }

  static async sendSessionReport(userId: string): Promise<void> {
    const prefs = await this.getUserPreferences(userId);
    if (!prefs.reports) return;

    // Get user's interview data
    const { data: interviews } = await supabase
      .from('interviews')
      .select('*')
      .eq('user_id', userId);

    if (!interviews?.length) return;

    const totalSessions = interviews.length;
    const averageScore = interviews.reduce((acc, curr) => 
      acc + (curr.feedback?.score || 0), 0) / totalSessions;
    const timeSpent = totalSessions * 30; // Assuming 30 minutes per session
    const topSkills = ['Communication', 'Problem Solving']; // TODO: Implement skill analysis

    const html = templates[EMAIL_TEMPLATES.SESSION_REPORT]({
      totalSessions,
      averageScore,
      timeSpent,
      topSkills,
    });

    const { data: user } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single();

    if (!user?.email) return;

    await this.sendEmail(
      user.email,
      EMAIL_SUBJECTS[EMAIL_TEMPLATES.SESSION_REPORT],
      html
    );
  }
}