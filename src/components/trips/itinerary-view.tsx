'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { ItineraryDay } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const mockItinerary: ItineraryDay[] = [
  {
    date: '2024-09-10',
    items: [
      { id: '1', time: '09:00', activity: 'Arrival at CDG Airport', details: 'Pick up luggage and go through customs.' },
      { id: '2', time: '11:00', activity: 'Check-in to Hotel Le Bristol', details: 'Drop off bags and freshen up.' },
      { id: '3', time: '13:00', activity: 'Lunch at a local bistro', details: 'Le Comptoir du Relais.' },
      { id: '4', time: '15:00', activity: 'Visit the Louvre Museum', details: 'See the Mona Lisa.' },
    ],
  },
  {
    date: '2024-09-11',
    items: [
      { id: '5', time: '10:00', activity: 'Eiffel Tower Tour', details: 'Go to the summit for panoramic views.' },
      { id: '6', time: '13:00', activity: 'Seine River Cruise', details: 'Enjoy lunch on the boat.' },
      { id: '7', time: '19:00', activity: 'Dinner in Montmartre', details: 'Explore the artists\' square.' },
    ],
  },
];

export default function ItineraryView({ tripId }: { tripId: string }) {
  const [itinerary, setItinerary] = useLocalStorage<ItineraryDay[]>(`itinerary-${tripId}`, mockItinerary);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Trip Itinerary</CardTitle>
          <CardDescription>Your day-by-day plan for this trip.</CardDescription>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Day</Button>
      </CardHeader>
      <CardContent>
        {itinerary.length > 0 ? (
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {itinerary.map((day, index) => (
              <AccordionItem key={day.date} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  Day {index + 1}: {format(parseISO(day.date), 'EEEE, MMMM d')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4 border-l-2 ml-2">
                    {day.items.map((item) => (
                      <div key={item.id} className="relative group">
                         <div className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
                         <div className="flex justify-between items-start">
                           <div>
                            <p className="font-bold">{item.time} - {item.activity}</p>
                            <p className="text-sm text-muted-foreground">{item.details}</p>
                           </div>
                           <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                           </Button>
                         </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="ml-4 mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Activity
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No itinerary created for this trip yet.</p>
            <Button className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Create Itinerary</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
