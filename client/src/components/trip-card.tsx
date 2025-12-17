import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Wallet, Eye, Trash2 } from "lucide-react";
import type { Trip } from "@shared/schema";
import { formatPKR, getDestinationById } from "@/data/pakistan-data";
import { format } from "date-fns";

interface TripCardProps {
  trip: Trip;
  onView?: () => void;
  onDelete?: () => void;
}

export function TripCard({ trip, onView, onDelete }: TripCardProps) {
  const destination = getDestinationById(trip.destination);
  const savings = trip.budget - trip.totalCost;
  
  return (
    <Card className="overflow-visible hover-elevate" data-testid={`card-trip-${trip.id}`}>
      <div className="relative aspect-video overflow-hidden rounded-t-md">
        <img
          src={destination?.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
          alt={destination?.name || trip.destination}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant={trip.status === "saved" ? "default" : "secondary"}
            className={trip.status === "saved" ? "bg-primary" : ""}
          >
            {trip.status === "saved" ? "Saved" : trip.status === "optimized" ? "Optimized" : "Draft"}
          </Badge>
        </div>
        {savings > 0 && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-green-500/90 text-white dark:bg-green-600/90">
              Saved {formatPKR(savings)}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {destination?.name || trip.destination}
          </h3>
          <Badge variant="outline">
            {trip.tripType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{trip.itinerary.length} days</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{formatPKR(trip.totalCost)}</span>
            <span className="text-sm text-muted-foreground">/ {formatPKR(trip.budget)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={onView}
            data-testid={`button-view-trip-${trip.id}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {onDelete && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onDelete}
              data-testid={`button-delete-trip-${trip.id}`}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
