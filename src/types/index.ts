// Goat Empire Type Definitions

export type UserRole = 'farmer' | 'trader' | 'vet' | 'admin';

export type Language = 'en' | 'hi';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  farmId?: string;
  avatar?: string;
}

export interface Goat {
  id: string;
  name: string;
  tagId: string;
  breed: string;
  gender: 'male' | 'female';
  birthDate: string;
  weight: number; // kg
  height: number; // cm
  color: string;
  purchasePrice: number;
  currentValue: number;
  photos: string[];
  healthRecords: HealthRecord[];
  breedingHistory: BreedingRecord[];
  milkYield?: MilkYield[];
  location: string;
  feedSchedule: FeedSchedule[];
  status: 'healthy' | 'sick' | 'pregnant' | 'sold';
  pedigree?: Pedigree;
}

export interface HealthRecord {
  id: string;
  date: string;
  type: 'vaccination' | 'checkup' | 'treatment' | 'surgery';
  description: string;
  vetName: string;
  medicine?: string;
  cost: number;
  nextCheckup?: string;
}

export interface BreedingRecord {
  id: string;
  date: string;
  partnerId: string;
  partnerName: string;
  successful: boolean;
  offspringIds?: string[];
  notes: string;
}

export interface MilkYield {
  date: string;
  morning: number; // liters
  evening: number; // liters
}

export interface FeedSchedule {
  time: string;
  type: string;
  quantity: number; // kg
  cost: number;
}

export interface Pedigree {
  fatherId?: string;
  motherId?: string;
  grandFatherIds?: string[];
  grandMotherIds?: string[];
}

export interface Farm {
  id: string;
  name: string;
  ownerId: string;
  location: string;
  totalGoats: number;
  totalArea: number; // acres
  established: string;
}

export interface DashboardStats {
  totalGoats: number;
  monthlyProfit: number;
  profitChange: number;
  healthyGoats: number;
  sickGoats: number;
  pregnantGoats: number;
  totalValue: number;
  avgWeight: number;
  diseaseAlerts: number;
}

export interface MarketListing {
  id: string;
  goatId: string;
  goat: Goat;
  sellerId: string;
  sellerName: string;
  price: number;
  negotiable: boolean;
  location: string;
  postedDate: string;
  status: 'active' | 'sold' | 'reserved';
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'breeding' | 'health' | 'nutrition' | 'market' | 'general';
  content: string;
  author: string;
  publishedDate: string;
  image?: string;
  views: number;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
