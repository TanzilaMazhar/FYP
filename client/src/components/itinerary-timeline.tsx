import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  Plane, 
  Train, 
  Car, 
  Hotel, 
  Camera, 
  Utensils, 
  Mountain, 
  Landmark, 
  Church 
} from "lucide-react";
import type { ItineraryDay } from "@shared/schema";
import { formatPKR } from "@/data/pakistan-data";
import { format } from "date-fns";

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[];
}

const transportIcons = {
  bus: Bus,
  flight: Plane,
  train: Train,
  van: Car,
};

const activityIcons = {
  sightseeing: Camera,
  food: Utensils,
  adventure: Mountain,
  cultural: Landmark,
  religious: Church,
};

export function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div className="space-y-6">
      {itinerary.map((day, index) => (
        <div key={day.day} className="relative" data-testid={`itinerary-day-${day.day}`}>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {day.day}
              </div>
              {index < itinerary.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>
            
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Day {day.day}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(day.date), "EEEE, MMM d")}
                </span>
                <Badge variant="outline" className="ml-auto">
                  {formatPKR(day.dayCost)}
                </Badge>
              </div>

              <div className="space-y-3">
                {day.transport && (
                  <Card className="overflow-visible">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {(() => {
                          const IconComponent = transportIcons[day.transport.type as keyof typeof transportIcons] || Bus;
                          return (
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30">
                              <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          );
                        })()}
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h4 className="font-medium">
                              {day.transport.from} to {day.transport.to}
                            </h4>
                            <span className="font-semibold text-sm">
                              {formatPKR(day.transport.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                            <Badge variant="secondary">
                              {day.transport.type}
                            </Badge>
                            <span>{day.transport.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {day.hotel && (
                  <Card className="overflow-visible">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/30">
                          <Hotel className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h4 className="font-medium">{day.hotel.name}</h4>
                            <span className="font-semibold text-sm">
                              {formatPKR(day.hotel.pricePerNight)}/night
                            </span>
                          </div>
                          <Badge variant="secondary" className="mt-1">
                            {day.hotel.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {day.activities.length > 0 && (
                  <Card className="overflow-visible">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Activities</h4>
                      <div className="space-y-3">
                        {day.activities.map((activity, actIndex) => {
                          const IconComponent = activityIcons[activity.type as keyof typeof activityIcons] || Camera;
                          return (
                            <div key={actIndex} className="flex items-start gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100 dark:bg-green-900/30">
                                <IconComponent className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <span className="font-medium text-sm">{activity.name}</span>
                                  <span className="text-sm">
                                    {activity.price > 0 ? formatPKR(activity.price) : "Free"}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
