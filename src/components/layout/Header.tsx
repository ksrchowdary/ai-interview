import { useState } from 'react';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { AuthButtons } from './AuthButtons';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between px-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <DesktopNav />
          
          <div className="flex items-center gap-4">
            <AuthButtons className="hidden md:flex" />
            <MobileMenu isOpen={isOpen} onOpenChange={setIsOpen} />
          </div>
        </nav>
      </div>
    </header>
  );
}