
CREATE TABLE faq (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial FAQ data
INSERT INTO faq (question, answer, is_featured, order_index)
VALUES 
  ('Comment puis-je rejoindre un groupe GBUSS dans mon université?', 'Contactez-nous par email ou téléphone, et nous vous mettrons en relation avec le coordinateur local de votre campus. Vous pouvez également nous indiquer votre institution dans le formulaire de contact.', true, 1),
  ('Proposez-vous des formations pour les responsables d''église?', 'Oui, nous organisons régulièrement des formations pour les responsables d''église qui souhaitent développer un ministère auprès des jeunes et des étudiants. Contactez-nous pour connaître les prochaines dates.', true, 2),
  ('Comment mon église peut-elle collaborer avec le GBUSS?', 'Nous sommes ouverts à différentes formes de partenariat avec les églises locales. Cela peut inclure l''organisation d''événements conjoints, le partage de ressources, ou l''envoi de volontaires. Contactez-nous pour discuter des possibilités.', true, 3),
  ('Puis-je inviter un représentant du GBUSS à intervenir dans mon église ou mon groupe?', 'Absolument! Nos staffs sont disponibles pour partager sur le ministère auprès des étudiants et pour former ou encourager vos jeunes. Utilisez le formulaire de contact en précisant vos besoins.', true, 4);
