import type { Destination, Transport, Hotel, Activity } from "@shared/schema";

export const destinations: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    province: "Gilgit-Baltistan",
    description: "A breathtaking mountain valley known for its stunning landscapes, ancient forts, and warm hospitality. Home to the famous Karimabad and views of Rakaposhi peak.",
    imageUrl: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800",
    minBudget: 45000,
    popularActivities: ["Eagle's Nest", "Baltit Fort", "Attabad Lake", "Passu Cones"],
    bestSeason: "April - October",
  },
  {
    id: "swat",
    name: "Swat Valley",
    province: "Khyber Pakhtunkhwa",
    description: "Known as the Switzerland of Pakistan, Swat offers lush green valleys, crystal clear rivers, and rich Buddhist heritage sites.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    minBudget: 25000,
    popularActivities: ["Malam Jabba", "Mingora Bazaar", "Fizagat Park", "Buddhist Ruins"],
    bestSeason: "March - October",
  },
  {
    id: "skardu",
    name: "Skardu",
    province: "Gilgit-Baltistan",
    description: "Gateway to the world's highest peaks, Skardu offers dramatic mountain scenery, ancient fortresses, and serene lakes.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    minBudget: 55000,
    popularActivities: ["Shangrila Resort", "Upper Kachura Lake", "Deosai Plains", "Skardu Fort"],
    bestSeason: "May - September",
  },
  {
    id: "murree",
    name: "Murree",
    province: "Punjab",
    description: "A popular hill station near Islamabad, perfect for a quick getaway with colonial-era charm and pine-covered hills.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    minBudget: 15000,
    popularActivities: ["Mall Road", "Pindi Point", "Kashmir Point", "Patriata Chair Lift"],
    bestSeason: "Year-round",
  },
  {
    id: "lahore",
    name: "Lahore",
    province: "Punjab",
    description: "The cultural heart of Pakistan, offering Mughal architecture, vibrant food scene, and rich history.",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    minBudget: 20000,
    popularActivities: ["Badshahi Mosque", "Lahore Fort", "Food Street", "Shalimar Gardens"],
    bestSeason: "October - March",
  },
  {
    id: "karachi",
    name: "Karachi",
    province: "Sindh",
    description: "Pakistan's largest city and economic hub, offering beaches, historic sites, and diverse food culture.",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    minBudget: 18000,
    popularActivities: ["Clifton Beach", "Quaid's Mausoleum", "Port Grand", "Mohatta Palace"],
    bestSeason: "November - February",
  },
  {
    id: "islamabad",
    name: "Islamabad",
    province: "Federal Capital",
    description: "The beautiful capital city with modern infrastructure, lush green Margalla Hills, and peaceful environment.",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    minBudget: 15000,
    popularActivities: ["Faisal Mosque", "Daman-e-Koh", "Trail 5", "Lok Virsa Museum"],
    bestSeason: "Year-round",
  },
  {
    id: "naran-kaghan",
    name: "Naran Kaghan",
    province: "Khyber Pakhtunkhwa",
    description: "A scenic valley in the Himalayas known for its lakes, waterfalls, and the famous Babusar Pass.",
    imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800",
    minBudget: 35000,
    popularActivities: ["Lake Saiful Muluk", "Lulusar Lake", "Babusar Pass", "Lalazar"],
    bestSeason: "June - September",
  },
];

export const transports: Transport[] = [
  // From Islamabad
  { id: "isb-hunza-bus", type: "bus", from: "Islamabad", to: "Hunza", price: 3500, duration: "15-18 hours", provider: "NATCO" },
  { id: "isb-hunza-flight", type: "flight", from: "Islamabad", to: "Gilgit", price: 18000, duration: "1 hour", provider: "PIA" },
  { id: "isb-swat-bus", type: "bus", from: "Islamabad", to: "Swat", price: 1500, duration: "5-6 hours", provider: "Daewoo" },
  { id: "isb-swat-van", type: "van", from: "Islamabad", to: "Swat", price: 1200, duration: "5 hours", provider: "Local" },
  { id: "isb-skardu-bus", type: "bus", from: "Islamabad", to: "Skardu", price: 4000, duration: "20-24 hours", provider: "NATCO" },
  { id: "isb-skardu-flight", type: "flight", from: "Islamabad", to: "Skardu", price: 20000, duration: "1 hour", provider: "PIA" },
  { id: "isb-murree-bus", type: "bus", from: "Islamabad", to: "Murree", price: 500, duration: "2 hours", provider: "Local" },
  { id: "isb-lahore-bus", type: "bus", from: "Islamabad", to: "Lahore", price: 1800, duration: "5 hours", provider: "Daewoo" },
  { id: "isb-lahore-train", type: "train", from: "Islamabad", to: "Lahore", price: 1200, duration: "4.5 hours", provider: "Pakistan Railways" },
  { id: "isb-karachi-bus", type: "bus", from: "Islamabad", to: "Karachi", price: 4500, duration: "18 hours", provider: "Faisal Movers" },
  { id: "isb-karachi-flight", type: "flight", from: "Islamabad", to: "Karachi", price: 15000, duration: "2 hours", provider: "PIA" },
  { id: "isb-naran-bus", type: "bus", from: "Islamabad", to: "Naran", price: 2000, duration: "8 hours", provider: "Local" },
  // From Lahore
  { id: "lhr-karachi-bus", type: "bus", from: "Lahore", to: "Karachi", price: 3500, duration: "14 hours", provider: "Daewoo" },
  { id: "lhr-karachi-flight", type: "flight", from: "Lahore", to: "Karachi", price: 12000, duration: "1.5 hours", provider: "PIA" },
  { id: "lhr-isb-bus", type: "bus", from: "Lahore", to: "Islamabad", price: 1800, duration: "5 hours", provider: "Daewoo" },
  { id: "lhr-murree-bus", type: "bus", from: "Lahore", to: "Murree", price: 2200, duration: "6 hours", provider: "Daewoo" },
];

