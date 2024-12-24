import { NAV_LINKS } from './constants';
import { NavLink } from './NavLink';
import { AuthButtons } from './AuthButtons';

export function MobileNav() {
  return (
    <nav className="flex flex-col gap-6 pt-16">
      {NAV_LINKS.map(({ href, label }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          className="text-lg"
        />
      ))}
      <div className="pt-4">
        <AuthButtons size="lg" className="flex-col w-full" />
      </div>
    </nav>
  );
}