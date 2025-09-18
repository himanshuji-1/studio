'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MapPin } from 'lucide-react';
import { mockTrips } from '@/data/mock';
import Link from 'next/link';
import Image from 'next/image';
import { useLocalStorage } from '@/lib/hooks';
import type { Trip } from '@/lib/types';
import { format } from 'date-fns';

function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
       <Link href={`/dashboard/trips/${trip.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={trip.imageUrl || 'https://picsum.photos/seed/placeholder/600/400'}
              alt={`Image of ${trip.destination}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={trip.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-1">{trip.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{trip.destination}</span>
          </CardDescription>
          <p className="text-sm text-muted-foreground mt-2">
            {format(new Date(trip.startDate), 'LLL dd, y')} - {format(new Date(trip.endDate), 'LLL dd, y')}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function TripsPage() {
  const [trips, setTrips] = useLocalStorage<Trip[]>('viaje-trips', mockTrips);

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Trip
        </Button>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-medium">No trips planned yet!</h3>
          <p className="text-muted-foreground mt-2">Start your next adventure by adding a new trip.</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add First Trip
          </Button>
        </div>
      )}
    </div>
  );
}