export const hotels: Hotel[] = [
  // Hunza
  { id: "hunza-guest-1", name: "Eagle's Nest Guest House", destination: "Hunza", type: "guest-house", pricePerNight: 3500, rating: 4.5, amenities: ["WiFi", "Breakfast", "Mountain View"] },
  { id: "hunza-budget-1", name: "Hunza Embassy Hotel", destination: "Hunza", type: "budget", pricePerNight: 5000, rating: 4.0, amenities: ["WiFi", "Restaurant", "Parking"] },
  { id: "hunza-3star-1", name: "Serena Hunza", destination: "Hunza", type: "3-star", pricePerNight: 15000, rating: 4.8, amenities: ["WiFi", "Restaurant", "Spa", "Garden"] },
  // Swat
  { id: "swat-guest-1", name: "Swat Valley Guest House", destination: "Swat", type: "guest-house", pricePerNight: 2500, rating: 4.2, amenities: ["WiFi", "Breakfast", "Garden"] },
  { id: "swat-budget-1", name: "Rock City Resort", destination: "Swat", type: "budget", pricePerNight: 4000, rating: 4.0, amenities: ["WiFi", "Restaurant", "Pool"] },
  { id: "swat-3star-1", name: "Swat Serena Hotel", destination: "Swat", type: "3-star", pricePerNight: 12000, rating: 4.7, amenities: ["WiFi", "Restaurant", "Spa", "Gym"] },
  // Skardu
  { id: "skardu-guest-1", name: "K2 View Guest House", destination: "Skardu", type: "guest-house", pricePerNight: 4000, rating: 4.3, amenities: ["WiFi", "Breakfast", "Mountain View"] },
  { id: "skardu-budget-1", name: "Shangrila Resort", destination: "Skardu", type: "budget", pricePerNight: 8000, rating: 4.5, amenities: ["WiFi", "Restaurant", "Lake View"] },
  { id: "skardu-3star-1", name: "Skardu Serena", destination: "Skardu", type: "3-star", pricePerNight: 18000, rating: 4.8, amenities: ["WiFi", "Restaurant", "Spa", "Garden"] },
  // Murree
  { id: "murree-guest-1", name: "Pine View Guest House", destination: "Murree", type: "guest-house", pricePerNight: 2000, rating: 4.0, amenities: ["WiFi", "Breakfast"] },
  { id: "murree-budget-1", name: "Pearl Continental Bhurban", destination: "Murree", type: "budget", pricePerNight: 6000, rating: 4.4, amenities: ["WiFi", "Restaurant", "Gym"] },
  { id: "murree-3star-1", name: "Lockwood Hotel", destination: "Murree", type: "3-star", pricePerNight: 10000, rating: 4.6, amenities: ["WiFi", "Restaurant", "Room Service"] },
  // Lahore
  { id: "lahore-guest-1", name: "Lahore Backpackers", destination: "Lahore", type: "guest-house", pricePerNight: 1500, rating: 4.1, amenities: ["WiFi", "Common Area", "Kitchen"] },
  { id: "lahore-budget-1", name: "Avari Towers", destination: "Lahore", type: "budget", pricePerNight: 8000, rating: 4.3, amenities: ["WiFi", "Restaurant", "Pool", "Gym"] },
  { id: "lahore-3star-1", name: "Pearl Continental Lahore", destination: "Lahore", type: "3-star", pricePerNight: 15000, rating: 4.7, amenities: ["WiFi", "Restaurant", "Spa", "Pool"] },
  // Karachi
  { id: "karachi-guest-1", name: "Karachi Guest Inn", destination: "Karachi", type: "guest-house", pricePerNight: 2000, rating: 3.9, amenities: ["WiFi", "AC", "TV"] },
  { id: "karachi-budget-1", name: "Beach Luxury Hotel", destination: "Karachi", type: "budget", pricePerNight: 7000, rating: 4.2, amenities: ["WiFi", "Restaurant", "Sea View"] },
  { id: "karachi-3star-1", name: "Pearl Continental Karachi", destination: "Karachi", type: "3-star", pricePerNight: 16000, rating: 4.6, amenities: ["WiFi", "Restaurant", "Pool", "Spa"] },
  // Islamabad
  { id: "isb-guest-1", name: "Islamabad Guest House", destination: "Islamabad", type: "guest-house", pricePerNight: 2500, rating: 4.0, amenities: ["WiFi", "Breakfast", "Parking"] },
  { id: "isb-budget-1", name: "Islamabad Hotel", destination: "Islamabad", type: "budget", pricePerNight: 6000, rating: 4.2, amenities: ["WiFi", "Restaurant", "Gym"] },
  { id: "isb-3star-1", name: "Serena Islamabad", destination: "Islamabad", type: "3-star", pricePerNight: 20000, rating: 4.9, amenities: ["WiFi", "Restaurant", "Spa", "Pool", "Gym"] },
  // Naran Kaghan
  { id: "naran-guest-1", name: "Naran Guest House", destination: "Naran Kaghan", type: "guest-house", pricePerNight: 3000, rating: 4.1, amenities: ["WiFi", "Breakfast", "River View"] },
  { id: "naran-budget-1", name: "Pine Park Hotel", destination: "Naran Kaghan", type: "budget", pricePerNight: 5500, rating: 4.3, amenities: ["WiFi", "Restaurant", "Parking"] },
  { id: "naran-3star-1", name: "PTDC Naran", destination: "Naran Kaghan", type: "3-star", pricePerNight: 9000, rating: 4.4, amenities: ["WiFi", "Restaurant", "Garden"] },
];

