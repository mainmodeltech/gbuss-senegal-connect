
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL, -- 'general', 'homepage', 'contact', etc.
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  data_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'boolean', 'number', 'json', 'image'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category, key)
);

-- Insert initial site settings
INSERT INTO site_settings (category, key, value, data_type, description)
VALUES 
  ('general', 'site_title', 'GBUSS - Groupe Biblique Universitaire et Scolaire du Sénégal', 'text', 'Title displayed in browser tab'),
  ('general', 'meta_description', 'Le GBUSS est un mouvement chrétien qui œuvre dans l''environnement académique pour partager l''Évangile et accompagner les étudiants dans leur foi.', 'text', 'Meta description for SEO'),
  ('homepage', 'hero_title', 'Groupe Biblique Universitaire et Scolaire du Sénégal', 'text', 'Main title on homepage hero section'),
  ('homepage', 'hero_subtitle', 'Ensemble pour témoigner de Jésus-Christ dans l''environnement académique', 'text', 'Subtitle on homepage hero section'),
  ('homepage', 'about_title', 'Qui sommes-nous?', 'text', 'Title for the about section'),
  ('homepage', 'about_description', 'Le Groupe Biblique Universitaire et Scolaire du Sénégal est un mouvement chrétien qui œuvre dans l''environnement académique pour partager l''Évangile et accompagner les étudiants dans leur foi.', 'text', 'Description for the about section'),
  ('contact', 'form_success_message', 'Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures ouvrables.', 'text', 'Success message shown after contact form submission'),
  ('donations', 'bank_details', '{"bank_name": "Banque Nationale du Sénégal", "account_name": "GBUSS", "account_number": "0123456789"}', 'json', 'Bank details for wire transfers');
