import {
  LayoutDashboard,
  History,
  BarChart2,
  User,
  Settings,
  HelpCircle,
  Coins,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const navigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Interviews', href: ROUTES.INTERVIEWS, icon: History },
  { name: 'Analytics', href: ROUTES.ANALYTICS, icon: BarChart2 },
  { name: 'Credits', href: ROUTES.CREDITS, icon: Coins },
  { 
    name: 'Profile', 
    href: ROUTES.PROFILE, 
    icon: User,
    children: [
      { name: 'Documents', href: ROUTES.DOCUMENTS },
      { name: 'Job Descriptions', href: ROUTES.JOB_DESCRIPTIONS },
      { name: 'Skills', href: ROUTES.SKILLS },
    ]
  },
  { name: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
  { name: 'Help', href: ROUTES.HELP, icon: HelpCircle },
] as const;