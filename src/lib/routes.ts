import { SUPPORT_ROUTES } from './constants';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  INTERVIEWS: '/interviews',
  ANALYTICS: '/analytics',
  CREDITS: '/credits',
  NEW_INTERVIEW: '/interview/new',
  INTERVIEW: '/interview/:id',
  PROFILE: '/profile',
  DOCUMENTS: '/profile/documents',
  JOB_DESCRIPTIONS: '/profile/jobs',
  SKILLS: '/profile/skills',
  SETTINGS: '/settings',
  HELP: '/help',
  ...SUPPORT_ROUTES,
} as const;

export const getInterviewRoute = (id: string) => `/interview/${id}`;