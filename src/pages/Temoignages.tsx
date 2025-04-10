
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/api";
import type { Testimonial } from "@/lib/supabase";

const Temoignages = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  
  // Fetch testimonials from the database
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => getTestimonials()
  });

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

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-gbuss-blue" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Impossible de charger les témoignages. Veuillez réessayer plus tard.</p>
            </div>
          ) : (
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
                  {testimonials?.map(testimonial => (
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
                    ?.filter(testimonial => testimonial.category === "students")
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
                    ?.filter(testimonial => testimonial.category === "alumni")
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
                    ?.filter(testimonial => testimonial.category === "partners")
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
          )}

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
  testimonial: Testimonial;
  onClick: () => void;
  isExpanded: boolean;
  onClose: () => void;
}

const TestimonialCard = ({ testimonial, onClick, isExpanded, onClose }: TestimonialCardProps) => {
  const { name, role, quote, image_url } = testimonial;

  return (
    <Card 
      className={`h-full transition-all hover:shadow-md cursor-pointer ${isExpanded ? 'fixed inset-0 z-50 max-w-3xl mx-auto my-auto h-auto max-h-[90vh] overflow-y-auto' : ''}`}
      onClick={isExpanded ? undefined : onClick}
    >
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gbuss-blue/10 flex items-center justify-center">
          {image_url ? (
            <img src={image_url} alt={name} className="h-full w-full object-cover" />
          ) : (
            <Quote className="h-6 w-6 text-gbuss-blue" />
          )}
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
