import { createClient } from '@supabase/supabase-js';

// These values should be replaced with environment variables in a production environment
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: {
    desktop: string;
    mobile: string;
  };
  featured: boolean;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  mockup_url: string;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  created_at: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
};

export type Subscriber = {
  id: number;
  email: string;
  created_at: string;
};

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
};

export const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
};

export const submitInquiry = async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<boolean> => {
  const { error } = await supabase
    .from('inquiries')
    .insert([{ ...inquiry, status: 'new' }]);

  if (error) {
    console.error('Error submitting inquiry:', error);
    return false;
  }

  return true;
};

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  const { error } = await supabase
    .from('newsletter')
    .insert([{ email }]);

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    return false;
  }

  return true;
};