import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';
import type { Transcript } from '@/lib/speech/types';
import type { ChatMessage } from '@/types';

export async function saveTranscript(
  interviewId: string,
  transcript: Omit<Transcript, 'id'>
) {
  return safeQuery(
    supabase
      .from('transcripts')
      .insert([{
        interview_id: interviewId,
        speaker: transcript.speaker,
        content: transcript.content,
        timestamp: transcript.timestamp.toISOString(),
      }])
      .select()
      .single()
  );
}

export async function saveChatMessage(
  interviewId: string,
  message: Omit<ChatMessage, 'id'>
) {
  return safeQuery(
    supabase
      .from('chat_messages')
      .insert([{
        interview_id: interviewId,
        is_ai: message.isAI,
        content: message.content,
        timestamp: message.timestamp.toISOString(),
      }])
      .select('*, id')
      .single()
  );
}

export async function updateChatMessage(
  messageId: string,
  content: string
) {
  return safeQuery(
    supabase
      .from('chat_messages')
      .update({ content })
      .eq('id', messageId)
      .select()
      .single()
  );
}

export async function getTranscripts(interviewId: string) {
  return safeQuery(
    supabase
      .from('transcripts')
      .select('*')
      .eq('interview_id', interviewId)
      .order('timestamp', { ascending: true })
  );
}

export async function getChatMessages(interviewId: string) {
  return safeQuery(
    supabase
      .from('chat_messages')
      .select('*')
      .eq('interview_id', interviewId)
      .order('timestamp', { ascending: true })
  );
}