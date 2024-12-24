import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/button';
import { User, FileText, Briefcase, Lightbulb } from 'lucide-react';

interface ProfileLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Profile', href: ROUTES.PROFILE, icon: User },
  { name: 'Documents', href: ROUTES.DOCUMENTS, icon: FileText },
  { name: 'Job Descriptions', href: ROUTES.JOB_DESCRIPTIONS, icon: Briefcase },
  { name: 'Skills', href: ROUTES.SKILLS, icon: Lightbulb },
];

export function ProfileLayout({ children }: ProfileLayoutProps) {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={cn(
                  'w-full justify-start gap-2',
                  location.pathname === item.href && 'bg-accent'
                )}
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}