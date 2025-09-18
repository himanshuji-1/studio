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
