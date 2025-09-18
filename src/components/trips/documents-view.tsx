'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { Document } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, ImageIcon, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

export default function DocumentsView({ tripId }: { tripId: string }) {
  const [documents, setDocuments] = useLocalStorage<Document[]>(`documents-${tripId}`, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const newDocument: Document = {
          id: new Date().toISOString(),
          name: file.name,
          type: file.type,
          data: base64,
        };
        setDocuments([...documents, newDocument]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // Reset input
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Travel Documents</CardTitle>
          <CardDescription>Securely store your passports, tickets, and visas.</CardDescription>
        </div>
        <Button asChild>
          <label htmlFor="file-upload">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
          </label>
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="group relative">
                <a href={doc.data} target="_blank" rel="noopener noreferrer" className="block border rounded-lg p-4 text-center hover:bg-accent/50 transition-colors">
                  {doc.type.startsWith('image/') ? (
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  ) : (
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  )}
                  <p className="text-sm font-medium truncate mt-2">{doc.name}</p>
                </a>
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeDocument(doc.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No documents uploaded for this trip.</p>
            <Button asChild className="mt-4">
              <label htmlFor="file-upload-2">
                <Upload className="mr-2 h-4 w-4" /> Upload First Document
                <Input id="file-upload-2" type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
              </label>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
