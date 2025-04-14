
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book, Flag, HandHeart, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteSettings } from "@/services/api";

const VisionMission = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings', 'vision-mission'],
    queryFn: () => getSiteSettings('vision-mission')
  });

  // Default content in case settings are not available
  const [content, setContent] = useState({
    vision: "Notre vision est de voir des élèves, des étudiants et des amis qui croissent ensemble en tant que\n" +
        "communautés de disciples, transformés par l'Évangile et ayant un impact sur l’université, l'église et la\n" +
        "société pour la gloire de Christ",
    mission: "Encourager les élèves, les étudiants et les amis à croitre ensemble, vivre et témoigner de leur foi\n" +
        "chrétienne au sein de leurs milieux d'études et de travail.",
    values: "Le GBUSS se fonde sur les valeurs d'Intégrité, de service, d'engagement et d'unité",
    foundation1: "Le Groupe Biblique Universitaire et Scolaire du Sénégal (GBUSS) est une organisation chrétienne évangélique qui a pour vocation de proclamer l’Évangile de Jésus-Christ et de contribuer à la transformation spirituelle, morale et intellectuelle des jeunes dans les milieux universitaires et scolaires. ",
    foundation2: "Fondé sur les principes bibliques et inspiré par la mission divine confiée à l’Église, le GBUSS s’engage à former des disciples appelés à impacter positivement leur génération et la société dans son ensemble.",
    biblicalBase1: "Notre mouvement se base sur la Grande Commission de Jésus-Christ. Nous croyons que chaque étudiant et élève est appelé à être disciple et à faire des disciples là où il se trouve.",
    biblicalBase2: "Par l'étude de la Bible, nous cherchons à comprendre et appliquer les enseignements de Jésus-Christ dans notre vie quotidienne et dans nos institutions académiques.",
    biblicalBase3: "Le GBUSS fait partie de la famille mondiale de l'IFES (International Fellowship of Evangelical Students), présente dans plus de 170 pays, œuvrant pour l'évangélisation et la formation des étudiants.",
    bibleVerse: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit, et enseignez-leur à observer tout ce que je vous ai prescrit.",
    bibleReference: "Matthieu 28:19-20"
  });

  // Update content when settings are loaded
  useEffect(() => {
    if (settings) {
      setContent({
        vision: settings.vision || content.vision,
        mission: settings.mission || content.mission,
        values: settings.values || content.values,
        foundation1: settings.foundation1 || content.foundation1,
        foundation2: settings.foundation2 || content.foundation2,
        biblicalBase1: settings.biblicalBase1 || content.biblicalBase1,
        biblicalBase2: settings.biblicalBase2 || content.biblicalBase2,
        biblicalBase3: settings.biblicalBase3 || content.biblicalBase3,
        bibleVerse: settings.bibleVerse || content.bibleVerse,
        bibleReference: settings.bibleReference || content.bibleReference
      });
    }
  }, [settings]);

  return (
    <Layout>
      <PageHeader
        title="Vision & Mission"
        subtitle="Notre fondement et notre direction"
        background="bg-gradient-to-r from-gbuss-blue to-gbuss-purple"
      />

      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-gbuss-blue" />
        </div>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Notre Fondement</h2>
              <div className="prose prose-lg mx-auto">
                <p>{content.foundation1}</p>
                <p>{content.foundation2}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <ValueCard 
                title="Notre Vision" 
                description={content.vision}
                icon={<Book className="h-8 w-8 text-gbuss-blue" />}
              />
              <ValueCard 
                title="Notre Mission" 
                description={content.mission}
                icon={<HandHeart className="h-8 w-8 text-gbuss-purple" />}
              />
              <ValueCard 
                title="Nos Valeurs" 
                description={content.values}
                icon={<Flag className="h-8 w-8 text-gbuss-red" />}
              />
            </div>

            {/* Biblical Foundation */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Notre Base Biblique</h2>
              <div className="bg-gbuss-light p-6 rounded-lg border-l-4 border-gbuss-purple mb-8">
                <p className="italic text-lg mb-4">
                  "{content.bibleVerse}"
                </p>
                <p className="text-right font-medium">{content.bibleReference}</p>
              </div>
              <div className="prose prose-lg mx-auto">
                <p>{content.biblicalBase1}</p>
                <p>{content.biblicalBase2}</p>
                <p>{content.biblicalBase3}</p>
              </div>
            </div>
          </div>
        </section>
      )}
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
