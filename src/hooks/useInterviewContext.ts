import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { getJobDescriptions } from '@/lib/api/jobs';
import { getSkills } from '@/lib/api/skills';
import { generateSystemPrompt, generateInitialQuestion } from '@/lib/openai/prompts';
import type { JobDescription } from '@/lib/api/jobs';
import type { Skill } from '@/lib/api/skills';

export function useInterviewContext() {
  const { id: interviewId } = useParams();
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !interviewId) return;

    const loadContext = async () => {
      try {
        setIsLoading(true);
        
        // Get interview details including job_description_id
        const { data: interview } = await supabase
          .from('interviews')
          .select('job_description_id')
          .eq('id', interviewId)
          .single();

        // Load job description and skills in parallel
        const [jobData, skillsData] = await Promise.all([
          interview?.job_description_id 
            ? getJobDescriptions(user.id).then(jobs => 
                jobs?.find(j => j.id === interview.job_description_id)
              )
            : null,
          getSkills(user.id),
        ]);

        if (jobData) {
          setJobDescription(jobData);
        }

        if (skillsData) {
          setSkills(skillsData);
        }
      } catch (error) {
        console.error('Failed to load interview context:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContext();
  }, [user, interviewId]);

  const getSystemPrompt = () => {
    if (!user) return '';
    return generateSystemPrompt(user, jobDescription || undefined, skills);
  };

  const getInitialQuestion = () => {
    return generateInitialQuestion(jobDescription || undefined);
  };

  return {
    isLoading,
    jobDescription,
    skills,
    getSystemPrompt,
    getInitialQuestion,
  };
}