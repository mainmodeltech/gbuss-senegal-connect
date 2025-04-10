
CREATE TABLE opening_hours (
  id SERIAL PRIMARY KEY,
  days TEXT NOT NULL, -- e.g., 'Lundi - Vendredi'
  hours TEXT NOT NULL, -- e.g., '9h00 - 17h00'
  is_closed BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial opening hours data
INSERT INTO opening_hours (days, hours, is_closed, order_index)
VALUES 
  ('Lundi - Vendredi', '9h00 - 17h00', false, 1),
  ('Samedi - Dimanche', 'Fermé', true, 2);
