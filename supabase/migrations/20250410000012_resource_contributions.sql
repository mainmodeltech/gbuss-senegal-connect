
CREATE TABLE resource_contributions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resource_type TEXT NOT NULL, -- 'financial', 'material', 'accommodation', etc.
  description TEXT NOT NULL,
  estimated_value DECIMAL(10, 2),
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT, -- 'monthly', 'quarterly', 'yearly', etc.
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resource types table (for dropdown options)
CREATE TABLE resource_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  examples TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Insert initial resource types
INSERT INTO resource_types (name, description, examples) 
VALUES
  ('Don financier', 'Contribution financière pour soutenir le ministère', 'Dons ponctuels ou réguliers'),
  ('Matériel', 'Équipements ou matériaux utiles aux activités', 'Ordinateurs, projecteurs, matériel sonore, fournitures'),
  ('Espace', 'Mise à disposition de locaux pour rencontres', 'Salles de réunion, espaces pour conférences'),
  ('Hébergement', 'Logement pour invités ou événements', 'Logement d''intervenants, lieux pour camps bibliques'),
  ('Transport', 'Moyens de transport pour activités', 'Véhicules pour déplacements, carburant'),
  ('Restauration', 'Nourriture pour événements', 'Repas pour conférences ou rencontres'),
  ('Expertise', 'Conseils professionnels', 'Consultation juridique, comptable, stratégique');
