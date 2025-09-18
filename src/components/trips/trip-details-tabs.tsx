'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Map, FileText, Wallet } from 'lucide-react';
import ItineraryView from './itinerary-view';
import ExpensesView from './expenses-view';
import DocumentsView from './documents-view';
import MapView from './map-view';

export default function TripDetailsTabs({ tripId }: { tripId: string }) {
  return (
    <Tabs defaultValue="itinerary" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-muted/60">
        <TabsTrigger value="itinerary"><Plane className="mr-2 h-4 w-4" />Itinerary</TabsTrigger>
        <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Map</TabsTrigger>
        <TabsTrigger value="documents"><FileText className="mr-2 h-4 w-4" />Documents</TabsTrigger>
        <TabsTrigger value="expenses"><Wallet className="mr-2 h-4 w-4" />Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="itinerary" className="mt-6">
        <ItineraryView tripId={tripId} />
      </TabsContent>
      <TabsContent value="map" className="mt-6">
        <MapView tripId={tripId} />
      </TabsContent>
      <TabsContent value="documents" className="mt-6">
        <DocumentsView tripId={tripId} />
      </TabsContent>
      <TabsContent value="expenses" className="mt-6">
        <ExpensesView tripId={tripId} />
      </TabsContent>
    </Tabs>
  );
}
