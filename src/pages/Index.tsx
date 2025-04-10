import { Link } from "react-router-dom";
import { ArrowRight, Book, Users, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
const Index = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-hero-pattern bg-cover bg-center">
        {/* Overlay with gradient using logo colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-gbuss-blue/60 to-gbuss-purple/60"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <img src="/logo-gbuss.png" alt="GBUSS Logo" className="h-32 w-auto object-contain animate-fade-in" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up">
            Groupe Biblique Universitaire et Scolaire du Sénégal
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 animate-fade-up animate-delay-100 text-gray-50">
            Ensemble pour témoigner de Jésus-Christ dans l'environnement académique
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up animate-delay-200">
            <Link to="/vision-mission">
              <Button size="lg" className="bg-gbuss-blue hover:bg-gbuss-blue/90 text-white">
                Découvrir notre mission
              </Button>
            </Link>
            <Link to="/faire-un-don">
              <Button size="lg" variant="outline" className="border-white bg-sky-50 text-slate-900">
                Nous soutenir
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gbuss-blue">Qui sommes-nous?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Le Groupe Biblique Universitaire et Scolaire du Sénégal est un mouvement chrétien 
              qui œuvre dans l'environnement académique pour partager l'Évangile et 
              accompagner les étudiants dans leur foi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Notre Vision" description="Voir des disciples de Jésus-Christ transformés par l'Evangile dans l'environnement académique." icon={<Book className="h-10 w-10 text-gbuss-blue" />} link="/vision-mission" />
            <FeatureCard title="Notre Communauté" description="Une fraternité d'étudiants et élèves chrétiens unis par la foi et la prière." icon={<Users className="h-10 w-10 text-gbuss-purple" />} link="/equipe" />
            <FeatureCard title="Nos Événements" description="Des rencontres, formations et camps bibliques pour grandir ensemble dans la foi." icon={<Calendar className="h-10 w-10 text-gbuss-green" />} link="/actions" />
            <FeatureCard title="Nous Soutenir" description="Contribuez à notre mission par vos prières, votre temps ou vos dons." icon={<Heart className="h-10 w-10 text-gbuss-red" />} link="/faire-un-don" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gbuss-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez notre mission</h2>
            <p className="text-lg mb-8">
              Ensemble, nous pouvons faire une différence dans la vie des étudiants et élèves du Sénégal.
              Engagez-vous à nos côtés par la prière ou par un don.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/prier-avec-nous">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                  Prier avec nous
                </Button>
              </Link>
              <Link to="/faire-un-don">
                <Button size="lg" className="bg-gbuss-purple hover:bg-gbuss-purple/90">
                  Faire un don
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gbuss-blue">Témoignages</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des vies transformées par l'Évangile dans l'environnement académique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard quote="Le GBUSS m'a aidé à grandir spirituellement pendant mes études. J'ai trouvé une famille spirituelle loin de chez moi." name="Marie D." role="Étudiante en médecine" />
            <TestimonialCard quote="Les études de la Bible au sein du GBUSS ont révolutionné ma compréhension des Écritures et m'ont aidé à vivre ma foi." name="Thomas S." role="Ancien étudiant" />
            <TestimonialCard quote="Grâce au GBUSS, j'ai appris à partager ma foi avec mes camarades de classe avec confiance et respect." name="Sophie M." role="Lycéenne" />
          </div>

          <div className="text-center mt-12">
            <Link to="/temoignages">
              <Button variant="outline" className="border-gbuss-blue text-gbuss-blue hover:bg-gbuss-blue hover:text-white">
                Voir tous les témoignages 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>;
};

// Feature Card Component
const FeatureCard = ({
  title,
  description,
  icon,
  link
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) => {
  return <Card className="text-center h-full hover:shadow-md transition-all">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gbuss-blue">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <Link to={link} className="text-gbuss-purple font-medium hover:underline inline-flex items-center">
          En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>;
};

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  name,
  role
}: {
  quote: string;
  name: string;
  role: string;
}) => {
  return <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-gbuss-blue text-4xl font-serif mb-4">"</div>
      <p className="italic text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gbuss-gray">{role}</p>
      </div>
    </div>;
};
export default Index;