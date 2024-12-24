import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AuthButtons } from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <a href="#features" className="text-lg font-medium" onClick={() => onOpenChange(false)}>
            Features
          </a>
          <a href="#pricing" className="text-lg font-medium" onClick={() => onOpenChange(false)}>
            Pricing
          </a>
          <a href="#testimonials" className="text-lg font-medium" onClick={() => onOpenChange(false)}>
            Testimonials
          </a>
          <AuthButtons className="w-full" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}