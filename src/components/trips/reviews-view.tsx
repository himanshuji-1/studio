'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { Review, ItineraryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

const mockItineraryItems: ItineraryItem[] = [
    { id: '2', time: '11:00', activity: 'Hotel Le Bristol' },
    { id: '4', time: '15:00', activity: 'Louvre Museum' },
    { id: '5', time: '10:00', activity: 'Eiffel Tower' },
];

const mockReviews: Review[] = [
  {
    id: '1',
    placeId: '2',
    user: 'Alex Johnson',
    avatar: 'https://picsum.photos/seed/user3/40/40',
    rating: 5,
    comment: 'Absolutely stunning hotel. The service was impeccable and the rooms were luxurious. Worth every penny!',
    timestamp: new Date('2024-09-12').getTime(),
  },
  {
    id: '2',
    placeId: '4',
    user: 'Maria Garcia',
    avatar: 'https://picsum.photos/seed/user4/40/40',
    rating: 4,
    comment: 'The Louvre is massive! You need a whole day. Seeing the Mona Lisa was a bit crowded but still amazing.',
    timestamp: new Date('2024-09-15').getTime(),
  },
];

const StarRating = ({ rating, setRating, readOnly = false }: { rating: number, setRating?: (r: number) => void, readOnly?: boolean }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-6 w-6 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} ${!readOnly ? 'cursor-pointer' : ''}`}
        onClick={() => !readOnly && setRating && setRating(star)}
      />
    ))}
  </div>
);

export default function ReviewsView({ tripId }: { tripId: string }) {
  const [reviews, setReviews] = useLocalStorage<Review[]>(`reviews-${tripId}`, mockReviews);
  const [selectedPlace, setSelectedPlace] = useState<string | undefined>(undefined);

  // In a real app, you would fetch itinerary items from your data source.
  const places = mockItineraryItems;

  const getReviewsForPlace = (placeId: string) => {
    return reviews.filter(r => r.placeId === placeId);
  }

  const getAverageRating = (placeId: string) => {
    const placeReviews = getReviewsForPlace(placeId);
    if (placeReviews.length === 0) return 0;
    const total = placeReviews.reduce((acc, r) => acc + r.rating, 0);
    return total / placeReviews.length;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle>Place Reviews</CardTitle>
                <div className="flex items-center justify-between">
                <CardDescription>See what other travelers are saying.</CardDescription>
                <Select onValueChange={setSelectedPlace}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select a place to view reviews" />
                    </SelectTrigger>
                    <SelectContent>
                        {places.map(place => (
                            <SelectItem key={place.id} value={place.id}>{place.activity}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>
            </CardHeader>
            <CardContent>
                {!selectedPlace ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Select a place to see its reviews.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b">
                            <h3 className="text-xl font-bold">{places.find(p=>p.id === selectedPlace)?.activity}</h3>
                            <div className="flex items-center gap-2">
                                <StarRating rating={getAverageRating(selectedPlace)} readOnly />
                                <span className="text-muted-foreground font-semibold">({getReviewsForPlace(selectedPlace).length} reviews)</span>
                            </div>
                        </div>
                        {getReviewsForPlace(selectedPlace).map(review => (
                            <div key={review.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={review.avatar} />
                                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{review.user}</p>
                                            <p className="text-xs text-muted-foreground">{format(new Date(review.timestamp), 'MMMM d, yyyy')}</p>
                                        </div>
                                        <StarRating rating={review.rating} readOnly />
                                    </div>
                                    <p className="text-sm mt-2 text-muted-foreground">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                        {getReviewsForPlace(selectedPlace).length === 0 && (
                             <p className="text-muted-foreground text-center py-10">No reviews for this place yet. Be the first!</p>
                        )}
                    </div>
                )}
            </CardContent>
            </Card>
        </div>
        <div>
            <AddReviewForm tripId={tripId} places={places} onReviewAdded={(newReview) => setReviews([...reviews, newReview])} />
        </div>
    </div>
  );
}


function AddReviewForm({ tripId, places, onReviewAdded }: { tripId: string, places: ItineraryItem[], onReviewAdded: (review: Review) => void }) {
    const [placeId, setPlaceId] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!placeId || rating === 0) {
            alert('Please select a place and provide a rating.');
            return;
        }

        const newReview: Review = {
            id: new Date().toISOString(),
            placeId,
            user: 'You', // In a real app, get current user
            avatar: 'https://picsum.photos/seed/user1/40/40',
            rating,
            comment,
            timestamp: new Date().getTime(),
        };

        onReviewAdded(newReview);

        // Reset form
        setPlaceId('');
        setRating(0);
        setComment('');
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Your Review</CardTitle>
                <CardDescription>Share your experience with fellow travelers.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <Select onValueChange={setPlaceId} value={placeId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a place" />
                        </SelectTrigger>
                        <SelectContent>
                            {places.map(place => (
                                <SelectItem key={place.id} value={place.id}>{place.activity}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Rating</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>

                    <Textarea 
                        placeholder="Share details of your own experience at this place"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit Review
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

