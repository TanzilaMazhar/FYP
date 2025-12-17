import { MapPin, Heart } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Pakistan Travel Planner
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Plan your perfect trip across Pakistan with intelligent budget optimization. 
              Discover beautiful destinations while staying within your budget.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/plan-trip" className="hover:text-foreground transition-colors">
                Plan a Trip
              </Link>
              <Link href="/history" className="hover:text-foreground transition-colors">
                Trip History
              </Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Destinations</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Hunza Valley</span>
              <span>Swat Valley</span>
              <span>Skardu</span>
              <span>Naran Kaghan</span>
            </nav>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>2024 Pakistan Travel Planner. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> for Final Year Project
          </p>
        </div>
      </div>
    </footer>
  );
}
