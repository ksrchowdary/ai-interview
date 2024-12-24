import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

export function Message({ content, timestamp, isAI }: MessageProps) {
  return (
    <div className={cn(
      "flex flex-col",
      isAI ? "items-start" : "items-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4",
        isAI ? "bg-muted" : "bg-primary text-primary-foreground"
      )}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
      <span className="text-xs text-muted-foreground px-1 mt-1">
        {formatDistanceToNow(timestamp, { addSuffix: true })}
      </span>
    </div>
  );
}