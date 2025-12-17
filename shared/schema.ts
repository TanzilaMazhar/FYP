import { z } from "zod";

// User schema
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export const insertUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Trip types
export type TripType = "leisure" | "family" | "religious" | "adventure";
export type TripPreference = "low-cost" | "sightseeing" | "food" | "cultural" | "nature";

// Destination
export interface Destination {
  id: string;
  name: string;
  province: string;
  description: string;
  imageUrl: string;
  minBudget: number;
  popularActivities: string[];
  bestSeason: string;
}

// Transport options
export interface Transport {
  id: string;
  type: "bus" | "train" | "flight" | "van";
  from: string;
  to: string;
  price: number;
  duration: string;
  provider: string;
}

// Hotel options
export interface Hotel {
  id: string;
  name: string;
  destination: string;
  type: "guest-house" | "budget" | "3-star" | "4-star";
  pricePerNight: number;
  rating: number;
  amenities: string[];
}

// Activities
export interface Activity {
  id: string;
  name: string;
  destination: string;
  type: "sightseeing" | "food" | "adventure" | "cultural" | "religious";
  price: number;
  duration: string;
  description: string;
}

// Itinerary day
export interface ItineraryDay {
  day: number;
  date: string;
  transport?: {
    type: string;
    from: string;
    to: string;
    price: number;
    duration: string;
  };
  hotel?: {
    name: string;
    type: string;
    pricePerNight: number;
  };
  activities: {
    name: string;
    type: string;
    price: number;
    time: string;
  }[];
  dayCost: number;
}

// Trip schema
export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  tripType: TripType;
  preferences: TripPreference[];
  totalCost: number;
  itinerary: ItineraryDay[];
  status: "draft" | "optimized" | "saved";
  createdAt: string;
}

export const createTripSchema = z.object({
  destination: z.string().min(1, "Please select a destination"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z.number().min(5000, "Minimum budget is 5,000 PKR"),
  tripType: z.enum(["leisure", "family", "religious", "adventure"]),
  preferences: z.array(z.enum(["low-cost", "sightseeing", "food", "cultural", "nature"])).min(1, "Select at least one preference"),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;

// Budget optimization result
export interface OptimizationResult {
  success: boolean;
  trip: Trip;
  suggestions?: {
    type: "alternative-destination" | "shorter-trip" | "budget-increase";
    message: string;
    alternativeDestination?: string;
    suggestedDays?: number;
    requiredBudget?: number;
  }[];
  savings: number;
}

// Auth response
export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}
