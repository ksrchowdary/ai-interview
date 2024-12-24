import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from './useQuery';
import { useToast } from './use-toast';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  type Skill,
} from '@/lib/api/skills';

export function useSkills() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const { execute, isLoading } = useQuery<Skill[]>();

  const fetchSkills = useCallback(async () => {
    if (!user) return;
    
    const data = await execute(
      () => getSkills(user.id),
      {
        onSuccess: (data) => {
          if (data) setSkills(data);
        },
      }
    );
    
    return data;
  }, [user, execute]);

  const addSkill = useCallback(async (data: Omit<Skill, 'id' | 'created_at'>) => {
    if (!user) return null;

    const skill = await execute(
      () => createSkill(user.id, data),
      {
        onSuccess: (data) => {
          if (data) {
            setSkills(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            toast({
              title: 'Success',
              description: 'Skill added successfully',
            });
          }
        },
      }
    );

    return skill;
  }, [user, execute, toast]);

  const updateSkillById = useCallback(async (id: string, data: Partial<Skill>) => {
    if (!user) return null;

    const skill = await execute(
      () => updateSkill(user.id, id, data),
      {
        onSuccess: (data) => {
          if (data) {
            setSkills(prev => 
              prev.map(s => s.id === id ? data : s)
                .sort((a, b) => a.name.localeCompare(b.name))
            );
            toast({
              title: 'Success',
              description: 'Skill updated successfully',
            });
          }
        },
      }
    );

    return skill;
  }, [user, execute, toast]);

  const deleteSkillById = useCallback(async (id: string) => {
    if (!user) return;

    await execute(
      () => deleteSkill(user.id, id),
      {
        onSuccess: () => {
          setSkills(prev => prev.filter(s => s.id !== id));
          toast({
            title: 'Success',
            description: 'Skill deleted successfully',
          });
        },
      }
    );
  }, [user, execute, toast]);

  return {
    skills,
    isLoading,
    fetchSkills,
    addSkill,
    updateSkill: updateSkillById,
    deleteSkill: deleteSkillById,
  };
}