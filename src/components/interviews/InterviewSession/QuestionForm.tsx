import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface QuestionFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (question: string) => void;
  isSubmitting?: boolean;
}

export function QuestionForm({ value, onChange, onSubmit, isSubmitting }: QuestionFormProps) {
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isSubmitting) {
      onSubmit(value);
      onChange('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-4 max-w-3xl mx-auto">
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your question..."
            maxLength={maxLength}
            className="min-h-[80px] resize-none"
            disabled={isSubmitting}
          />
          <div className="mt-1 text-xs text-muted-foreground">
            {value.length}/{maxLength} characters
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={!value.trim() || isSubmitting}
          className="self-end"
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
  );
}