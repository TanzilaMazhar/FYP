import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TripCard } from "@/components/trip-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { formatPKR } from "@/data/pakistan-data";
import type { Trip } from "@shared/schema";
import { 
  Plus, 
  MapPin, 
  Wallet, 
  Calendar,
  TrendingUp,
  Compass
} from "lucide-react";

export default function DashboardPage() {
  const { user, token } = useAuth();

  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ["/api/trips/history"],
    enabled: !!token,
  });

  const recentTrips = trips?.slice(0, 3) || [];
  const totalTrips = trips?.length || 0;
  const totalSavings = trips?.reduce((sum, trip) => sum + (trip.budget - trip.totalCost), 0) || 0;
  const favoriteDestination = trips?.length 
    ? trips.reduce((acc, trip) => {
        acc[trip.destination] = (acc[trip.destination] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};
  const topDestination = Object.entries(favoriteDestination).sort((a, b) => b[1] - a[1])[0]?.[0] || "None yet";

  const stats = [
    {
      label: "Total Trips",
      value: totalTrips.toString(),
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Total Savings",
      value: formatPKR(totalSavings),
      icon: Wallet,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Favorite Destination",
      value: topDestination,
      icon: MapPin,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 
                className="text-3xl font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to plan your next adventure?
              </p>
            </div>
            <Link href="/plan-trip">
              <Button size="lg" data-testid="button-new-trip">
                <Plus className="mr-2 h-5 w-5" />
                Plan New Trip
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-md ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-xl font-semibold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Recent Trips
              </h2>
              {totalTrips > 3 && (
                <Link href="/history">
                  <Button variant="ghost" size="sm">
                    View All
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : recentTrips.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentTrips.map((trip) => (
                  <TripCard 
                    key={trip.id} 
                    trip={trip}
                    onView={() => window.location.href = `/itinerary/${trip.id}`}
                  />
                ))}
              </div>
            ) : (
              <Card className="overflow-visible">
                <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    No Trips Yet
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Start your journey by planning your first trip. Our budget optimizer will help you 
                    explore Pakistan's beautiful destinations without breaking the bank.
                  </p>
                  <Link href="/plan-trip">
                    <Button data-testid="button-first-trip">
                      <Plus className="mr-2 h-5 w-5" />
                      Plan Your First Trip
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Budget Optimization Tip
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Traveling by bus instead of flight to northern areas can save you up to PKR 15,000 per person. 
                    Consider overnight buses for a unique experience and extra savings!
                  </p>
                </div>
                <Link href="/plan-trip">
                  <Button variant="secondary">Try It</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
