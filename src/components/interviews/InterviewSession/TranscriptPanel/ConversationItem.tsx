import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ConversationItemProps {
  speaker: 'interviewer' | 'candidate';
  content: string;
  timestamp: Date;
  onSelect?: (text: string) => void;
}

export function ConversationItem({ speaker, content, timestamp, onSelect }: ConversationItemProps) {
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      onSelect?.(selection.toString());
    }
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg mb-4",
        speaker === 'interviewer' ? "bg-muted ml-4" : "bg-primary/5 mr-4"
      )}
      onMouseUp={handleSelection}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium capitalize">{speaker}</span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  );
}