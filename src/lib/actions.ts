'use server';

import { generateLocationInsights as genInsights, LocationInsightsInput } from '@/ai/flows/location-insight-generation';

export async function generateLocationInsights(input: LocationInsightsInput) {
  try {
    const result = await genInsights(input);
    return { success: true, insights: result.insights };
  } catch (error) {
    console.error('Error generating location insights:', error);
    return { success: false, error: 'Failed to generate insights. Please try again.' };
  }
}
