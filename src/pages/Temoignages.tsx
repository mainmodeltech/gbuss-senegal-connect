
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Amadou Diallo",
    role: "Étudiant en Informatique",
    category: "students",
    quote: "Le GBUSS m'a offert un espace sécurisé pour étudier la Bible et poser des questions difficiles sur ma foi. J'ai grandi spirituellement et fait des amitiés qui durent toute la vie.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Fatou Ndoye",
    role: "Étudiante en Médecine",
    category: "students",
    quote: "Quand je suis arrivée à l'université, j'étais inquiète de perdre ma foi dans un nouvel environnement. Le GBUSS m'a aidée à l'approfondir et à la vivre avec conviction.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Jean-Paul Mendy",
    role: "Lycéen",
    category: "students",
    quote: "Les études bibliques au lycée m'ont aidé à comprendre comment vivre ma foi chrétienne dans un contexte scolaire. J'ai appris à témoigner avec respect auprès de mes camarades.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Marie Seck",
    role: "Ancienne étudiante, maintenant enseignante",
    category: "alumni",
    quote: "Des années après mon passage au GBUSS, j'applique encore les principes bibliques que j'y ai appris. Le mouvement a posé des fondements solides pour ma vie chrétienne.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Ibrahima Ndiaye",
    role: "Ancien responsable, maintenant pasteur",
    category: "alumni",
    quote: "Mon engagement au sein du GBUSS a été une étape fondamentale dans ma vocation pastorale. J'y ai développé des compétences en leadership et en enseignement biblique.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Aïssatou Diop",
    role: "Ancienne étudiante, professionnelle en entreprise",
    category: "alumni",
    quote: "Le GBUSS m'a appris à intégrer ma foi dans tous les aspects de ma vie. Aujourd'hui, dans mon milieu professionnel, je peux témoigner de Christ avec intégrité et sagesse.",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Église Évangélique de Dakar",
    role: "Partenaire ecclésiastique",
    category: "partners",
    quote: "Notre partenariat avec le GBUSS nous permet de toucher efficacement la jeunesse académique. Nous voyons un réel impact spirituel chez les jeunes qui rejoignent ensuite notre assemblée.",
    image: "/placeholder.svg"
  },
  {
    id: 8,
    name: "IFES Afrique Francophone",
    role: "Organisation partenaire",
    category: "partners",
    quote: "Le GBUSS est l'un des mouvements les plus dynamiques de notre réseau en Afrique francophone. Leur engagement pour l'évangélisation des campus et la formation de disciples est exemplaire.",
    image: "/placeholder.svg"
  }
];

const Temoignages = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);

  return (
    <Layout>
      <PageHeader
        title="Témoignages"
        subtitle="Des vies transformées par l'Évangile dans l'environnement académique"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6">Ils partagent leur expérience</h2>
            <p className="text-lg text-gray-600">
              Découvrez comment Dieu a œuvré dans la vie des étudiants, anciens membres et partenaires du GBUSS.
            </p>
          </div>

          <Tabs defaultValue="all" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all" className="px-6">Tous</TabsTrigger>
                <TabsTrigger value="students" className="px-6">Étudiants actuels</TabsTrigger>
                <TabsTrigger value="alumni" className="px-6">Anciens membres</TabsTrigger>
                <TabsTrigger value="partners" className="px-6">Partenaires</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial}
                    onClick={() => setActiveTestimonial(testimonial.id)}
                    isExpanded={activeTestimonial === testimonial.id}
                    onClose={() => setActiveTestimonial(null)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials
                  .filter(testimonial => testimonial.category === "students")
                  .map(testimonial => (
                    <TestimonialCard 
                      key={testimonial.id} 
                      testimonial={testimonial}
                      onClick={() => setActiveTestimonial(testimonial.id)}
                      isExpanded={activeTestimonial === testimonial.id}
                      onClose={() => setActiveTestimonial(null)}
                    />
                  ))
                }
              </div>
            </TabsContent>

            <TabsContent value="alumni">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials
                  .filter(testimonial => testimonial.category === "alumni")
                  .map(testimonial => (
                    <TestimonialCard 
                      key={testimonial.id} 
                      testimonial={testimonial}
                      onClick={() => setActiveTestimonial(testimonial.id)}
                      isExpanded={activeTestimonial === testimonial.id}
                      onClose={() => setActiveTestimonial(null)}
                    />
                  ))
                }
              </div>
            </TabsContent>

            <TabsContent value="partners">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials
                  .filter(testimonial => testimonial.category === "partners")
                  .map(testimonial => (
                    <TestimonialCard 
                      key={testimonial.id} 
                      testimonial={testimonial}
                      onClick={() => setActiveTestimonial(testimonial.id)}
                      isExpanded={activeTestimonial === testimonial.id}
                      onClose={() => setActiveTestimonial(null)}
                    />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Testimonial CTA */}
          <div className="mt-16 text-center max-w-2xl mx-auto bg-gbuss-light p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gbuss-blue mb-4">Partagez votre témoignage</h3>
            <p className="text-gray-600 mb-6">
              Avez-vous été impacté par le ministère du GBUSS ? Nous aimerions entendre votre histoire !
            </p>
            <Button className="bg-gbuss-green hover:bg-gbuss-green/90">
              Soumettre mon témoignage
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string;
  };
  onClick: () => void;
  isExpanded: boolean;
  onClose: () => void;
}

const TestimonialCard = ({ testimonial, onClick, isExpanded, onClose }: TestimonialCardProps) => {
  const { name, role, quote, image } = testimonial;

  return (
    <Card 
      className={`h-full transition-all hover:shadow-md cursor-pointer ${isExpanded ? 'fixed inset-0 z-50 max-w-3xl mx-auto my-auto h-auto max-h-[90vh] overflow-y-auto' : ''}`}
      onClick={isExpanded ? undefined : onClick}
    >
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gbuss-blue/10 flex items-center justify-center">
          <Quote className="h-6 w-6 text-gbuss-blue" />
        </div>
        <div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p className="text-gray-700">
            {isExpanded ? quote : quote.length > 150 ? `${quote.substring(0, 150)}...` : quote}
          </p>
          {quote.length > 150 && !isExpanded && (
            <span className="text-gbuss-green cursor-pointer font-medium">Lire plus</span>
          )}
        </div>
        {isExpanded && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              Fermer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Temoignages;
