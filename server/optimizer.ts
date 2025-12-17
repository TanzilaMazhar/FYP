import type { 
  CreateTripInput, 
  Trip, 
  ItineraryDay, 
  OptimizationResult
} from "@shared/schema";

interface Destination {
  id: string;
  name: string;
  province: string;
  minBudget: number;
}

interface TransportData {
  type: "bus" | "train" | "flight" | "van";
  from: string;
  to: string;
  price: number;
  duration: string;
}

interface HotelData {
  name: string;
  destination: string;
  type: "guest-house" | "budget" | "3-star" | "4-star";
  pricePerNight: number;
}

interface ActivityData {
  name: string;
  destination: string;
  type: "sightseeing" | "food" | "adventure" | "cultural" | "religious";
  price: number;
  duration: string;
}

const destinations: Destination[] = [
  { id: "hunza", name: "Hunza Valley", province: "Gilgit-Baltistan", minBudget: 45000 },
  { id: "swat", name: "Swat Valley", province: "Khyber Pakhtunkhwa", minBudget: 25000 },
  { id: "skardu", name: "Skardu", province: "Gilgit-Baltistan", minBudget: 55000 },
  { id: "murree", name: "Murree", province: "Punjab", minBudget: 15000 },
  { id: "lahore", name: "Lahore", province: "Punjab", minBudget: 20000 },
  { id: "karachi", name: "Karachi", province: "Sindh", minBudget: 18000 },
  { id: "islamabad", name: "Islamabad", province: "Federal Capital", minBudget: 15000 },
  { id: "naran-kaghan", name: "Naran Kaghan", province: "Khyber Pakhtunkhwa", minBudget: 35000 },
];

const transports: TransportData[] = [
  { type: "bus", from: "Islamabad", to: "Hunza", price: 3500, duration: "15-18 hours" },
  { type: "flight", from: "Islamabad", to: "Gilgit", price: 18000, duration: "1 hour" },
  { type: "bus", from: "Islamabad", to: "Swat", price: 1500, duration: "5-6 hours" },
  { type: "van", from: "Islamabad", to: "Swat", price: 1200, duration: "5 hours" },
  { type: "bus", from: "Islamabad", to: "Skardu", price: 4000, duration: "20-24 hours" },
  { type: "flight", from: "Islamabad", to: "Skardu", price: 20000, duration: "1 hour" },
  { type: "bus", from: "Islamabad", to: "Murree", price: 500, duration: "2 hours" },
  { type: "bus", from: "Islamabad", to: "Lahore", price: 1800, duration: "5 hours" },
  { type: "train", from: "Islamabad", to: "Lahore", price: 1200, duration: "4.5 hours" },
  { type: "bus", from: "Islamabad", to: "Karachi", price: 4500, duration: "18 hours" },
  { type: "flight", from: "Islamabad", to: "Karachi", price: 15000, duration: "2 hours" },
  { type: "bus", from: "Islamabad", to: "Naran", price: 2000, duration: "8 hours" },
  { type: "bus", from: "Lahore", to: "Karachi", price: 3500, duration: "14 hours" },
  { type: "bus", from: "Lahore", to: "Islamabad", price: 1800, duration: "5 hours" },
  { type: "bus", from: "Lahore", to: "Murree", price: 2200, duration: "6 hours" },
];

const hotels: HotelData[] = [
  { name: "Eagle's Nest Guest House", destination: "Hunza", type: "guest-house", pricePerNight: 3500 },
  { name: "Hunza Embassy Hotel", destination: "Hunza", type: "budget", pricePerNight: 5000 },
  { name: "Serena Hunza", destination: "Hunza", type: "3-star", pricePerNight: 15000 },
  { name: "Swat Valley Guest House", destination: "Swat", type: "guest-house", pricePerNight: 2500 },
  { name: "Rock City Resort", destination: "Swat", type: "budget", pricePerNight: 4000 },
  { name: "Swat Serena Hotel", destination: "Swat", type: "3-star", pricePerNight: 12000 },
  { name: "K2 View Guest House", destination: "Skardu", type: "guest-house", pricePerNight: 4000 },
  { name: "Shangrila Resort", destination: "Skardu", type: "budget", pricePerNight: 8000 },
  { name: "Skardu Serena", destination: "Skardu", type: "3-star", pricePerNight: 18000 },
  { name: "Pine View Guest House", destination: "Murree", type: "guest-house", pricePerNight: 2000 },
  { name: "Pearl Continental Bhurban", destination: "Murree", type: "budget", pricePerNight: 6000 },
  { name: "Lockwood Hotel", destination: "Murree", type: "3-star", pricePerNight: 10000 },
  { name: "Lahore Backpackers", destination: "Lahore", type: "guest-house", pricePerNight: 1500 },
  { name: "Avari Towers", destination: "Lahore", type: "budget", pricePerNight: 8000 },
  { name: "Pearl Continental Lahore", destination: "Lahore", type: "3-star", pricePerNight: 15000 },
  { name: "Karachi Guest Inn", destination: "Karachi", type: "guest-house", pricePerNight: 2000 },
  { name: "Beach Luxury Hotel", destination: "Karachi", type: "budget", pricePerNight: 7000 },
  { name: "Pearl Continental Karachi", destination: "Karachi", type: "3-star", pricePerNight: 16000 },
  { name: "Islamabad Guest House", destination: "Islamabad", type: "guest-house", pricePerNight: 2500 },
  { name: "Islamabad Hotel", destination: "Islamabad", type: "budget", pricePerNight: 6000 },
  { name: "Serena Islamabad", destination: "Islamabad", type: "3-star", pricePerNight: 20000 },
  { name: "Naran Guest House", destination: "Naran Kaghan", type: "guest-house", pricePerNight: 3000 },
  { name: "Pine Park Hotel", destination: "Naran Kaghan", type: "budget", pricePerNight: 5500 },
  { name: "PTDC Naran", destination: "Naran Kaghan", type: "3-star", pricePerNight: 9000 },
];

