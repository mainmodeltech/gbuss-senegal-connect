
CREATE TABLE volunteer_commitments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT[], -- Array of skills they can offer
  availability TEXT, -- 'weekends', 'evenings', 'flexible', etc.
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteer skills table (for checkbox options)
CREATE TABLE volunteer_skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'technical', 'teaching', 'administrative', etc.
  is_active BOOLEAN DEFAULT true
);

-- Insert initial volunteer skills
INSERT INTO volunteer_skills (name, description, category) 
VALUES
  ('Enseignement biblique', 'Animer des études bibliques ou formations', 'teaching'),
  ('Design graphique', 'Créer des visuels pour les événements et la communication', 'technical'),
  ('Développement web', 'Aider à maintenir et améliorer le site web', 'technical'),
  ('Administration', 'Soutenir dans les tâches administratives', 'administrative'),
  ('Musique', 'Participer à l''animation des temps de louange', 'worship'),
  ('Photographie', 'Documenter les événements et activités', 'media'),
  ('Accompagnement spirituel', 'Être disponible pour écouter et conseiller les étudiants', 'mentoring'),
  ('Logistique', 'Aider à l''organisation d''événements', 'event');
