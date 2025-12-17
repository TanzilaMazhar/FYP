import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { destinations, formatPKR } from "@/data/pakistan-data";
import { createTripSchema, type CreateTripInput, type OptimizationResult } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { 
  CalendarIcon, 
  Loader2, 
  MapPin, 
  Wallet, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const tripTypes = [
  { value: "leisure", label: "Leisure", description: "Relaxation and sightseeing" },
  { value: "family", label: "Family", description: "Kid-friendly activities" },
  { value: "religious", label: "Religious", description: "Spiritual destinations" },
  { value: "adventure", label: "Adventure", description: "Thrill and exploration" },
];

const preferences = [
  { value: "low-cost", label: "Low Cost", description: "Maximum savings" },
  { value: "sightseeing", label: "Sightseeing", description: "Popular attractions" },
  { value: "food", label: "Food", description: "Local cuisine" },
  { value: "cultural", label: "Cultural", description: "Heritage sites" },
  { value: "nature", label: "Nature", description: "Scenic spots" },
];

export default function PlanTripPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { token } = useAuth();
  const [step, setStep] = useState(1);

  const form = useForm<CreateTripInput>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      budget: 50000,
      tripType: "leisure",
      preferences: ["sightseeing"],
    },
  });

  const optimizeMutation = useMutation({
    mutationFn: async (data: CreateTripInput) => {
      const response = await apiRequest("POST", "/api/trips/optimize", data);
      return response as OptimizationResult;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Trip optimized!",
          description: `Your itinerary is ready. You'll save ${formatPKR(data.savings)}!`,
        });
        setLocation(`/itinerary/${data.trip.id}`);
      } else {
        toast({
          title: "Optimization suggestions",
          description: data.suggestions?.[0]?.message || "Please adjust your preferences",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Optimization failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreateTripInput) => {
    optimizeMutation.mutate(data);
  };

  const selectedDestination = destinations.find(d => d.id === form.watch("destination"));
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const budget = form.watch("budget");

  const steps = [
    { number: 1, title: "Destination" },
    { number: 2, title: "Dates & Budget" },
    { number: 3, title: "Preferences" },
    { number: 4, title: "Review" },
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!form.watch("destination");
      case 2:
        return !!startDate && !!endDate && budget >= 5000;
      case 3:
        return form.watch("preferences").length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Plan Your Trip
            </h1>
            <p className="text-muted-foreground">
              Let our optimizer create the perfect itinerary for you
            </p>
          </div>

          <div className="flex items-center justify-center mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div 
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors",
                    step >= s.number 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.number ? <CheckCircle className="h-5 w-5" /> : s.number}
                </div>
                <span 
                  className={cn(
                    "ml-2 text-sm hidden sm:inline",
                    step >= s.number ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                      step > s.number ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Choose Your Destination
                    </CardTitle>
                    <CardDescription>
                      Select where you want to go in Pakistan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {destinations.map((destination) => (
                              <DestinationCard
                                key={destination.id}
                                destination={destination}
                                selected={field.value === destination.id}
                                onClick={() => field.onChange(destination.id)}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Dates & Budget
                    </CardTitle>
                    <CardDescription>
                      When are you traveling and what's your budget?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    data-testid="button-start-date"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) => field.onChange(date?.toISOString() || "")}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    data-testid="button-end-date"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) => field.onChange(date?.toISOString() || "")}
                                  disabled={(date) => 
                                    date < new Date() || 
                                    (startDate ? date < new Date(startDate) : false)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget (PKR)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="Enter your budget"
                                className="pl-10"
                                data-testid="input-budget"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Minimum budget: PKR 5,000
                            {selectedDestination && (
                              <span className="block mt-1">
                                Recommended for {selectedDestination.name}: {formatPKR(selectedDestination.minBudget)}+
                              </span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Trip Preferences
                    </CardTitle>
                    <CardDescription>
                      Tell us what kind of experience you're looking for
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="tripType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trip Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-trip-type">
                                <SelectValue placeholder="Select trip type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tripTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex flex-col">
                                    <span>{type.label}</span>
                                    <span className="text-xs text-muted-foreground">{type.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferences"
                      render={() => (
                        <FormItem>
                          <FormLabel>Preferences</FormLabel>
                          <FormDescription>
                            Select what matters most to you
                          </FormDescription>
                          <div className="grid sm:grid-cols-2 gap-3 mt-2">
                            {preferences.map((pref) => (
                              <FormField
                                key={pref.value}
                                control={form.control}
                                name="preferences"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <label
                                        className={cn(
                                          "flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-colors hover-elevate",
                                          field.value?.includes(pref.value as any)
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                        )}
                                      >
                                        <Checkbox
                                          checked={field.value?.includes(pref.value as any)}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || [];
                                            if (checked) {
                                              field.onChange([...current, pref.value]);
                                            } else {
                                              field.onChange(current.filter((v) => v !== pref.value));
                                            }
                                          }}
                                          data-testid={`checkbox-${pref.value}`}
                                        />
                                        <div>
                                          <p className="font-medium text-sm">{pref.label}</p>
                                          <p className="text-xs text-muted-foreground">{pref.description}</p>
                                        </div>
                                      </label>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Review Your Trip
                    </CardTitle>
                    <CardDescription>
                      Confirm your details before we optimize your itinerary
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Destination</h4>
                        <p className="font-semibold text-lg">{selectedDestination?.name || "Not selected"}</p>
                        {selectedDestination && (
                          <Badge variant="secondary" className="mt-1">{selectedDestination.province}</Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Budget</h4>
                        <p className="font-semibold text-lg">{formatPKR(budget)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Travel Dates</h4>
                        <p className="font-semibold">
                          {startDate && format(new Date(startDate), "MMM d, yyyy")}
                          {" - "}
                          {endDate && format(new Date(endDate), "MMM d, yyyy")}
                        </p>
                        {startDate && endDate && (
                          <p className="text-sm text-muted-foreground">
                            {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                          </p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Trip Type</h4>
                        <p className="font-semibold capitalize">{form.watch("tripType")}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferences</h4>
                      <div className="flex flex-wrap gap-2">
                        {form.watch("preferences").map((pref) => (
                          <Badge key={pref} variant="secondary" className="capitalize">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(Math.min(4, step + 1))}
                    disabled={!canProceed()}
                    data-testid="button-next-step"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={optimizeMutation.isPending}
                    data-testid="button-optimize"
                  >
                    {optimizeMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Optimize Trip
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
