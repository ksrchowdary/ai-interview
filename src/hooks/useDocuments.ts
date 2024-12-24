import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from './useQuery';
import { useToast } from './use-toast';
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  type Document,
} from '@/lib/api/documents';

export function useDocuments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const { execute, isLoading } = useQuery<Document[]>();

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    
    const data = await execute(
      () => getDocuments(user.id),
      {
        onSuccess: (data) => {
          if (data) setDocuments(data);
        },
      }
    );
    
    return data;
  }, [user, execute]);

  const uploadFile = useCallback(async (file: File) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to upload documents',
        variant: 'destructive',
      });
      return null;
    }

    const document = await execute(
      () => uploadDocument(user.id, file),
      {
        onSuccess: (data) => {
          if (data) {
            setDocuments(prev => [data, ...prev]);
            toast({
              title: 'Success',
              description: 'Document uploaded successfully',
            });
          }
        },
      }
    );

    return document;
  }, [user, execute, toast]);

  const deleteFile = useCallback(async (documentId: string) => {
    if (!user) return;

    await execute(
      () => deleteDocument(user.id, documentId),
      {
        onSuccess: () => {
          setDocuments(prev => prev.filter(d => d.id !== documentId));
          toast({
            title: 'Success',
            description: 'Document deleted successfully',
          });
        },
      }
    );
  }, [user, execute, toast]);

  return {
    documents,
    isLoading,
    fetchDocuments,
    uploadFile,
    deleteFile,
  };
}