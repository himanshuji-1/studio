'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import DocumentsView from '@/components/trips/documents-view';

export default function DocumentsPage() {
  
  // Similar to the expenses page, we'll use a generic ID for now.
  const tripId = "all-trips";

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
      </div>
       <DocumentsView tripId={tripId} />
    </div>
  );
}
