import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTranscripts, getChatMessages } from '@/lib/api/conversations';
import type { Transcript } from '@/lib/speech/types';
import type { ChatMessage } from '@/types';

export function useInterviewPlayback() {
  const { id: interviewId } = useParams();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!interviewId) return;

    const loadConversation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load transcripts and chat messages in parallel
        const [transcriptsData, messagesData] = await Promise.all([
          getTranscripts(interviewId),
          getChatMessages(interviewId),
        ]);

        if (transcriptsData) {
          setTranscripts(transcriptsData.map(t => ({
            ...t,
            timestamp: new Date(t.timestamp),
          })));
        }

        if (messagesData) {
          setMessages(messagesData.map(m => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })));
        }
      } catch (err) {
        console.error('Failed to load interview:', err);
        setError('Failed to load interview data');
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();
  }, [interviewId]);

  return {
    transcripts,
    messages,
    isLoading,
    error,
  };
}