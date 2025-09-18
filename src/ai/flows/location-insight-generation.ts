'use server';

/**
 * @fileOverview An AI agent for generating travel insights about a location.
 *
 * - generateLocationInsights - A function that generates travel insights for a given location.
 * - LocationInsightsInput - The input type for the generateLocationInsights function.
 * - LocationInsightsOutput - The return type for the generateLocationInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocationInsightsInputSchema = z.object({
  location: z.string().describe('The name of the location to get insights about.'),
});
export type LocationInsightsInput = z.infer<typeof LocationInsightsInputSchema>;

const LocationInsightsOutputSchema = z.object({
  insights: z.string().describe('The AI-generated travel insights for the location.'),
});
export type LocationInsightsOutput = z.infer<typeof LocationInsightsOutputSchema>;

export async function generateLocationInsights(input: LocationInsightsInput): Promise<LocationInsightsOutput> {
  return locationInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'locationInsightsPrompt',
  input: {schema: LocationInsightsInputSchema},
  output: {schema: LocationInsightsOutputSchema},
  prompt: `You are a travel expert providing insights about locations.

  Provide key attractions, local customs, and potential safety considerations for the following location:

  Location: {{{location}}}

  Format the output as a concise paragraph.
  `,
});

const locationInsightsFlow = ai.defineFlow(
  {
    name: 'locationInsightsFlow',
    inputSchema: LocationInsightsInputSchema,
    outputSchema: LocationInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
