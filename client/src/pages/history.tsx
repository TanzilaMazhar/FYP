import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TripCard } from "@/components/trip-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Trip } from "@shared/schema";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Compass,
  SlidersHorizontal,
  Calendar,
  Wallet,
  MapPin
} from "lucide-react";

type SortOption = "date" | "budget" | "destination";

export default function HistoryPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [deleteTrip, setDeleteTrip] = useState<Trip | null>(null);

  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ["/api/trips/history"],
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: async (tripId: string) => {
      await apiRequest("DELETE", `/api/trips/${tripId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trips/history"] });
      toast({
        title: "Trip deleted",
        description: "The trip has been removed from your history.",
      });
      setDeleteTrip(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredTrips = trips
    ?.filter((trip) => 
      trip.destination.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "budget":
          return b.budget - a.budget;
        case "destination":
          return a.destination.localeCompare(b.destination);
        default:
          return 0;
      }
    }) || [];

  const sortOptions = [
    { value: "date", label: "Most Recent", icon: Calendar },
    { value: "budget", label: "Budget", icon: Wallet },
    { value: "destination", label: "Destination", icon: MapPin },
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
                Trip History
              </h1>
              <p className="text-muted-foreground mt-1">
                View and manage your saved trips
              </p>
            </div>
            <Link href="/plan-trip">
              <Button data-testid="button-new-trip">
                <Plus className="mr-2 h-5 w-5" />
                Plan New Trip
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by destination..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    data-testid="input-search"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[180px]" data-testid="select-sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredTrips.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onView={() => setLocation(`/itinerary/${trip.id}`)}
                  onDelete={() => setDeleteTrip(trip)}
                />
              ))}
            </div>
          ) : trips?.length === 0 ? (
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
                  You haven't saved any trips yet. Start planning your first adventure 
                  and save it to access it anytime.
                </p>
                <Link href="/plan-trip">
                  <Button data-testid="button-first-trip">
                    <Plus className="mr-2 h-5 w-5" />
                    Plan Your First Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-visible">
              <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  No Results Found
                </h3>
                <p className="text-muted-foreground mb-6">
                  No trips match your search for "{search}"
                </p>
                <Button variant="outline" onClick={() => setSearch("")}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />

      <AlertDialog open={!!deleteTrip} onOpenChange={() => setDeleteTrip(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your trip to {deleteTrip?.destination}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTrip && deleteMutation.mutate(deleteTrip.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
