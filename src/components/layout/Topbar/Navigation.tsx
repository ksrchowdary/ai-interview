import { NAV_LINKS } from './constants';
import { NavLink } from './NavLink';

export function Navigation() {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {NAV_LINKS.map(({ href, label }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
        />
      ))}
    </nav>
  );
}