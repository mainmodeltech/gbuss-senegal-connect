
CREATE TABLE prayer_commitments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  frequency TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'
  preferred_topics TEXT[], -- Array of prayer topics they want to pray for
  receive_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prayer topics table (for checkbox options)
CREATE TABLE prayer_topics (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Insert initial prayer topics
INSERT INTO prayer_topics (name, description) 
VALUES
  ('Étudiants', 'La croissance spirituelle des étudiants membres du GBUSS'),
  ('Campus', 'L''évangélisation et l''impact chrétien dans les campus'),
  ('Événements', 'Nos camps bibliques et conférences à venir'),
  ('Équipe', 'Les membres du staff et responsables du GBUSS'),
  ('Partenariats', 'Nos relations avec les églises et organisations partenaires'),
  ('Ressources', 'Les besoins financiers et matériels du mouvement');
