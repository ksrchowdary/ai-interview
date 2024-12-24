import { useState } from 'react';
import { formatDistanceToNow } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2 } from 'lucide-react';
import { useSkills } from '@/hooks/useSkills';
import type { Skill } from '@/lib/api/skills';

interface SkillListProps {
  skills: Skill[];
  isLoading?: boolean;
}

const LEVEL_COLORS = {
  beginner: 'bg-blue-100 text-blue-800',
  intermediate: 'bg-green-100 text-green-800',
  advanced: 'bg-purple-100 text-purple-800',
  expert: 'bg-orange-100 text-orange-800',
} as const;

export function SkillList({ skills, isLoading }: SkillListProps) {
  const { deleteSkill } = useSkills();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteSkill(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading skills...
      </div>
    );
  }

  if (!skills.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No skills added yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your skills to help tailor your interview practice
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell className="font-medium">{skill.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={LEVEL_COLORS[skill.level]}>
                  {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {skill.years ? `${skill.years} years` : '-'}
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(skill.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(skill.id)}
                    disabled={deletingId === skill.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}