const activities: ActivityData[] = [
  { name: "Eagle's Nest Viewpoint", destination: "Hunza", type: "sightseeing", price: 0, duration: "2 hours" },
  { name: "Baltit Fort Visit", destination: "Hunza", type: "cultural", price: 700, duration: "2 hours" },
  { name: "Attabad Lake Boating", destination: "Hunza", type: "adventure", price: 1500, duration: "3 hours" },
  { name: "Passu Cones Trek", destination: "Hunza", type: "adventure", price: 500, duration: "4 hours" },
  { name: "Hunza Traditional Meal", destination: "Hunza", type: "food", price: 800, duration: "1.5 hours" },
  { name: "Malam Jabba Skiing", destination: "Swat", type: "adventure", price: 2000, duration: "4 hours" },
  { name: "Mingora Bazaar Tour", destination: "Swat", type: "cultural", price: 0, duration: "2 hours" },
  { name: "Buddhist Ruins Visit", destination: "Swat", type: "cultural", price: 500, duration: "3 hours" },
  { name: "Fizagat Park", destination: "Swat", type: "sightseeing", price: 200, duration: "2 hours" },
  { name: "Shangrila Resort Visit", destination: "Skardu", type: "sightseeing", price: 500, duration: "3 hours" },
  { name: "Upper Kachura Lake", destination: "Skardu", type: "adventure", price: 1000, duration: "4 hours" },
  { name: "Deosai Plains Day Trip", destination: "Skardu", type: "adventure", price: 8000, duration: "8 hours" },
  { name: "Skardu Fort Trek", destination: "Skardu", type: "cultural", price: 300, duration: "3 hours" },
  { name: "Mall Road Walk", destination: "Murree", type: "sightseeing", price: 0, duration: "2 hours" },
  { name: "Pindi Point Cable Car", destination: "Murree", type: "adventure", price: 600, duration: "1 hour" },
  { name: "Patriata Chair Lift", destination: "Murree", type: "adventure", price: 800, duration: "2 hours" },
  { name: "Badshahi Mosque Visit", destination: "Lahore", type: "religious", price: 0, duration: "1.5 hours" },
  { name: "Lahore Fort Tour", destination: "Lahore", type: "cultural", price: 500, duration: "3 hours" },
  { name: "Food Street Experience", destination: "Lahore", type: "food", price: 1500, duration: "2 hours" },
  { name: "Shalimar Gardens", destination: "Lahore", type: "sightseeing", price: 200, duration: "2 hours" },
  { name: "Clifton Beach Evening", destination: "Karachi", type: "sightseeing", price: 0, duration: "2 hours" },
  { name: "Quaid's Mausoleum", destination: "Karachi", type: "cultural", price: 0, duration: "1.5 hours" },
  { name: "Port Grand Dining", destination: "Karachi", type: "food", price: 2000, duration: "2 hours" },
  { name: "Mohatta Palace Museum", destination: "Karachi", type: "cultural", price: 300, duration: "2 hours" },
  { name: "Faisal Mosque Visit", destination: "Islamabad", type: "religious", price: 0, duration: "1.5 hours" },
  { name: "Daman-e-Koh Viewpoint", destination: "Islamabad", type: "sightseeing", price: 0, duration: "2 hours" },
  { name: "Trail 5 Hiking", destination: "Islamabad", type: "adventure", price: 0, duration: "3 hours" },
  { name: "Lok Virsa Museum", destination: "Islamabad", type: "cultural", price: 200, duration: "2 hours" },
  { name: "Lake Saiful Muluk Trip", destination: "Naran Kaghan", type: "adventure", price: 3000, duration: "5 hours" },
  { name: "Lulusar Lake Visit", destination: "Naran Kaghan", type: "sightseeing", price: 2000, duration: "4 hours" },
  { name: "Babusar Pass Drive", destination: "Naran Kaghan", type: "adventure", price: 4000, duration: "6 hours" },
  { name: "Lalazar Meadows", destination: "Naran Kaghan", type: "sightseeing", price: 1500, duration: "3 hours" },
];

