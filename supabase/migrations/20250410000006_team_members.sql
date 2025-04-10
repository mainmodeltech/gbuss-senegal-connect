
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  category TEXT NOT NULL, -- 'national', 'regional', 'board'
  organization TEXT,
  email TEXT,
  phone TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial team members data
INSERT INTO team_members (name, role, bio, category, email, phone, facebook_url, twitter_url, order_index)
VALUES 
  ('Pasteur Amadou Sarr', 'Secrétaire Général', 'Pasteur Amadou dirige le GBUSS depuis 8 ans avec passion et dévouement. Son cœur pour les étudiants et sa vision claire ont permis une croissance significative du mouvement.', 'national', 'amadou.sarr@gbuss.org', '+221 78 xxx xx xx', '#', '#', 1),
  ('Mme Fatou Diop', 'Responsable Formation', 'Fatou coordonne les programmes de formation biblique et le développement du leadership au sein du GBUSS. Elle est passionnée par l''équipement des jeunes leaders.', 'national', 'fatou.diop@gbuss.org', '+221 77 xxx xx xx', '#', null, 2),
  ('M. Jean Mendy', 'Responsable Évangélisation', 'Jean supervise les initiatives d''évangélisation sur les campus. Son expertise en apologétique chrétienne est une ressource précieuse pour le mouvement.', 'national', 'jean.mendy@gbuss.org', '+221 76 xxx xx xx', null, '#', 3),
  ('Mme Marie Ndiaye', 'Trésorière', 'Marie gère les finances du GBUSS avec intégrité et sagesse. Elle est également impliquée dans la recherche de partenariats stratégiques.', 'national', 'marie.ndiaye@gbuss.org', '+221 75 xxx xx xx', null, null, 4),
  ('Ibrahim Sow', 'Coordination Dakar', null, 'regional', null, null, null, null, 1),
  ('Assane Diallo', 'Coordination Saint-Louis', null, 'regional', null, null, null, null, 2),
  ('Charlotte Faye', 'Coordination Thiès', null, 'regional', null, null, null, null, 3),
  ('Ousmane Mbaye', 'Coordination Ziguinchor', null, 'regional', null, null, null, null, 4),
  ('Mariama Cissé', 'Coordination Kaolack', null, 'regional', null, null, null, null, 5),
  ('Demba Fall', 'Coordination Lycées Dakar', null, 'regional', null, null, null, null, 6),
  ('Dr. Samuel Diouf', 'Président du Conseil', null, 'board', null, null, null, null, 1),
  ('Pasteur Pierre Gomis', 'Vice-président', null, 'board', null, null, null, null, 2),
  ('Mme Aïda Niang', 'Secrétaire', null, 'board', null, null, null, null, 3),
  ('M. Paul Sène', 'Membre', null, 'board', null, null, null, null, 4);
