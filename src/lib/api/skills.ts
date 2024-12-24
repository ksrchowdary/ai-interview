import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years: number | null;
  created_at: string;
}

export async function getSkills(userId: string) {
  return safeQuery<Skill[]>(
    supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true })
  );
}

export async function createSkill(userId: string, data: Omit<Skill, 'id' | 'created_at'>) {
  return safeQuery<Skill>(
    supabase
      .from('skills')
      .insert([{ ...data, user_id: userId }])
      .select()
      .single()
  );
}

export async function updateSkill(userId: string, id: string, data: Partial<Skill>) {
  return safeQuery<Skill>(
    supabase
      .from('skills')
      .update(data)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()
  );
}

export async function deleteSkill(userId: string, id: string) {
  return safeQuery(
    supabase
      .from('skills')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
  );
}