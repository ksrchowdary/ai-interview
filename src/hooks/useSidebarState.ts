import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { navigation } from '@/config/navigation';

export function useSidebarState() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    setExpandedItems(prev => {
      const newExpanded = [...prev];
      navigation.forEach(item => {
        if (item.children) {
          const isActive = item.children.some(child => location.pathname === child.href);
          const isExpanded = newExpanded.includes(item.name);
          
          if (isActive && !isExpanded) {
            newExpanded.push(item.name);
          }
        }
      });
      return newExpanded;
    });
  }, [location.pathname]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return {
    isCollapsed,
    expandedItems,
    setIsCollapsed,
    toggleExpand,
  };
}