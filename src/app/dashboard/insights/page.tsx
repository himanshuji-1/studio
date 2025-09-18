import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightGenerator } from '@/components/insights/insight-generator';
import { Lightbulb } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Location Insights</h1>
      </div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="bg-accent/50 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <CardTitle>AI-Powered Travel Advisor</CardTitle>
                    <CardDescription>Enter a location to get key attractions, local customs, and safety tips.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <InsightGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
