import { Navigation } from './Navigation';
import { Actions } from './Actions';
import { Brand } from './Brand';

export function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <Brand />
          <Navigation />
          <Actions />
        </div>
      </div>
    </header>
  );
}