
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL, -- Date or month or season
  status TEXT NOT NULL, -- 'À venir', 'Passé', 'En cours', 'Planifié', 'Récurrent'
  image_url TEXT,
  location TEXT,
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial events data
INSERT INTO events (title, description, date, status)
VALUES 
  ('Camp Biblique Annuel', 'Un temps de retraite intensive autour de la Parole de Dieu, avec enseignements, prières et communion fraternelle.', 'Août 2023', 'Passé'),
  ('Conférence Nationale', 'Rencontre annuelle rassemblant les membres du GBUSS de tout le Sénégal pour un temps d''édification et de vision.', 'Décembre 2023', 'À venir'),
  ('Journée Missionnaire', 'Journée dédiée à l''évangélisation sur les campus universitaires et dans les lycées.', 'Mars 2024', 'Planifié'),
  ('Forum des Questions', 'Débats ouverts sur des questions existentielles et spirituelles avec les étudiants.', 'Trimestriel', 'Récurrent'),
  ('Weekend de Formation des Responsables', 'Session intensive pour équiper les leaders des groupes GBUSS.', 'Avril 2024', 'Planifié'),
  ('Semaine de la Bible', 'Une semaine dédiée à la promotion de la Bible et de sa lecture dans les institutions académiques.', 'Novembre 2023', 'À venir');
