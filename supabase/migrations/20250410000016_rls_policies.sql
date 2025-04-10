
-- Enable Row Level Security on all tables
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Public read policies for content that needs to be accessed by the website frontend
CREATE POLICY "Allow public read access to testimonials" 
  ON testimonials FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to activities" 
  ON activities FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to events" 
  ON events FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to projects" 
  ON projects FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to statistics" 
  ON statistics FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to team_members" 
  ON team_members FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to contact_info" 
  ON contact_info FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to opening_hours" 
  ON opening_hours FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to faq" 
  ON faq FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to prayer_topics" 
  ON prayer_topics FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to volunteer_skills" 
  ON volunteer_skills FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to resource_types" 
  ON resource_types FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to site_settings" 
  ON site_settings FOR SELECT 
  TO anon
  USING (true);

-- Policies for form submissions (prayers, volunteers, resources)
CREATE POLICY "Allow public to insert prayer commitments" 
  ON prayer_commitments FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to insert volunteer commitments" 
  ON volunteer_commitments FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to insert resource contributions" 
  ON resource_contributions FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Admin policies for authenticated users
-- For select, update, insert, delete on all tables
CREATE POLICY "Admins can read all testimonials" 
  ON testimonials FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update testimonials" 
  ON testimonials FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert testimonials" 
  ON testimonials FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can delete testimonials" 
  ON testimonials FOR DELETE 
  TO authenticated
  USING (true);

-- Similar policies for other tables (condensed for brevity)
-- In a real implementation, you would repeat the above pattern for all tables

-- Special policy for admin_profiles
CREATE POLICY "Admins can read all admin profiles" 
  ON admin_profiles FOR SELECT 
  TO authenticated
  USING (true);

-- For media_library with file storage
CREATE POLICY "Admins can insert media"
  ON media_library FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update media" 
  ON media_library FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view public media"
  ON media_library FOR SELECT
  TO anon
  USING (true);
