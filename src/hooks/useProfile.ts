import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from './useQuery';
import { useToast } from './use-toast';
import { updateProfile, type ProfileUpdateData } from '@/lib/api/profile';

export function useProfile() {
  const { user, setUser } = useAuth();
  const { execute } = useQuery();
  const { toast } = useToast();

  const updateUserProfile = useCallback(async (data: ProfileUpdateData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update your profile',
        variant: 'destructive',
      });
      return null;
    }

    const updatedProfile = await execute(
      () => updateProfile(user.id, data),
      {
        onSuccess: (data) => {
          if (data) {
            setUser(data);
            toast({
              title: 'Success',
              description: 'Profile updated successfully',
            });
          }
        },
      }
    );

    return updatedProfile;
  }, [user, execute, setUser, toast]);

  return {
    updateProfile: updateUserProfile,
  };
}