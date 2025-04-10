
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Lucide icon name
  icon_color TEXT DEFAULT 'text-gbuss-green',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial activities data
INSERT INTO activities (title, description, icon)
VALUES 
  ('Études Bibliques', 'Réunions hebdomadaires d''étude de la Bible dans différents campus et établissements scolaires.', 'BookOpen'),
  ('Groupes de Prière', 'Temps de prière réguliers pour les étudiants, l''université et la nation.', 'Users'),
  ('Formations', 'Ateliers et séminaires pour équiper les étudiants à vivre et partager leur foi.', 'GraduationCap'),
  ('Mentorat', 'Accompagnement individuel pour la croissance spirituelle et le développement personnel.', 'HeartHandshake');
