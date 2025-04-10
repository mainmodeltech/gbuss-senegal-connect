
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  category TEXT NOT NULL, -- 'students', 'alumni', 'partners'
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial testimonial data
INSERT INTO testimonials (name, role, category, quote, is_featured)
VALUES 
  ('Amadou Diallo', 'Étudiant en Informatique', 'students', 'Le GBUSS m''a offert un espace sécurisé pour étudier la Bible et poser des questions difficiles sur ma foi. J''ai grandi spirituellement et fait des amitiés qui durent toute la vie.', true),
  ('Fatou Ndoye', 'Étudiante en Médecine', 'students', 'Quand je suis arrivée à l''université, j''étais inquiète de perdre ma foi dans un nouvel environnement. Le GBUSS m''a aidée à l''approfondir et à la vivre avec conviction.', true),
  ('Jean-Paul Mendy', 'Lycéen', 'students', 'Les études bibliques au lycée m''ont aidé à comprendre comment vivre ma foi chrétienne dans un contexte scolaire. J''ai appris à témoigner avec respect auprès de mes camarades.', false),
  ('Marie Seck', 'Ancienne étudiante, maintenant enseignante', 'alumni', 'Des années après mon passage au GBUSS, j''applique encore les principes bibliques que j''y ai appris. Le mouvement a posé des fondements solides pour ma vie chrétienne.', true),
  ('Ibrahima Ndiaye', 'Ancien responsable, maintenant pasteur', 'alumni', 'Mon engagement au sein du GBUSS a été une étape fondamentale dans ma vocation pastorale. J''y ai développé des compétences en leadership et en enseignement biblique.', false),
  ('Aïssatou Diop', 'Ancienne étudiante, professionnelle en entreprise', 'alumni', 'Le GBUSS m''a appris à intégrer ma foi dans tous les aspects de ma vie. Aujourd''hui, dans mon milieu professionnel, je peux témoigner de Christ avec intégrité et sagesse.', false),
  ('Église Évangélique de Dakar', 'Partenaire ecclésiastique', 'partners', 'Notre partenariat avec le GBUSS nous permet de toucher efficacement la jeunesse académique. Nous voyons un réel impact spirituel chez les jeunes qui rejoignent ensuite notre assemblée.', true),
  ('IFES Afrique Francophone', 'Organisation partenaire', 'partners', 'Le GBUSS est l''un des mouvements les plus dynamiques de notre réseau en Afrique francophone. Leur engagement pour l''évangélisation des campus et la formation de disciples est exemplaire.', false);
