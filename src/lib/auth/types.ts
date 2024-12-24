import type { User } from '@/types';

export type AuthEvent = 
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'USER_UPDATED'
  | 'USER_DELETED';

export interface AuthError {
  message: string;
  status?: number;
}