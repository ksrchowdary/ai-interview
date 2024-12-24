import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = '', iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <BrainCircuit className="h-8 w-8 text-primary" />
      {!iconOnly && (
        <span className="text-2xl font-bold text-foreground">InterviewAI</span>
      )}
    </div>
  );
}