import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/Logo';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSidebarState } from '@/hooks/useSidebarState';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { ROUTES } from '@/lib/routes';

export function DashboardSidebar() {
  const { signOut } = useAuth();
  const location = useLocation();
  const { isCollapsed, expandedItems, setIsCollapsed, toggleExpand } = useSidebarState();

  return (
    <div className={cn(
      "flex h-screen flex-col border-r bg-white transition-all duration-300 sticky top-0",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <div className="flex h-16 items-center border-b px-6">
        <Link to={ROUTES.HOME} className="flex items-center">
          {isCollapsed ? (
            <Logo iconOnly />
          ) : (
            <Logo />
          )}
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <SidebarNav
          isCollapsed={isCollapsed}
          expandedItems={expandedItems}
          currentPath={location.pathname}
          onToggleExpand={toggleExpand}
        />
      </div>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground hover:text-primary",
            isCollapsed && "justify-center px-0"
          )}
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && "Sign out"}
        </Button>
      </div>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-full hover:text-primary"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}