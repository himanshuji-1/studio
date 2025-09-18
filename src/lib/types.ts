export type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  imageHint?: string;
};

export type ItineraryItem = {
  id: string;
  time: string;
  activity: string;
  details?: string;
};

export type ItineraryDay = {
  date: string;
  items: ItineraryItem[];
};

export type Document = {
  id: string;
  name: string;
  type: string;
  data: string; // base64 encoded string
};

export type ExpenseCategory = 'transport' | 'accommodation' | 'food' | 'activities' | 'shopping' | 'other';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
};

export type ChatMessage = {
  id: string;
  user: string;
  avatar: string;
  timestamp: number;
  message: string;
};

export type Review = {
  id: string;
  placeId: string; // Corresponds to an itinerary item or hotel
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  timestamp: number;
};

export type WeatherInfo = {
  current: {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
  };
  forecast: {
    date: string;
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }[];
  alert?: {
    title: string;
    description: string;
  };
};

export type SafetyInfo = {
  crimeRate: 'low' | 'medium' | 'high';
  stats: { name: string; value: number }[];
  safetyTips: string[];
};
