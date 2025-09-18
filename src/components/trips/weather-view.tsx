'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { WeatherInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sun, Cloud, CloudRain, CloudSnow, AlertTriangle, Thermometer, Droplet } from 'lucide-react';

const mockWeather: WeatherInfo = {
  current: {
    temp: 22,
    condition: 'Partly Cloudy',
    icon: 'cloud',
    humidity: 60,
  },
  forecast: [
    { date: '2024-09-11', day: 'Wed', temp: 24, condition: 'Sunny', icon: 'sun' },
    { date: '2024-09-12', day: 'Thu', temp: 21, condition: 'Rainy', icon: 'rain' },
    { date: '2024-09-13', day: 'Fri', temp: 23, condition: 'Cloudy', icon: 'cloud' },
    { date: '2024-09-14', day: 'Sat', temp: 25, condition: 'Sunny', icon: 'sun' },
    { date: '2024-09-15', day: 'Sun', temp: 20, condition: 'Snowy', icon: 'snow' },
  ],
  alert: {
    title: 'High Wind Warning',
    description: 'Strong winds expected tomorrow afternoon. Secure loose objects.',
  },
};

const weatherIcons: { [key: string]: React.ReactNode } = {
  sun: <Sun className="h-8 w-8 text-yellow-500" />,
  cloud: <Cloud className="h-8 w-8 text-gray-500" />,
  rain: <CloudRain className="h-8 w-8 text-blue-500" />,
  snow: <CloudSnow className="h-8 w-8 text-blue-200" />,
};

export default function WeatherView({ tripId }: { tripId: string }) {
  const [weather] = useLocalStorage<WeatherInfo>(`weather-${tripId}`, mockWeather);

  // In a real app, you would fetch this from an API like OpenWeatherMap
  // and handle API key errors by showing a message to the user.

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather & Climate</CardTitle>
        <CardDescription>Current conditions and 5-day forecast for your destination.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {weather.alert && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{weather.alert.title}</AlertTitle>
            <AlertDescription>{weather.alert.description}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row items-center justify-around text-center md:text-left gap-8 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            {weatherIcons[weather.current.icon]}
            <div>
              <p className="text-5xl font-bold">{weather.current.temp}°C</p>
              <p className="text-muted-foreground">{weather.current.condition}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Droplet className="h-6 w-6" />
            <div>
              <p className="font-bold">Humidity</p>
              <p>{weather.current.humidity}%</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {weather.forecast.map((day) => (
              <div key={day.date} className="p-4 border rounded-lg hover:bg-accent/50">
                <p className="font-bold">{day.day}</p>
                <div className="my-2 flex justify-center">{weatherIcons[day.icon]}</div>
                <p className="text-xl font-semibold">{day.temp}°C</p>
                <p className="text-xs text-muted-foreground">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
