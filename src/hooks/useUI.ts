import { useStore } from '@/store';

export const useUI = () => {
  const { theme, sidebarOpen, toggleTheme, toggleSidebar } = useStore(
    (state) => ({
      theme: state.theme,
      sidebarOpen: state.sidebarOpen,
      toggleTheme: state.toggleTheme,
      toggleSidebar: state.toggleSidebar,
    })
  );

  return {
    theme,
    sidebarOpen,
    toggleTheme,
    toggleSidebar,
  };
};