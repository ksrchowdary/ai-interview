export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center space-x-6 mx-6">
      <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
        Features
      </a>
      <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
        Pricing
      </a>
      <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
        Testimonials
      </a>
    </div>
  );
}