import { createClient } from '@supabase/supabase-js';
import * as process from "node:process";

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for the frontend
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

// Type definitions for our database tables
export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  category: 'students' | 'alumni' | 'partners';
  image_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  icon: string;
  icon_color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'À venir' | 'Passé' | 'En cours' | 'Planifié' | 'Récurrent';
  image_url?: string;
  location?: string;
  registration_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  image_url?: string;
  goals?: string;
  progress?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Statistic = {
  id: number;
  title: string;
  value: string;
  description: string;
  icon?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  category: 'national' | 'regional' | 'board';
  organization?: string;
  email?: string;
  phone?: string;
  facebook_url?: string;
  twitter_url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactInfo = {
  id: number;
  type: 'address' | 'email' | 'phone' | 'social';
  title: string;
  value: string;
  icon?: string;
  link?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type OpeningHours = {
  id: number;
  days: string;
  hours: string;
  is_closed: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  category?: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  id: number;
  category: string;
  key: string;
  value: string;
  data_type: 'text' | 'boolean' | 'number' | 'json' | 'image';
  description?: string;
  created_at: string;
  updated_at: string;
};

export type MediaLibraryItem = {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  alt_text?: string;
  description?: string;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
};
