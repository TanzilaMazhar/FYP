import { Link, useLocation } from "wouter";
import { MapPin, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isAuthPage = location === "/login" || location === "/register";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pakistan Travel
            </span>
          </Link>

          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-1">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant={location === "/dashboard" ? "secondary" : "ghost"}
                      data-testid="link-dashboard"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/plan-trip">
                    <Button
                      variant={location === "/plan-trip" ? "secondary" : "ghost"}
                      data-testid="link-plan-trip"
                    >
                      Plan Trip
                    </Button>
                  </Link>
                  <Link href="/history">
                    <Button
                      variant={location === "/history" ? "secondary" : "ghost"}
                      data-testid="link-history"
                    >
                      Trip History
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href="#how-it-works">
                    <Button variant="ghost">How It Works</Button>
                  </a>
                  <a href="#destinations">
                    <Button variant="ghost">Destinations</Button>
                  </a>
                </>
              )}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {!isAuthPage && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid="button-user-menu">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled className="text-muted-foreground">
                        {user?.name}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" data-testid="link-login">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button data-testid="link-register">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="button-mobile-menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && !isAuthPage && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/plan-trip" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Plan Trip
                    </Button>
                  </Link>
                  <Link href="/history" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Trip History
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