function getDestinationName(id: string): string {
  const dest = destinations.find(d => d.id === id);
  return dest?.name || id;
}

function getTransportsForDestination(destinationId: string): TransportData[] {
  const destName = getDestinationName(destinationId);
  return transports.filter(t => 
    t.to.toLowerCase().includes(destName.toLowerCase().split(' ')[0]) ||
    destName.toLowerCase().includes(t.to.toLowerCase().split(' ')[0])
  );
}

function getHotelsForDestination(destinationId: string): HotelData[] {
  const destName = getDestinationName(destinationId);
  return hotels.filter(h => 
    h.destination.toLowerCase().includes(destName.toLowerCase().split(' ')[0]) ||
    destName.toLowerCase().includes(h.destination.toLowerCase().split(' ')[0])
  );
}

function getActivitiesForDestination(destinationId: string): ActivityData[] {
  const destName = getDestinationName(destinationId);
  return activities.filter(a => 
    a.destination.toLowerCase().includes(destName.toLowerCase().split(' ')[0]) ||
    destName.toLowerCase().includes(a.destination.toLowerCase().split(' ')[0])
  );
}

function selectCheapestTransport(availableTransports: TransportData[], maxBudget: number): TransportData | null {
  const sorted = [...availableTransports].sort((a, b) => a.price - b.price);
  for (const transport of sorted) {
    if (transport.price * 2 <= maxBudget) {
      return transport;
    }
  }
  return sorted[0] || null;
}

function selectCheapestHotel(availableHotels: HotelData[], maxPerNight: number): HotelData | null {
  const sorted = [...availableHotels].sort((a, b) => a.pricePerNight - b.pricePerNight);
  for (const hotel of sorted) {
    if (hotel.pricePerNight <= maxPerNight) {
      return hotel;
    }
  }
  return sorted[0] || null;
}

function selectAffordableActivities(
  availableActivities: ActivityData[], 
  maxBudget: number,
  preferences: string[],
  tripType: string,
  usedActivities: string[]
): ActivityData[] {
  const remaining = availableActivities.filter(a => !usedActivities.includes(a.name));
  
  let prioritized = [...remaining];
  
  if (tripType === "religious") {
    prioritized.sort((a, b) => {
      if (a.type === "religious" && b.type !== "religious") return -1;
      if (b.type === "religious" && a.type !== "religious") return 1;
      return a.price - b.price;
    });
  } else if (tripType === "adventure") {
    prioritized.sort((a, b) => {
      if (a.type === "adventure" && b.type !== "adventure") return -1;
      if (b.type === "adventure" && a.type !== "adventure") return 1;
      return a.price - b.price;
    });
  } else {
    prioritized.sort((a, b) => a.price - b.price);
  }
  
  if (preferences.includes("low-cost")) {
    prioritized.sort((a, b) => a.price - b.price);
  }
  
  const selected: ActivityData[] = [];
  let totalCost = 0;
  
  for (const activity of prioritized) {
    if (totalCost + activity.price <= maxBudget && selected.length < 2) {
      selected.push(activity);
      totalCost += activity.price;
    }
  }
  
  if (selected.length === 0) {
    const freeActivities = remaining.filter(a => a.price === 0);
    return freeActivities.slice(0, 2);
  }
  
  return selected;
}

