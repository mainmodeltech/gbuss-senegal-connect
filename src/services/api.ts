
import supabase from '../lib/supabase';
import type { 
  Testimonial, Activity, Event, Project,
  Statistic, TeamMember, ContactInfo, 
  OpeningHours, FAQ, SiteSetting
} from '../lib/supabase';

// Testimonials API
export const getTestimonials = async (category?: string) => {
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('is_featured', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as Testimonial[];
};

export const getFeaturedTestimonials = async (limit = 3) => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);
  
  if (error) throw error;
  return data as Testimonial[];
};

// Activities API
export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data as Activity[];
};

// Events API
export const getEvents = async (status?: string) => {
  let query = supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as Event[];
};

export const getUpcomingEvents = async (limit = 3) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('status', ['À venir', 'Planifié'])
    .order('date', { ascending: true })
    .limit(limit);
  
  if (error) throw error;
  return data as Event[];
};

// Projects API
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data as Project[];
};

// Statistics API
export const getStatistics = async () => {
  const { data, error } = await supabase
    .from('statistics')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) throw error;
  return data as Statistic[];
};

// Team Members API
export const getTeamMembers = async (category?: string) => {
  let query = supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as TeamMember[];
};

// Contact Info API
export const getContactInfo = async (type?: string) => {
  let query = supabase
    .from('contact_info')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as ContactInfo[];
};

// Opening Hours API
export const getOpeningHours = async () => {
  const { data, error } = await supabase
    .from('opening_hours')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) throw error;
  return data as OpeningHours[];
};

// FAQ API
export const getFAQs = async (category?: string) => {
  let query = supabase
    .from('faq')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as FAQ[];
};

export const getFeaturedFAQs = async (limit = 4) => {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true })
    .limit(limit);
  
  if (error) throw error;
  return data as FAQ[];
};

// Site Settings API
export const getSiteSettings = async (category?: string) => {
  let query = supabase
    .from('site_settings')
    .select('*');
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  
  // Convert to key-value map for easier usage
  const settings: Record<string, string> = {};
  (data as SiteSetting[]).forEach(setting => {
    settings[setting.key] = setting.value;
  });
  
  return settings;
};

// Form submissions
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { data, error } = await supabase.functions.invoke('form-submit', {
    body: {
      formType: 'contact',
      data: formData
    }
  });

  if (error) throw error;
  return data;
};

export const submitPrayerCommitment = async (formData: {
  name: string;
  email: string;
  frequency: string;
  preferred_topics: string[];
  receive_updates: boolean;
}) => {
  const { data, error } = await supabase.functions.invoke('form-submit', {
    body: {
      formType: 'prayer',
      data: formData
    }
  });

  if (error) throw error;
  return data;
};

export const submitVolunteerCommitment = async (formData: {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  availability: string;
  message?: string;
}) => {
  const { data, error } = await supabase.functions.invoke('form-submit', {
    body: {
      formType: 'volunteer',
      data: formData
    }
  });

  if (error) throw error;
  return data;
};

export const submitResourceContribution = async (formData: {
  name: string;
  email: string;
  phone?: string;
  resource_type: string;
  description: string;
  estimated_value?: number;
  is_recurring: boolean;
  recurring_frequency?: string;
  message?: string;
}) => {
  const { data, error } = await supabase.functions.invoke('form-submit', {
    body: {
      formType: 'resource',
      data: formData
    }
  });

  if (error) throw error;
  return data;
};

export const getPrayerTopics = async () => {
  const { data, error } = await supabase
    .from('prayer_topics')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data;
};

export const getVolunteerSkills = async () => {
  const { data, error } = await supabase
    .from('volunteer_skills')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data;
};

export const getResourceTypes = async () => {
  const { data, error } = await supabase
    .from('resource_types')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data;
};
