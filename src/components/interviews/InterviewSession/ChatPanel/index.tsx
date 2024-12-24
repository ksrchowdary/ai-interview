import { useRef, useEffect } from 'react';
import { Message } from './Message';
import type { ChatMessage } from '@/types';

interface ChatPanelProps {
  messages: ChatMessage[];
  isProcessing?: boolean;
}

export function ChatPanel({ messages, isProcessing }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Start the conversation by asking a question</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                timestamp={message.timestamp}
                isAI={message.isAI}
              />
            ))}
          </div>
        )}
        
        {isProcessing && (
          <div className="flex items-center gap-2 p-4">
            <div className="animate-bounce bg-primary/20 rounded-full w-2 h-2" />
            <div className="animate-bounce bg-primary/20 rounded-full w-2 h-2" style={{ animationDelay: '0.2s' }} />
            <div className="animate-bounce bg-primary/20 rounded-full w-2 h-2" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>
    </div>
  );
}