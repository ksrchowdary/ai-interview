import { User } from '@/types';

export type Role = 'user' | 'admin';

export interface Permission {
  action: string;
  subject: string;
}

const rolePermissions: Record<Role, Permission[]> = {
  user: [
    { action: 'read', subject: 'interviews' },
    { action: 'create', subject: 'interviews' },
    { action: 'update', subject: 'interviews' },
    { action: 'delete', subject: 'interviews' },
  ],
  admin: [
    { action: 'manage', subject: 'all' },
  ],
};

export function can(user: User | null, action: string, subject: string): boolean {
  if (!user) return false;
  
  const role = user.role as Role || 'user';
  const permissions = rolePermissions[role];
  
  return permissions.some(permission => {
    if (permission.action === 'manage' && permission.subject === 'all') {
      return true;
    }
    
    return permission.action === action && permission.subject === subject;
  });
}