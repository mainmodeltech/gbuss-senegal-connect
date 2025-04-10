
CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- 'address', 'email', 'phone', 'social'
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT, -- Lucide icon name
  link TEXT, -- URL or mailto: or tel:
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial contact information data
INSERT INTO contact_info (type, title, value, icon, link, order_index)
VALUES 
  ('address', 'Adresse', 'Bureau National du GBUSS, Dakar, Sénégal', 'MapPin', null, 1),
  ('email', 'Email', 'contact@gbuss.org', 'Mail', 'mailto:contact@gbuss.org', 2),
  ('email', 'Email', 'info@gbuss.org', 'Mail', 'mailto:info@gbuss.org', 3),
  ('phone', 'Téléphone', '+221 33 XXX XX XX', 'Phone', 'tel:+22133XXXXXX', 4),
  ('phone', 'Téléphone', '+221 77 XXX XX XX', 'Phone', 'tel:+22177XXXXXX', 5),
  ('social', 'Facebook', 'GBUSS Sénégal', 'Facebook', '#', 6),
  ('social', 'Twitter', '@GBUSSSenegal', 'Twitter', '#', 7),
  ('social', 'Instagram', '@gbuss_senegal', 'Instagram', '#', 8);
