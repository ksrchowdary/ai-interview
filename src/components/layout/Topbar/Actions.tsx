import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MobileNav } from './MobileNav';
import { AuthButtons } from './AuthButtons';

export function Actions() {
  return (
    <div className="flex items-center gap-4">
      <AuthButtons className="hidden lg:flex" />

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <MobileNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}