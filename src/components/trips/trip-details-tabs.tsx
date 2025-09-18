'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Map, FileText, Wallet, MessageSquare, Shield, Sun, Star } from 'lucide-react';
import ItineraryView from './itinerary-view';
import ExpensesView from './expenses-view';
import DocumentsView from './documents-view';
import MapView from './map-view';
import ChatView from './chat-view';
import WeatherView from './weather-view';
import SafetyView from './safety-view';
import ReviewsView from './reviews-view';


export default function TripDetailsTabs({ tripId }: { tripId: string }) {
  return (
    <Tabs defaultValue="itinerary" className="w-full">
      <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-muted/60">
        <TabsTrigger value="itinerary"><Plane className="mr-2 h-4 w-4" />Itinerary</TabsTrigger>
        <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Map</TabsTrigger>
        <TabsTrigger value="documents"><FileText className="mr-2 h-4 w-4" />Documents</TabsTrigger>
        <TabsTrigger value="expenses"><Wallet className="mr-2 h-4 w-4" />Expenses</TabsTrigger>
        <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" />Chat</TabsTrigger>
        <TabsTrigger value="weather"><Sun className="mr-2 h-4 w-4" />Weather</TabsTrigger>
        <TabsTrigger value="safety"><Shield className="mr-2 h-4 w-4" />Safety</TabsTrigger>
        <TabsTrigger value="reviews"><Star className="mr-2 h-4 w-4" />Reviews</TabsTrigger>
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
       <TabsContent value="chat" className="mt-6">
        <ChatView tripId={tripId} />
      </TabsContent>
      <TabsContent value="weather" className="mt-6">
        <WeatherView tripId={tripId} />
      </TabsContent>
      <TabsContent value="safety" className="mt-6">
        <SafetyView tripId={tripId} />
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <ReviewsView tripId={tripId} />
      </TabsContent>
    </Tabs>
  );
}