export const activities: Activity[] = [
  // Hunza
  { id: "hunza-eagles-nest", name: "Eagle's Nest Viewpoint", destination: "Hunza", type: "sightseeing", price: 0, duration: "2 hours", description: "Panoramic views of Hunza Valley and surrounding peaks" },
  { id: "hunza-baltit-fort", name: "Baltit Fort Visit", destination: "Hunza", type: "cultural", price: 700, duration: "2 hours", description: "Ancient fort with museum and valley views" },
  { id: "hunza-attabad-lake", name: "Attabad Lake Boating", destination: "Hunza", type: "adventure", price: 1500, duration: "3 hours", description: "Boat ride on the stunning turquoise lake" },
  { id: "hunza-passu-cones", name: "Passu Cones Trek", destination: "Hunza", type: "adventure", price: 500, duration: "4 hours", description: "Trek to see the famous Passu Cathedral peaks" },
  { id: "hunza-local-food", name: "Hunza Traditional Meal", destination: "Hunza", type: "food", price: 800, duration: "1.5 hours", description: "Experience local Hunza cuisine" },
  // Swat
  { id: "swat-malam-jabba", name: "Malam Jabba Skiing", destination: "Swat", type: "adventure", price: 2000, duration: "4 hours", description: "Skiing and chair lift experience" },
  { id: "swat-mingora-bazaar", name: "Mingora Bazaar Tour", destination: "Swat", type: "cultural", price: 0, duration: "2 hours", description: "Explore local markets and handicrafts" },
  { id: "swat-buddhist-ruins", name: "Buddhist Ruins Visit", destination: "Swat", type: "cultural", price: 500, duration: "3 hours", description: "Ancient Gandhara Buddhist heritage sites" },
  { id: "swat-fizagat-park", name: "Fizagat Park", destination: "Swat", type: "sightseeing", price: 200, duration: "2 hours", description: "Beautiful park along Swat River" },
  // Skardu
  { id: "skardu-shangrila", name: "Shangrila Resort Visit", destination: "Skardu", type: "sightseeing", price: 500, duration: "3 hours", description: "The heaven on earth with Lower Kachura Lake" },
  { id: "skardu-upper-kachura", name: "Upper Kachura Lake", destination: "Skardu", type: "adventure", price: 1000, duration: "4 hours", description: "Boat ride and hiking at pristine lake" },
  { id: "skardu-deosai", name: "Deosai Plains Day Trip", destination: "Skardu", type: "adventure", price: 8000, duration: "8 hours", description: "Visit the second highest plateau in the world" },
  { id: "skardu-fort", name: "Skardu Fort Trek", destination: "Skardu", type: "cultural", price: 300, duration: "3 hours", description: "Historic fort with panoramic valley views" },
  // Murree
  { id: "murree-mall-road", name: "Mall Road Walk", destination: "Murree", type: "sightseeing", price: 0, duration: "2 hours", description: "Stroll through the famous shopping street" },
  { id: "murree-pindi-point", name: "Pindi Point Cable Car", destination: "Murree", type: "adventure", price: 600, duration: "1 hour", description: "Cable car ride with city views" },
  { id: "murree-patriata", name: "Patriata Chair Lift", destination: "Murree", type: "adventure", price: 800, duration: "2 hours", description: "Chair lift through pine forests" },
  // Lahore
  { id: "lahore-badshahi", name: "Badshahi Mosque Visit", destination: "Lahore", type: "religious", price: 0, duration: "1.5 hours", description: "Iconic Mughal-era mosque" },
  { id: "lahore-fort", name: "Lahore Fort Tour", destination: "Lahore", type: "cultural", price: 500, duration: "3 hours", description: "UNESCO World Heritage Mughal fort" },
  { id: "lahore-food-street", name: "Food Street Experience", destination: "Lahore", type: "food", price: 1500, duration: "2 hours", description: "Taste famous Lahori cuisine" },
  { id: "lahore-shalimar", name: "Shalimar Gardens", destination: "Lahore", type: "sightseeing", price: 200, duration: "2 hours", description: "Beautiful Mughal garden" },
  // Karachi
  { id: "karachi-clifton", name: "Clifton Beach Evening", destination: "Karachi", type: "sightseeing", price: 0, duration: "2 hours", description: "Relax at the famous beach" },
  { id: "karachi-quaid", name: "Quaid's Mausoleum", destination: "Karachi", type: "cultural", price: 0, duration: "1.5 hours", description: "Pay respects to Pakistan's founder" },
  { id: "karachi-port-grand", name: "Port Grand Dining", destination: "Karachi", type: "food", price: 2000, duration: "2 hours", description: "Waterfront dining experience" },
  { id: "karachi-mohatta", name: "Mohatta Palace Museum", destination: "Karachi", type: "cultural", price: 300, duration: "2 hours", description: "Art and history museum" },
  // Islamabad
  { id: "isb-faisal", name: "Faisal Mosque Visit", destination: "Islamabad", type: "religious", price: 0, duration: "1.5 hours", description: "Largest mosque in Pakistan" },
  { id: "isb-daman", name: "Daman-e-Koh Viewpoint", destination: "Islamabad", type: "sightseeing", price: 0, duration: "2 hours", description: "Panoramic city and hill views" },
  { id: "isb-trail5", name: "Trail 5 Hiking", destination: "Islamabad", type: "adventure", price: 0, duration: "3 hours", description: "Popular Margalla Hills trail" },
  { id: "isb-lokvirsa", name: "Lok Virsa Museum", destination: "Islamabad", type: "cultural", price: 200, duration: "2 hours", description: "Pakistan's folk heritage museum" },
  // Naran Kaghan
  { id: "naran-saiful", name: "Lake Saiful Muluk Trip", destination: "Naran Kaghan", type: "adventure", price: 3000, duration: "5 hours", description: "Jeep ride to the legendary fairy tale lake" },
  { id: "naran-lulusar", name: "Lulusar Lake Visit", destination: "Naran Kaghan", type: "sightseeing", price: 2000, duration: "4 hours", description: "Beautiful alpine lake" },
  { id: "naran-babusar", name: "Babusar Pass Drive", destination: "Naran Kaghan", type: "adventure", price: 4000, duration: "6 hours", description: "Scenic drive through mountain pass" },
  { id: "naran-lalazar", name: "Lalazar Meadows", destination: "Naran Kaghan", type: "sightseeing", price: 1500, duration: "3 hours", description: "Green meadows with mountain backdrop" },
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function getTransportsForRoute(from: string, to: string): Transport[] {
  return transports.filter(t => 
    t.from.toLowerCase().includes(from.toLowerCase()) && 
    t.to.toLowerCase().includes(to.toLowerCase())
  );
}

export function getHotelsForDestination(destination: string): Hotel[] {
  return hotels.filter(h => 
    h.destination.toLowerCase().includes(destination.toLowerCase())
  );
}

export function getActivitiesForDestination(destination: string): Activity[] {
  return activities.filter(a => 
    a.destination.toLowerCase().includes(destination.toLowerCase())
  );
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
