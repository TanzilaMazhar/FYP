import { randomUUID } from "crypto";
import type { 
  User, 
  InsertUser, 
  Trip, 
  CreateTripInput,
  ItineraryDay 
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser & { password: string }): Promise<User>;
  
  getTrip(id: string): Promise<Trip | undefined>;
  getTripsByUserId(userId: string): Promise<Trip[]>;
  createTrip(userId: string, trip: Omit<Trip, "id" | "userId" | "createdAt">): Promise<Trip>;
  updateTrip(id: string, updates: Partial<Trip>): Promise<Trip | undefined>;
  deleteTrip(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private trips: Map<string, Trip>;

  constructor() {
    this.users = new Map();
    this.trips = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser & { password: string }): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async getTripsByUserId(userId: string): Promise<Trip[]> {
    return Array.from(this.trips.values())
      .filter((trip) => trip.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createTrip(userId: string, tripData: Omit<Trip, "id" | "userId" | "createdAt">): Promise<Trip> {
    const id = randomUUID();
    const trip: Trip = {
      ...tripData,
      id,
      userId,
      createdAt: new Date().toISOString(),
    };
    this.trips.set(id, trip);
    return trip;
  }

  async updateTrip(id: string, updates: Partial<Trip>): Promise<Trip | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;
    
    const updatedTrip = { ...trip, ...updates };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: string): Promise<boolean> {
    return this.trips.delete(id);
  }
}

export const storage = new MemStorage();
