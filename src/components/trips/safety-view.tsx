'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { SafetyInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const mockSafety: SafetyInfo = {
  crimeRate: 'medium',
  stats: [
    { name: 'Theft', value: 65 },
    { name: 'Assault', value: 30 },
    { name: 'Vandalism', value: 45 },
    { name: 'Burglary', value: 25 },
  ],
  safetyTips: [
    'Be aware of your surroundings, especially in crowded areas.',
    'Keep valuables out of sight.',
    'Avoid walking alone at night in poorly lit areas.',
    'Use reputable transportation services.',
  ],
};

const crimeLevelConfig = {
  low: { text: 'Low', icon: <ShieldCheck className="h-5 w-5 text-green-500" />, color: 'bg-green-500' },
  medium: { text: 'Medium', icon: <ShieldAlert className="h-5 w-5 text-yellow-500" />, color: 'bg-yellow-500' },
  high: { text: 'High', icon: <ShieldAlert className="h-5 w-5 text-red-500" />, color: 'bg-red-500' },
};

export default function SafetyView({ tripId }: { tripId: string }) {
  const [safetyInfo] = useLocalStorage<SafetyInfo>(`safety-${tripId}`, mockSafety);

  const level = crimeLevelConfig[safetyInfo.crimeRate];
  
  // In a real app, you would fetch this from a public crime data API.
  // If the API fails, you could fall back to this mock data.

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle>Crime & Safety Report</CardTitle>
                <CardDescription>An overview of the safety landscape at your destination.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Crime Statistics</h3>
                    <p className="text-sm text-muted-foreground mb-4">Relative scores for different crime categories.</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={safetyInfo.stats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                                labelStyle={{ color: 'hsl(var(--foreground))' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Overall Crime Level</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                {level.icon}
                <Badge variant={safetyInfo.crimeRate === 'low' ? 'default' : (safetyInfo.crimeRate === 'medium' ? 'secondary' : 'destructive')} className="text-lg">
                    {level.text}
                </Badge>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {safetyInfo.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
