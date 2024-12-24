import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSkills } from '@/hooks/useSkills';
import { DashboardLayout } from '../../Dashboard/DashboardLayout';
import { SkillForm } from './SkillForm';
import { SkillList } from './SkillList';
import type { Skill } from '@/lib/api/skills';

export function SkillsPage() {
  const { skills, isLoading, fetchSkills, addSkill } = useSkills();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSubmit = async (data: Omit<Skill, 'id' | 'created_at'>) => {
    await addSkill(data);
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
            <p className="text-muted-foreground">
              Manage your technical and professional skills
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>

        {showForm ? (
          <div className="mb-6">
            <SkillForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <SkillList skills={skills} isLoading={isLoading} />
        )}
      </div>
    </DashboardLayout>
  );
}