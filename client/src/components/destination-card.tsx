import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import type { Destination } from "@shared/schema";
import { formatPKR } from "@/data/pakistan-data";

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  selected?: boolean;
}

export function DestinationCard({ destination, onClick, selected }: DestinationCardProps) {
  return (
    <Card
      className={`overflow-visible cursor-pointer transition-all duration-200 hover-elevate active-elevate-2 ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}
      data-testid={`card-destination-${destination.id}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-md">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {destination.province}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {destination.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {destination.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>From {formatPKR(destination.minBudget)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{destination.bestSeason}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
