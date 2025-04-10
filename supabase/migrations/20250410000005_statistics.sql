
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  value TEXT NOT NULL, -- Using text to allow for formatted numbers like "25+"
  description TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial statistics data
INSERT INTO statistics (title, value, description, order_index)
VALUES 
  ('Années d''existence', '25+', 'Années d''existence au Sénégal', 1),
  ('Campus', '15+', 'Campus et écoles touchés', 2),
  ('Étudiants', '500+', 'Étudiants impliqués chaque année', 3),
  ('Impact', '1000+', 'Vies transformées par l''Évangile', 4);
