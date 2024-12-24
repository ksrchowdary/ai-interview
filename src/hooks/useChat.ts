import { useState, useCallback } from 'react';
import { ChatService } from '@/lib/openai/chat';
import { useCredits } from './useCredits';
import { useToast } from './use-toast';
import { useInterviewContext } from './useInterviewContext';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export function useChat() {
  const { getSystemPrompt } = useInterviewContext();
  const { useCredit, checkCredits } = useCredits();
  const { toast } = useToast();
  const [chatService] = useState(() => new ChatService(OPENAI_API_KEY, getSystemPrompt()));

  // Update system prompt when context changes
  const updateContext = useCallback(() => {
    chatService.updateSystemPrompt(getSystemPrompt());
  }, [chatService, getSystemPrompt]);

  const streamResponse = useCallback(async (
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    try {
      // Check credits before processing
      const { hasCredits, remainingCredits } = await checkCredits(1);
      
      if (!hasCredits) {
        toast({
          title: 'Insufficient Credits',
          description: `You need at least 1 credit to ask a question. Current balance: ${remainingCredits} credits`,
          variant: 'destructive',
        });
        return;
      }

      // Deduct credit before processing
      const credited = await useCredit(1);
      if (!credited) return;

      // Ensure context is up to date
      updateContext();
      
      for await (const chunk of chatService.streamChat(message)) {
        onChunk(chunk);
      }
      onComplete();
    } catch (error) {
      console.error('Stream error:', error);
      throw error;
    }
  }, [chatService, updateContext, checkCredits, useCredit, toast]);

  return {
    streamResponse,
    clearHistory: useCallback(() => {
      chatService.clearHistory(getSystemPrompt());
    }, [chatService, getSystemPrompt]),
  };
}