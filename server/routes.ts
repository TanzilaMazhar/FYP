import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { optimizeTrip } from "./optimizer";
import { insertUserSchema, loginSchema, createTripSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SESSION_SECRET || "pakistan-travel-secret-key-2024";

interface AuthRequest extends Request {
  userId?: string;
}

function sanitizeUser(user: any) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: result.error.errors[0]?.message || "Invalid input" 
        });
      }

      const { name, email, password } = result.data;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await storage.createUser({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      
      res.status(201).json({
        user: sanitizeUser(user),
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: result.error.errors[0]?.message || "Invalid input" 
        });
      }

      const { email, password } = result.data;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({
        user: sanitizeUser(user),
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/trips/optimize", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const result = createTripSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: result.error.errors[0]?.message || "Invalid input" 
        });
      }

      const optimizationResult = optimizeTrip(result.data, req.userId!);

      if (!optimizationResult.success) {
        return res.status(200).json(optimizationResult);
      }

      const trip = await storage.createTrip(req.userId!, {
        destination: optimizationResult.trip.destination,
        startDate: optimizationResult.trip.startDate,
        endDate: optimizationResult.trip.endDate,
        budget: optimizationResult.trip.budget,
        tripType: optimizationResult.trip.tripType,
        preferences: optimizationResult.trip.preferences,
        totalCost: optimizationResult.trip.totalCost,
        itinerary: optimizationResult.trip.itinerary,
        status: "optimized",
      });

      res.json({
        success: true,
        trip,
        savings: optimizationResult.savings,
      });
    } catch (error) {
      console.error("Optimization error:", error);
      res.status(500).json({ error: "Trip optimization failed" });
    }
  });

  app.get("/api/trips/history", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const trips = await storage.getTripsByUserId(req.userId!);
      res.json(trips);
    } catch (error) {
      console.error("History error:", error);
      res.status(500).json({ error: "Failed to fetch trip history" });
    }
  });

  app.get("/api/trips/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const trip = await storage.getTrip(req.params.id);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      if (trip.userId !== req.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(trip);
    } catch (error) {
      console.error("Get trip error:", error);
      res.status(500).json({ error: "Failed to fetch trip" });
    }
  });

  app.post("/api/trips/:id/save", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const trip = await storage.getTrip(req.params.id);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      if (trip.userId !== req.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      const updatedTrip = await storage.updateTrip(req.params.id, {
        status: "saved",
      });

      res.json(updatedTrip);
    } catch (error) {
      console.error("Save trip error:", error);
      res.status(500).json({ error: "Failed to save trip" });
    }
  });

  app.delete("/api/trips/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const trip = await storage.getTrip(req.params.id);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      if (trip.userId !== req.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      await storage.deleteTrip(req.params.id);

      res.json({ success: true });
    } catch (error) {
      console.error("Delete trip error:", error);
      res.status(500).json({ error: "Failed to delete trip" });
    }
  });

  return httpServer;
}
