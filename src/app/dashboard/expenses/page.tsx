'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import ExpensesView from '@/components/trips/expenses-view';

export default function ExpensesPage() {

  // Since this is a general expenses page, we can pass a generic ID or handle it differently.
  // For now, we'll use a placeholder ID. In a real app, you might show aggregated expenses
  // or allow the user to select a trip.
  const tripId = "all-trips";

  return (
    <div className="container mx-auto p-4 md:p-6">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
      </div>
      <ExpensesView tripId={tripId} />
    </div>
  );
}
