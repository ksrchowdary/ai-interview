import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';
import type { Interview } from '@/types';

interface CreateInterviewData {
  title: string;
  jobDescriptionId: string;
}

export async function getInterviews(userId: string) {
  return safeQuery<Interview[]>(
    supabase
      .from('interviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  );
}

export async function getInterview(id: string, userId: string) {
  return safeQuery<Interview>(
    supabase
      .from('interviews')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()
  );
}

export async function createInterview(userId: string, data: CreateInterviewData) {
  if (!userId) {
    throw new QueryError('User ID is required');
  }

  if (!data.title) {
    throw new QueryError('Title is required');
  }

  if (!data.jobDescriptionId) {
    throw new QueryError('Job description is required');
  }

  return safeQuery<Interview>(
    supabase
      .from('interviews')
      .insert([{
        user_id: userId,
        title: data.title,
        job_description_id: data.jobDescriptionId,
        status: 'pending'
      }])
      .select()
      .single()
  );
}

export async function updateInterview(
  id: string,
  userId: string,
  data: Partial<Interview>
) {
  return safeQuery<Interview>(
    supabase
      .from('interviews')
      .update(data)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()
  );
}

export async function deleteInterview(id: string, userId: string) {
  return safeQuery(
    supabase
      .from('interviews')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
  );
}

export async function archiveInterview(id: string, userId: string) {
  return updateInterview(id, userId, { status: 'archived' });
}