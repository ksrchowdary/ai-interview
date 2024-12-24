import { supabase } from '../supabase';
import { QueryError, safeQuery } from '../database/queries';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  created_at: string;
}

export async function uploadDocument(userId: string, file: File): Promise<Document> {
  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new QueryError('Invalid file type. Only PDF and Word documents are allowed.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new QueryError('File size exceeds 5MB limit.');
  }

  // Upload file to storage
  const fileName = `${userId}/${crypto.randomUUID()}-${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (uploadError) {
    throw new QueryError('Failed to upload file.');
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  // Save document metadata
  const document = await safeQuery<Document>(
    supabase
      .from('documents')
      .insert([{
        user_id: userId,
        name: file.name,
        type: file.type,
        url: publicUrl,
        size: file.size,
      }])
      .select()
      .single()
  );

  if (!document) {
    throw new QueryError('Failed to save document metadata.');
  }

  return document;
}

export async function getDocuments(userId: string): Promise<Document[]> {
  return safeQuery(
    supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  ) ?? [];
}

export async function deleteDocument(userId: string, documentId: string): Promise<void> {
  const document = await safeQuery<Document>(
    supabase
      .from('documents')
      .select('url')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single()
  );

  if (!document) {
    throw new QueryError('Document not found.');
  }

  // Delete from storage
  const fileName = document.url.split('/').pop();
  if (fileName) {
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([`${userId}/${fileName}`]);

    if (storageError) {
      throw new QueryError('Failed to delete file from storage.');
    }
  }

  // Delete metadata
  await safeQuery(
    supabase
      .from('documents')
      .delete()
      .eq('id', documentId)
      .eq('user_id', userId)
  );
}