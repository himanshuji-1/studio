'use client';
import { useLocalStorage } from '@/lib/hooks';
import type { Trip } from '@/lib/types';
import { mockTrips } from '@/data/mock';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import TripDetailsTabs from '@/components/trips/trip-details-tabs';

export default function TripDetailsPage({ params }: { params: { id: string } }) {
  const [trips] = useLocalStorage<Trip[]>('viaje-trips', mockTrips);
  const trip = trips.find((t) => t.id === params.id);

  if (!trip) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6 -mx-4 md:-mx-6 mt-[-1rem] md:mt-[-1.5rem]">
        <Image
          src={trip.imageUrl || 'https://picsum.photos/seed/default-trip/1200/400'}
          alt={`Cover image for ${trip.name}`}
          layout="fill"
          objectFit="cover"
          className="bg-muted"
          data-ai-hint={trip.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{trip.name}</h1>
          <div className="flex items-center gap-6 mt-2">
            <p className="flex items-center gap-2 text-lg text-gray-200">
              <MapPin className="h-5 w-5" />
              <span>{trip.destination}</span>
            </p>
            <p className="flex items-center gap-2 text-lg text-gray-200">
              <Calendar className="h-5 w-5" />
              <span>
                {format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <TripDetailsTabs tripId={trip.id} />
    </div>
  );
}
