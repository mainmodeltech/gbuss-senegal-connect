
-- This table will be used with Supabase Auth
-- Add custom fields to auth.users via the profiles table
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) policies
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view all profiles" 
  ON admin_profiles FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profiles" 
  ON admin_profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create roles for admin users
CREATE TABLE admin_roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert basic roles
INSERT INTO admin_roles (name, description, permissions)
VALUES 
  ('admin', 'Full access to all admin functionalities', '{"all": true}'::jsonb),
  ('editor', 'Can edit content but cannot manage users or settings', '{"content": true, "users": false, "settings": false}'::jsonb),
  ('viewer', 'Read-only access to admin panel', '{"read": true, "write": false}'::jsonb);
