import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from './useChat';
import { useToast } from './use-toast';
import { 
  saveTranscript, 
  saveChatMessage,
  updateChatMessage,
  getTranscripts,
  getChatMessages 
} from '@/lib/api/conversations';
import type { Transcript } from '@/lib/speech/types';
import type { ChatMessage } from '@/types';

export function useConversation() {
  const { id: interviewId } = useParams();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { streamResponse } = useChat();
  const { toast } = useToast();

  // Load existing conversation data
  useEffect(() => {
    if (!interviewId) return;

    const loadConversation = async () => {
      try {
        const [transcriptsData, messagesData] = await Promise.all([
          getTranscripts(interviewId),
          getChatMessages(interviewId)
        ]);

        if (transcriptsData) {
          setTranscripts(transcriptsData.map(t => ({
            ...t,
            timestamp: new Date(t.timestamp)
          })));
        }

        if (messagesData) {
          setMessages(messagesData.map(m => ({
            id: m.id,
            content: m.content,
            timestamp: new Date(m.timestamp),
            isAI: m.is_ai
          })));
        }
      } catch (error) {
        console.error('Failed to load conversation:', error);
        toast({
          title: 'Error',
          description: 'Failed to load conversation history',
          variant: 'destructive',
        });
      }
    };

    loadConversation();
  }, [interviewId, toast]);

  const addTranscript = useCallback(async (content: string) => {
    if (!interviewId) return;

    const transcript: Omit<Transcript, 'id'> = {
      speaker: 'candidate',
      content,
      timestamp: new Date()
    };

    try {
      const saved = await saveTranscript(interviewId, transcript);
      if (saved) {
        setTranscripts(prev => [...prev, saved as Transcript]);
      }
    } catch (error) {
      console.error('Failed to save transcript:', error);
      toast({
        title: 'Error',
        description: 'Failed to save transcript',
        variant: 'destructive',
      });
    }
  }, [interviewId, toast]);

  const handleMessage = useCallback(async (content: string) => {
    if (!interviewId || !content.trim()) return;
    setIsProcessing(true);

    try {
      // Save user message
      const userMessage: Omit<ChatMessage, 'id'> = {
        content,
        timestamp: new Date(),
        isAI: false,
      };
      const savedUser = await saveChatMessage(interviewId, userMessage);
      if (savedUser) {
        setMessages(prev => [...prev, {
          id: savedUser.id,
          content: savedUser.content,
          timestamp: new Date(savedUser.timestamp),
          isAI: savedUser.is_ai
        }]);
      }

      // Create AI message placeholder
      const aiMessage: Omit<ChatMessage, 'id'> = {
        content: '',
        timestamp: new Date(),
        isAI: true,
      };
      const savedAI = await saveChatMessage(interviewId, aiMessage);
      if (!savedAI) throw new Error('Failed to save AI message');

      // Stream AI response
      let fullResponse = '';
      await streamResponse(
        content,
        (chunk) => {
          fullResponse += chunk;
          setMessages(prev => prev.map(msg =>
            msg.id === savedAI.id ? { ...msg, content: fullResponse } : msg
          ));
        },
        async () => {
          // Update final AI message in database
          await updateChatMessage(savedAI.id, fullResponse);
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process message',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  }, [interviewId, streamResponse, toast]);

  return {
    transcripts,
    messages,
    isProcessing,
    addTranscript,
    handleMessage,
  };
}