import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bus, Hotel, Camera, Wallet, TrendingDown, PiggyBank } from "lucide-react";
import type { Trip } from "@shared/schema";
import { formatPKR } from "@/data/pakistan-data";

interface BudgetSummaryProps {
  trip: Trip;
}

export function BudgetSummary({ trip }: BudgetSummaryProps) {
  const transportCost = trip.itinerary.reduce(
    (sum, day) => sum + (day.transport?.price || 0),
    0
  );
  
  const hotelCost = trip.itinerary.reduce(
    (sum, day) => sum + (day.hotel?.pricePerNight || 0),
    0
  );
  
  const activitiesCost = trip.itinerary.reduce(
    (sum, day) => sum + day.activities.reduce((actSum, act) => actSum + act.price, 0),
    0
  );

  const budgetUsedPercent = Math.min((trip.totalCost / trip.budget) * 100, 100);
  const savings = trip.budget - trip.totalCost;

  const breakdownItems = [
    {
      label: "Transport",
      amount: transportCost,
      icon: Bus,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Accommodation",
      amount: hotelCost,
      icon: Hotel,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Activities",
      amount: activitiesCost,
      icon: Camera,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="h-5 w-5" />
          Budget Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Budget Used</span>
            <span className="font-semibold">
              {formatPKR(trip.totalCost)} / {formatPKR(trip.budget)}
            </span>
          </div>
          <Progress value={budgetUsedPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {budgetUsedPercent.toFixed(0)}% of budget used
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Cost Breakdown</h4>
          {breakdownItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-md ${item.bgColor}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="font-medium text-sm">{formatPKR(item.amount)}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <TrendingDown className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Total Cost</span>
            </div>
            <span className="font-bold text-lg">{formatPKR(trip.totalCost)}</span>
          </div>
          
          {savings > 0 && (
            <div className="flex items-center justify-between text-green-600 dark:text-green-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100 dark:bg-green-900/30">
                  <PiggyBank className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">You Save</span>
              </div>
              <span className="font-bold text-lg">{formatPKR(savings)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
