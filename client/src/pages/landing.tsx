import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import { destinations } from "@/data/pakistan-data";
import { 
  MapPin, 
  Wallet, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Mountain,
  Users,
  Shield
} from "lucide-react";

export default function LandingPage() {
  const featuredDestinations = destinations.slice(0, 4);

  const steps = [
    {
      number: "01",
      title: "Choose Destination",
      description: "Select from beautiful destinations across Pakistan - from Hunza to Karachi.",
      icon: MapPin,
    },
    {
      number: "02",
      title: "Set Your Budget",
      description: "Enter your budget in PKR and let our optimizer find the best options.",
      icon: Wallet,
    },
    {
      number: "03",
      title: "Get Itinerary",
      description: "Receive a day-by-day plan with transport, hotels, and activities.",
      icon: Calendar,
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Smart Optimization",
      description: "Our algorithm finds the best combination of transport, hotels, and activities within your budget.",
    },
    {
      icon: Mountain,
      title: "Local Expertise",
      description: "Curated recommendations from authentic Pakistan travel data and local prices.",
    },
    {
      icon: Users,
      title: "Trip Types",
      description: "Whether it's leisure, family, religious, or adventure - we've got you covered.",
    },
    {
      icon: Shield,
      title: "Budget Protection",
      description: "We ensure your total cost never exceeds your specified budget.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            Plan Your Perfect Pakistan Trip
          </Badge>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Explore Pakistan<br />
            <span className="text-primary-foreground/90">Within Your Budget</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Intelligent budget optimization for domestic travel. Discover Hunza, Swat, Skardu 
            and more while staying within your means.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="min-w-[200px]" data-testid="button-hero-get-started">
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] bg-white/10 border-white/30 text-white backdrop-blur-sm"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Plan Your Trip in 3 Simple Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent system handles the complexity of trip planning so you can focus on enjoying your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-visible text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <span 
                    className="text-5xl font-bold text-muted-foreground/20 absolute top-4 right-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {step.number}
                  </span>
                  <h3 
                    className="text-xl font-semibold mt-4 mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Destinations</Badge>
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Popular Destinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From majestic mountains to historic cities, explore Pakistan's most beautiful places.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/register">
              <Button size="lg" variant="outline">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Budget Optimizer</Badge>
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Smart Budget Optimization
              </h2>
              <p className="text-muted-foreground mb-6">
                Our intelligent algorithm analyzes transport options, hotel prices, and activities 
                to create the perfect itinerary within your budget. No more overspending or 
                compromising on experiences.
              </p>
              <ul className="space-y-3">
                {[
                  "Compares bus, train, and flight options",
                  "Finds budget-friendly accommodations",
                  "Suggests high-value activities",
                  "Provides alternative destinations if needed",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="mt-8" size="lg">
                  Try It Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-muted-foreground">Your Budget</span>
                    <span className="font-bold text-2xl">PKR 80,000</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Transport (Bus)</span>
                      <span className="font-medium">PKR 7,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Hotel (5 nights)</span>
                      <span className="font-medium">PKR 17,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Activities</span>
                      <span className="font-medium">PKR 12,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Food & Misc</span>
                      <span className="font-medium">PKR 15,000</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-semibold">Total Cost</span>
                    <span className="font-bold text-xl text-primary">PKR 52,000</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                    <span className="font-semibold">You Save</span>
                    <span className="font-bold text-xl">PKR 28,000</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Why Choose Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-visible text-center">
                <CardContent className="pt-8 pb-6 px-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to Plan Your Trip?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the beauty of Pakistan 
            while staying within their budget.
          </p>
          <Link href="/register">
            <Button 
              size="lg" 
              variant="secondary" 
              className="min-w-[200px]"
              data-testid="button-cta-signup"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
