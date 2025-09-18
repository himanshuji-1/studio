'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, MapPin } from 'lucide-react';
import { generateLocationInsights } from '@/lib/actions';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Please enter a location.' }),
});

export function InsightGenerator() {
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInsights(null);
    setError(null);
    try {
      const result = await generateLocationInsights({ location: values.location });
      if (result.success) {
        setInsights(result.insights);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    } catch (e) {
      setError('Failed to connect to the AI service.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-grow">
                 <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                        <Input placeholder="e.g., Kyoto, Japan" {...field} className="pl-10" />
                    </FormControl>
                 </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate Insights'}
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        {isLoading && (
            <Card className="bg-muted/30">
                <CardContent className="p-6">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {insights && (
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <p className="whitespace-pre-wrap leading-relaxed">{insights}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
