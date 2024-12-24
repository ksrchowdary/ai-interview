interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function NavLink({ href, label, className = '' }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`font-medium hover:text-foreground transition-colors ${className}`}
    >
      {label}
    </a>
  );
}