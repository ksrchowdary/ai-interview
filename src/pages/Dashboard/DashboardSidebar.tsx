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
  const { logout } = useAuth();
  const location = useLocation();
  const { isCollapsed, expandedItems, setIsCollapsed, toggleExpand } = useSidebarState();

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-muted/30 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center border-b px-4">
        <Link to={ROUTES.HOME} className="flex items-center">
          {isCollapsed ? (
            <Logo iconOnly />
          ) : (
            <Logo />
          )}
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <SidebarNav
          isCollapsed={isCollapsed}
          expandedItems={expandedItems}
          currentPath={location.pathname}
          onToggleExpand={toggleExpand}
        />
      </div>

      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground",
            isCollapsed && "px-2"
          )}
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && "Sign out"}
        </Button>
      </div>

      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}