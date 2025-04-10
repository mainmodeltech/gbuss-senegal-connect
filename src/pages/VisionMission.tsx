
import { Book, Flag, HandHeart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VisionMission = () => {
  return (
    <Layout>
      <PageHeader
        title="Vision & Mission"
        subtitle="Notre fondement et notre direction"
        background="bg-gradient-to-r from-gbuss-blue to-gbuss-purple"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Notre Fondement</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                Le GBUSS est un mouvement chrétien qui rassemble des élèves et étudiants autour de la Parole de Dieu. 
                Enraciné dans les valeurs bibliques, nous œuvrons pour faire connaître l'Évangile dans l'environnement académique.
              </p>
              <p>
                Notre travail est guidé par la conviction que la Parole de Dieu est pertinente pour la vie de 
                chaque étudiant et peut transformer profondément nos communautés académiques.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ValueCard 
              title="Notre Vision" 
              description="Voir des disciples de Jésus-Christ transformés par l'Évangile dans l'environnement académique, impactant positivement le Sénégal et au-delà."
              icon={<Book className="h-8 w-8 text-gbuss-blue" />}
            />
            <ValueCard 
              title="Notre Mission" 
              description="Faire des disciples de Jésus-Christ dans l'environnement académique à travers l'étude biblique, la prière et le témoignage."
              icon={<HandHeart className="h-8 w-8 text-gbuss-purple" />}
            />
            <ValueCard 
              title="Nos Valeurs" 
              description="Fidélité à la Parole de Dieu, vie de prière, témoignage courageux, service désintéressé et communion fraternelle."
              icon={<Flag className="h-8 w-8 text-gbuss-red" />}
            />
          </div>

          {/* Biblical Foundation */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Notre Base Biblique</h2>
            <div className="bg-gbuss-light p-6 rounded-lg border-l-4 border-gbuss-purple mb-8">
              <p className="italic text-lg mb-4">
                "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit, 
                et enseignez-leur à observer tout ce que je vous ai prescrit."
              </p>
              <p className="text-right font-medium">Matthieu 28:19-20</p>
            </div>
            <div className="prose prose-lg mx-auto">
              <p>
                Notre mouvement se base sur la Grande Commission de Jésus-Christ. Nous croyons que chaque étudiant 
                et élève est appelé à être disciple et à faire des disciples là où il se trouve.
              </p>
              <p>
                Par l'étude de la Bible, nous cherchons à comprendre et appliquer les enseignements de Jésus-Christ 
                dans notre vie quotidienne et dans nos institutions académiques.
              </p>
              <p>
                Le GBUSS fait partie de la famille mondiale de l'IFES (International Fellowship of Evangelical Students), 
                présente dans plus de 170 pays, œuvrant pour l'évangélisation et la formation des étudiants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Value Card Component
const ValueCard = ({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-all border-t-4 border-t-gbuss-blue">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default VisionMission;
