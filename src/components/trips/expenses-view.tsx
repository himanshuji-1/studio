'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { Expense, ExpenseCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PlusCircle, Utensils, Hotel, Car, ShoppingBag, Clapperboard, MoreHorizontal } from 'lucide-react';

const mockExpenses: Expense[] = [
  { id: '1', description: 'Flight tickets', amount: 850, category: 'transport', date: '2024-08-01' },
  { id: '2', description: 'Hotel booking', amount: 1200, category: 'accommodation', date: '2024-08-02' },
  { id: '3', description: 'Dinner at Le Jules Verne', amount: 250, category: 'food', date: '2024-09-10' },
  { id: '4', description: 'Museum entry', amount: 40, category: 'activities', date: '2024-09-11' },
];

const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
  transport: <Car className="h-4 w-4" />,
  accommodation: <Hotel className="h-4 w-4" />,
  food: <Utensils className="h-4 w-4" />,
  activities: <Clapperboard className="h-4 w-4" />,
  shopping: <ShoppingBag className="h-4 w-4" />,
  other: <MoreHorizontal className="h-4 w-4" />,
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];


export default function ExpensesView({ tripId }: { tripId: string }) {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(`expenses-${tripId}`, mockExpenses);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Expense Log</CardTitle>
              <CardDescription>All expenses for this trip.</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Expense</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {categoryIcons[expense.category]}
                        <span className="capitalize">{expense.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${totalExpenses.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Total amount spent on this trip</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`$${(value as number).toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
