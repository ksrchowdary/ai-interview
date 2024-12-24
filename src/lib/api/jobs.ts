import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';

export interface JobDescription {
  id: string;
  title: string;
  company: string | null;
  description: string;
  requirements: string[];
  created_at: string;
  updated_at: string;
}

export async function getJobDescriptions(userId: string) {
  return safeQuery<JobDescription[]>(
    supabase
      .from('job_descriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  );
}

export async function createJobDescription(userId: string, data: Omit<JobDescription, 'id' | 'created_at' | 'updated_at'>) {
  return safeQuery<JobDescription>(
    supabase
      .from('job_descriptions')
      .insert([{ ...data, user_id: userId }])
      .select()
      .single()
  );
}

export async function updateJobDescription(userId: string, id: string, data: Partial<JobDescription>) {
  return safeQuery<JobDescription>(
    supabase
      .from('job_descriptions')
      .update(data)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()
  );
}

export async function deleteJobDescription(userId: string, id: string) {
  return safeQuery(
    supabase
      .from('job_descriptions')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
  );
}