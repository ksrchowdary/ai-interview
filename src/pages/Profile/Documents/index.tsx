import { useEffect } from 'react';
import { DashboardLayout } from '../../Dashboard/DashboardLayout';
import { DocumentList } from './DocumentList';
import { UploadButton } from './UploadButton';
import { useDocuments } from '@/hooks/useDocuments';

export function DocumentsPage() {
  const { documents, isLoading, fetchDocuments } = useDocuments();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">
              Upload and manage your resumes and other documents
            </p>
          </div>
          <UploadButton />
        </div>

        <DocumentList 
          documents={documents}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}