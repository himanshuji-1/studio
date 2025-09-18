import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Plane, FileText, Bot, DollarSign, Lock } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: 'Interactive Itinerary',
    description: 'Plan your trip day-by-day with a dynamic, drag-and-drop itinerary builder.',
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Trip Maps',
    description: 'Visualize your journey on an interactive map, with all your locations and routes clearly marked.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Document Management',
    description: 'Keep all your important travel documents like passports and tickets securely in one place.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Location Insights',
    description: 'Get AI-powered insights, tips, and safety information for any destination in the world.',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: 'Expense Tracker',
    description: 'Manage your travel budget with an easy-to-use expense tracker and categorized summaries.',
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Secure & Private',
    description: 'Your data is stored securely on your device, ensuring your travel plans remain private.',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-landing");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Viaje</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6 font-headline">
              Travel Smarter, Not Harder.
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
              Viaje is your all-in-one travel companion. Plan itineraries, manage documents, track expenses, and get AI-powered insights for your next adventure.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
             {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                quality={100}
                className="object-cover opacity-10"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground font-headline">Everything You Need for the Perfect Trip</h3>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Viaje brings all your travel planning tools into one beautiful, easy-to-use interface.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/80 backdrop-blur-sm border-border/50 transform hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    {feature.icon}
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Viaje. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
