import { useRoute, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ItineraryTimeline } from "@/components/itinerary-timeline";
import { BudgetSummary } from "@/components/budget-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { getDestinationById, formatPKR } from "@/data/pakistan-data";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Trip } from "@shared/schema";
import { format } from "date-fns";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Save, 
  Share2, 
  Printer,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function ItineraryPage() {
  const [, params] = useRoute("/itinerary/:id");
  const { toast } = useToast();
  const { token } = useAuth();

  const { data: trip, isLoading, error } = useQuery<Trip>({
    queryKey: ["/api/trips", params?.id],
    enabled: !!params?.id && !!token,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/trips/${params?.id}/save`, {});
      return response as Trip;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trips", params?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/trips/history"] });
      toast({
        title: "Trip saved!",
        description: "Your itinerary has been saved to your history.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-48 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Trip Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The itinerary you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const destination = getDestinationById(trip.destination);
  const tripDays = trip.itinerary.length;
  const savings = trip.budget - trip.totalCost;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span>Itinerary</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {destination?.name || trip.destination}
                </h1>
                <Badge 
                  variant={trip.status === "saved" ? "default" : "secondary"}
                  className={trip.status === "saved" ? "bg-primary" : ""}
                >
                  {trip.status === "saved" ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Optimized
                    </>
                  )}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tripDays} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="capitalize">{trip.tripType}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {trip.status !== "saved" && (
                <Button
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  data-testid="button-save-trip"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Trip
                    </>
                  )}
                </Button>
              )}
              <Button variant="outline" onClick={() => window.print()} data-testid="button-print">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          {savings > 0 && (
            <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20">
                    <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Great news! You're saving {formatPKR(savings)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Our optimizer found the best options within your {formatPKR(trip.budget)} budget
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Your Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ItineraryTimeline itinerary={trip.itinerary} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <BudgetSummary trip={trip} />

              {destination && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">About {destination.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                    <div>
                      <p className="text-sm font-medium mb-2">Best Season</p>
                      <Badge variant="secondary">{destination.bestSeason}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Popular Activities</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.popularActivities.slice(0, 4).map((activity) => (
                          <Badge key={activity} variant="outline">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Share Itinerary</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
