import { useState } from 'react';
import { formatDistanceToNow, formatBytes } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import type { Document } from '@/lib/api/documents';

interface DocumentListProps {
  documents: Document[];
  isLoading?: boolean;
}

export function DocumentList({ documents, isLoading }: DocumentListProps) {
  const { deleteFile } = useDocuments();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteFile(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading documents...
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload your resume or other documents to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.type.split('/')[1].toUpperCase()}</TableCell>
              <TableCell>{formatBytes(doc.size)}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button size="sm" variant="ghost" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(doc.id)}
                    disabled={deletingId === doc.id}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
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