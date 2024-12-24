import { BrainCircuit } from 'lucide-react';

export function Brand() {
  return (
    <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <BrainCircuit className="h-8 w-8 text-primary" />
      <span className="font-semibold text-xl">InterviewAI</span>
    </a>
  );
}