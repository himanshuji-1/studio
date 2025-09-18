import type { Trip } from '@/lib/types';

export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Parisian Adventure',
    destination: 'Paris, France',
    startDate: '2024-09-10',
    endDate: '2024-09-17',
    imageUrl: 'https://picsum.photos/seed/paris/600/400',
    imageHint: 'Eiffel Tower',
  },
  {
    id: '2',
    name: 'Tokyo Exploration',
    destination: 'Tokyo, Japan',
    startDate: '2024-10-22',
    endDate: '2024-11-01',
    imageUrl: 'https://picsum.photos/seed/tokyo/600/400',
    imageHint: 'Tokyo skyline',
  },
  {
    id: '3',
    name: 'Roman Holiday',
    destination: 'Rome, Italy',
    startDate: '2025-01-15',
    endDate: '2025-01-22',
    imageUrl: 'https://picsum.photos/seed/rome/600/400',
    imageHint: 'Colosseum Rome',
  },
];
