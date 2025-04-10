
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  image_url TEXT,
  goals TEXT,
  progress INTEGER, -- percentage of completion
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial projects data
INSERT INTO projects (title, description, status, progress)
VALUES 
  ('Bibliothèques Mobiles', 'Mise en place de bibliothèques chrétiennes itinérantes dans les campus et établissements scolaires.', 'En cours', 65),
  ('Bourses d''Études', 'Programme de bourses pour les étudiants chrétiens méritants en difficulté financière.', 'En développement', 30),
  ('Publication de Ressources', 'Création et distribution de ressources bibliques adaptées au contexte sénégalais.', 'En cours', 50),
  ('Conférences Interreligieuses', 'Organisation de dialogues respectueux entre étudiants de différentes confessions.', 'Périodique', 100);
