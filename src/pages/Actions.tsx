import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, GraduationCap, Users, BookOpen, HeartHandshake, Loader2 } from "lucide-react";
import { getActivities, getEvents, getProjects, getStatistics } from "@/services/api";
import type { Activity, Event, Project, Statistic } from "@/lib/supabase";

// Icon mapping for activities
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  HeartHandshake: <HeartHandshake className="h-6 w-6" />,
};

const Actions = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesData, eventsData, projectsData, statsData] = await Promise.all([
          getActivities(),
          getEvents(),
          getProjects(),
          getStatistics()
        ]);
        setActivities(activitiesData || []);
        setEvents(eventsData || []);
        setProjects(projectsData || []);
        setStatistics(statsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Nos Actions"
          subtitle="Découvrez les activités et projets du GBUSS"
        />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-gbuss-blue" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Nos Actions"
        subtitle="Découvrez les activités et projets du GBUSS"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Nos Programmes</h2>
            <p className="text-lg text-center text-gray-600">
              Le GBUSS propose diverses activités et programmes pour accompagner les étudiants et élèves dans leur cheminement spirituel,
              et pour témoigner de l'Évangile dans l'environnement académique.
            </p>
          </div>

          <Tabs defaultValue="activities" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="activities" className="text-base px-6 py-3">Activités régulières</TabsTrigger>
                <TabsTrigger value="events" className="text-base px-6 py-3">Événements</TabsTrigger>
                <TabsTrigger value="projects" className="text-base px-6 py-3">Projets</TabsTrigger>
              </TabsList>
            </div>

            {/* Regular Activities */}
            <TabsContent value="activities" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <ActivityCard 
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      icon={iconMap[activity.icon] || <BookOpen className="h-6 w-6" />}
                    />
                  ))
                ) : (
                  <p className="col-span-2 text-center text-gray-500">Aucune activité disponible pour le moment.</p>
                )}
              </div>
            </TabsContent>

            {/* Events */}
            <TabsContent value="events" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventCard 
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      date={new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      status={event.status}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">Aucun événement disponible pour le moment.</p>
                )}
              </div>
            </TabsContent>

            {/* Projects */}
            <TabsContent value="projects" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard 
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      status={project.status}
                    />
                  ))
                ) : (
                  <p className="col-span-2 text-center text-gray-500">Aucun projet disponible pour le moment.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gbuss-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gbuss-blue mb-12 text-center">Notre Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {statistics.length > 0 ? (
              statistics.map((stat) => (
                <ImpactStat key={stat.id} number={stat.value} description={stat.title} />
              ))
            ) : (
              <>
                <ImpactStat number="25+" description="Années d'existence au Sénégal" />
                <ImpactStat number="15+" description="Campus et écoles touchés" />
                <ImpactStat number="500+" description="Étudiants impliqués chaque année" />
                <ImpactStat number="1000+" description="Vies transformées par l'Évangile" />
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Activity Card Component
const ActivityCard = ({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start space-y-0 gap-4">
        <div className="bg-gbuss-green/10 p-2 rounded-md text-gbuss-green">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl mb-1">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

// Event Card Component
const EventCard = ({ title, description, date, status }: { 
  title: string; 
  description: string; 
  date: string;
  status: "À venir" | "Passé" | "En cours" | "Planifié" | "Récurrent";
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "À venir": return "bg-yellow-100 text-yellow-800";
      case "Passé": return "bg-gray-100 text-gray-800";
      case "En cours": return "bg-green-100 text-green-800";
      case "Planifié": return "bg-blue-100 text-blue-800";
      case "Récurrent": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarDays className="h-4 w-4 mr-2" />
          {date}
        </div>
      </CardFooter>
    </Card>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, status }: { 
  title: string; 
  description: string; 
  status: string;
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-gbuss-green/10 text-gbuss-green">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// Impact Stat Component
const ImpactStat = ({ number, description }: { 
  number: string; 
  description: string;
}) => {
  return (
    <div className="text-center p-6">
      <p className="text-4xl md:text-5xl font-bold text-gbuss-green mb-2">{number}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Actions;
