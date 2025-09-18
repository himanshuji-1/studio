'use client';

import { useState, useEffect } from 'react';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

const mockLocations = [
  { key: '1', lat: 48.8584, lng: 2.2945, name: 'Eiffel Tower' },
  { key: '2', lat: 48.8606, lng: 2.3376, name: 'Louvre Museum' },
];

export default function MapView({ tripId }: { tripId: string }) {
  const [locations, setLocations] = useState(mockLocations);
  const [selected, setSelected] = useState<typeof mockLocations[0] | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Card><CardHeader><CardTitle>Loading Map...</CardTitle></CardHeader><CardContent><div className="h-96 w-full bg-muted animate-pulse rounded-md" /></CardContent></Card>;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Map Unavailable</CardTitle>
          <CardDescription>
            The map could not be loaded. Please ensure the Google Maps API key is configured correctly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center bg-muted rounded-md text-muted-foreground">
            <p>API key missing.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Trip Map</CardTitle>
          <CardDescription>Visualize your trip's key locations.</CardDescription>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Location</Button>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full rounded-md overflow-hidden">
          <Map
            defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={'viaje-map'}
          >
            {locations.map((location) => (
              <AdvancedMarker
                key={location.key}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => setSelected(location)}
              >
                <Pin />
              </AdvancedMarker>
            ))}
            {selected && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold">{selected.name}</h3>
                  <Button variant="destructive" size="sm" className="mt-2">
                    <Trash2 className="mr-2 h-3 w-3" /> Remove
                  </Button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </CardContent>
    </Card>
  );
}