export function optimizeTrip(input: CreateTripInput, userId: string): OptimizationResult {
  const startDate = new Date(input.startDate);
  const endDate = new Date(input.endDate);
  const tripDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const destination = destinations.find(d => d.id === input.destination);
  
  if (!destination) {
    return {
      success: false,
      trip: {} as Trip,
      suggestions: [{
        type: "alternative-destination",
        message: "Invalid destination selected. Please choose from available destinations.",
      }],
      savings: 0,
    };
  }
  
  if (input.budget < destination.minBudget) {
    const cheaperDestinations = destinations
      .filter(d => d.minBudget <= input.budget)
      .sort((a, b) => b.minBudget - a.minBudget);
    
    return {
      success: false,
      trip: {} as Trip,
      suggestions: [
        {
          type: "budget-increase",
          message: `Your budget of PKR ${input.budget.toLocaleString()} is below the minimum of PKR ${destination.minBudget.toLocaleString()} for ${destination.name}.`,
          requiredBudget: destination.minBudget,
        },
        ...(cheaperDestinations.length > 0 ? [{
          type: "alternative-destination" as const,
          message: `Consider ${cheaperDestinations[0].name} which has a minimum budget of PKR ${cheaperDestinations[0].minBudget.toLocaleString()}.`,
          alternativeDestination: cheaperDestinations[0].id,
        }] : []),
      ],
      savings: 0,
    };
  }
  
  const availableTransports = getTransportsForDestination(input.destination);
  const availableHotels = getHotelsForDestination(input.destination);
  const availableActivities = getActivitiesForDestination(input.destination);
  
  const transport = selectCheapestTransport(availableTransports, input.budget * 0.25);
  const transportCost = transport ? transport.price * 2 : 0;
  
  const budgetAfterTransport = input.budget - transportCost;
  const nightsNeeded = tripDays - 1;
  const maxPerNight = nightsNeeded > 0 ? (budgetAfterTransport * 0.5) / nightsNeeded : 0;
  
  const hotel = selectCheapestHotel(availableHotels, maxPerNight);
  const hotelCost = hotel ? hotel.pricePerNight * nightsNeeded : 0;
  
  const budgetForActivities = budgetAfterTransport - hotelCost;
  const dailyActivityBudget = budgetForActivities / tripDays;
  
  if (transportCost + hotelCost > input.budget) {
    const suggestedDays = Math.max(2, Math.floor(tripDays * 0.6));
    return {
      success: false,
      trip: {} as Trip,
      suggestions: [{
        type: "shorter-trip",
        message: `Cannot fit transport and accommodation within your budget. Try a ${suggestedDays}-day trip instead.`,
        suggestedDays,
      }],
      savings: 0,
    };
  }
  
  const itinerary: ItineraryDay[] = [];
  let totalCost = 0;
  let remainingBudget = input.budget;
  const usedActivities: string[] = [];
  
  for (let day = 1; day <= tripDays; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day - 1);
    
    const itineraryDay: ItineraryDay = {
      day,
      date: currentDate.toISOString(),
      activities: [],
      dayCost: 0,
    };
    
    if (day === 1 && transport) {
      itineraryDay.transport = {
        type: transport.type,
        from: transport.from,
        to: transport.to,
        price: transport.price,
        duration: transport.duration,
      };
      itineraryDay.dayCost += transport.price;
      remainingBudget -= transport.price;
    }
    
    if (day === tripDays && transport) {
      itineraryDay.transport = {
        type: transport.type,
        from: transport.to,
        to: transport.from,
        price: transport.price,
        duration: transport.duration,
      };
      itineraryDay.dayCost += transport.price;
      remainingBudget -= transport.price;
    }
    
    if (hotel && day < tripDays) {
      itineraryDay.hotel = {
        name: hotel.name,
        type: hotel.type,
        pricePerNight: hotel.pricePerNight,
      };
      itineraryDay.dayCost += hotel.pricePerNight;
      remainingBudget -= hotel.pricePerNight;
    }
    
    const maxActivityBudget = Math.min(dailyActivityBudget, remainingBudget * 0.3);
    
    const dayActivities = selectAffordableActivities(
      availableActivities,
      maxActivityBudget,
      input.preferences,
      input.tripType,
      usedActivities
    );
    
    const times = ["10:00 AM", "2:00 PM", "5:00 PM"];
    dayActivities.forEach((activity, index) => {
      if (remainingBudget >= activity.price) {
        itineraryDay.activities.push({
          name: activity.name,
          type: activity.type,
          price: activity.price,
          time: times[index] || "4:00 PM",
        });
        itineraryDay.dayCost += activity.price;
        remainingBudget -= activity.price;
        usedActivities.push(activity.name);
      }
    });
    
    totalCost += itineraryDay.dayCost;
    itinerary.push(itineraryDay);
  }
  
  if (totalCost > input.budget) {
    return {
      success: false,
      trip: {} as Trip,
      suggestions: [{
        type: "budget-increase",
        message: `Unable to create an itinerary within your budget. Minimum required: PKR ${totalCost.toLocaleString()}`,
        requiredBudget: totalCost,
      }],
      savings: 0,
    };
  }
  
  const trip: Trip = {
    id: "",
    userId,
    destination: input.destination,
    startDate: input.startDate,
    endDate: input.endDate,
    budget: input.budget,
    tripType: input.tripType,
    preferences: input.preferences,
    totalCost,
    itinerary,
    status: "optimized",
    createdAt: new Date().toISOString(),
  };
  
  return {
    success: true,
    trip,
    savings: input.budget - totalCost,
  };
}
