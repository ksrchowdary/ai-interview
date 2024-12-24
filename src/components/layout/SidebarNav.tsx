import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { navigation } from '@/config/navigation';

interface SidebarNavProps {
  isCollapsed: boolean;
  expandedItems: string[];
  currentPath: string;
  onToggleExpand: (name: string) => void;
}

export function SidebarNav({ 
  isCollapsed, 
  expandedItems, 
  currentPath,
  onToggleExpand 
}: SidebarNavProps) {
  const isItemActive = (item: typeof navigation[0]) => {
    if (currentPath === item.href) return true;
    if (item.children) {
      return item.children.some(child => currentPath === child.href);
    }
    return false;
  };

  return (
    <nav className="flex flex-col gap-1">
      {navigation.map((item) => (
        <div key={item.name}>
          {item.children ? (
            <>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between",
                  isCollapsed && "px-2",
                  isItemActive(item) && "bg-accent"
                )}
                onClick={() => !isCollapsed && onToggleExpand(item.name)}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && item.name}
                </span>
                {!isCollapsed && (
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedItems.includes(item.name) && "rotate-180"
                    )} 
                  />
                )}
              </Button>
              {!isCollapsed && expandedItems.includes(item.name) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.href}
                      variant="ghost"
                      asChild
                      className={cn(
                        'w-full justify-start text-sm',
                        currentPath === child.href && 'bg-accent'
                      )}
                    >
                      <Link to={child.href}>{child.name}</Link>
                    </Button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Button
              variant="ghost"
              asChild
              className={cn(
                'w-full justify-start gap-2',
                isCollapsed && "px-2",
                currentPath === item.href && 'bg-accent'
              )}
            >
              <Link to={item.href}>
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
}