
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, HeartHandshake, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PrierAvecNous = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      toast({
        title: "Engagement enregistré",
        description: "Merci de vous engager à nos côtés dans la prière.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <Layout>
      <PageHeader
        title="Prier avec Nous"
        subtitle="S'engager pour la mission auprès des étudiants et élèves"
        background="bg-gradient-to-r from-gbuss-blue to-gbuss-blue/80"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {showConfirmation ? (
            <Confirmation setShowConfirmation={setShowConfirmation} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Engagement Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gbuss-blue mb-6">Votre engagement</h2>
                
                <Tabs defaultValue="prayer" className="mb-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="prayer">Prière</TabsTrigger>
                    <TabsTrigger value="volunteer">Bénévolat</TabsTrigger>
                    <TabsTrigger value="resources">Ressources</TabsTrigger>
                  </TabsList>

                  {/* Prayer Tab */}
                  <TabsContent value="prayer">
                    <Card>
                      <CardHeader>
                        <CardTitle>Engagement de prière</CardTitle>
                        <CardDescription>
                          Rejoignez notre réseau de prière pour soutenir le ministère parmi les étudiants et élèves.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="name">Nom complet</Label>
                                <Input id="name" required className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" required className="mt-1" />
                              </div>
                            </div>

                            <div>
                              <Label>Je m'engage à prier</Label>
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="daily" />
                                  <Label htmlFor="daily" className="font-normal">Quotidiennement</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="weekly" />
                                  <Label htmlFor="weekly" className="font-normal">Hebdomadairement</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="monthly" />
                                  <Label htmlFor="monthly" className="font-normal">Mensuellement</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="specific-time" />
                                  <Label htmlFor="specific-time" className="font-normal">À des occasions spécifiques</Label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="prayer-topics">Sujets de prière particuliers</Label>
                              <Textarea 
                                id="prayer-topics" 
                                placeholder="Y a-t-il des aspects spécifiques du ministère pour lesquels vous souhaitez prier?"
                                className="mt-1"
                                rows={4}
                              />
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox id="prayer-letter" />
                              <div className="grid gap-1.5">
                                <Label htmlFor="prayer-letter" className="font-normal">
                                  Je souhaite recevoir la lettre mensuelle de prière du GBUSS
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Vous recevrez des sujets de prière spécifiques et des témoignages de réponses à la prière.
                                </p>
                              </div>
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gbuss-blue hover:bg-gbuss-blue/90"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Traitement en cours..." : "S'engager à prier"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Volunteer Tab */}
                  <TabsContent value="volunteer">
                    <Card>
                      <CardHeader>
                        <CardTitle>Engagement bénévole</CardTitle>
                        <CardDescription>
                          Contribuez de votre temps et de vos compétences pour soutenir le ministère du GBUSS.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="vol-name">Nom complet</Label>
                                <Input id="vol-name" required className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="vol-email">Email</Label>
                                <Input id="vol-email" type="email" required className="mt-1" />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="vol-phone">Téléphone</Label>
                              <Input id="vol-phone" required className="mt-1" />
                            </div>

                            <div>
                              <Label>Domaines d'intérêt</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="teaching" />
                                  <Label htmlFor="teaching" className="font-normal">Animation d'études bibliques</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="mentoring" />
                                  <Label htmlFor="mentoring" className="font-normal">Mentorat</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="events" />
                                  <Label htmlFor="events" className="font-normal">Organisation d'événements</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="comms" />
                                  <Label htmlFor="comms" className="font-normal">Communication</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="admin" />
                                  <Label htmlFor="admin" className="font-normal">Administration</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="tech" />
                                  <Label htmlFor="tech" className="font-normal">Support technique</Label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="vol-availability">Disponibilité</Label>
                              <Textarea 
                                id="vol-availability" 
                                placeholder="Quand êtes-vous disponible? (jours, heures, fréquence)"
                                className="mt-1"
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label htmlFor="vol-experience">Expérience</Label>
                              <Textarea 
                                id="vol-experience" 
                                placeholder="Partagez brièvement votre expérience et vos motivations"
                                className="mt-1"
                                rows={4}
                              />
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gbuss-blue hover:bg-gbuss-blue/90"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Traitement en cours..." : "Proposer mes services"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Resources Tab */}
                  <TabsContent value="resources">
                    <Card>
                      <CardHeader>
                        <CardTitle>Partage de ressources</CardTitle>
                        <CardDescription>
                          Partagez vos ressources, compétences ou contacts pour aider le ministère à se développer.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="res-name">Nom complet</Label>
                                <Input id="res-name" required className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="res-email">Email</Label>
                                <Input id="res-email" type="email" required className="mt-1" />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="res-phone">Téléphone</Label>
                              <Input id="res-phone" className="mt-1" />
                            </div>

                            <div>
                              <Label>Type de ressources</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="books" />
                                  <Label htmlFor="books" className="font-normal">Livres et publications</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="materials" />
                                  <Label htmlFor="materials" className="font-normal">Matériel d'évangélisation</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="spaces" />
                                  <Label htmlFor="spaces" className="font-normal">Espaces pour réunions</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="contacts" />
                                  <Label htmlFor="contacts" className="font-normal">Contacts et réseaux</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="skills" />
                                  <Label htmlFor="skills" className="font-normal">Compétences professionnelles</Label>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <Checkbox id="other-resource" />
                                  <Label htmlFor="other-resource" className="font-normal">Autres</Label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="res-details">Détails</Label>
                              <Textarea 
                                id="res-details" 
                                placeholder="Décrivez les ressources que vous pouvez partager et comment elles pourraient soutenir le ministère"
                                className="mt-1"
                                rows={4}
                              />
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gbuss-blue hover:bg-gbuss-blue/90"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Traitement en cours..." : "Partager mes ressources"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartHandshake className="h-5 w-5 text-gbuss-blue" />
                      <span>Pourquoi s'engager?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">La prière change tout</h3>
                      <p className="text-sm text-gray-600">
                        "La prière fervente du juste a une grande efficacité" (Jacques 5:16). Votre engagement 
                        dans la prière soutient spirituellement notre mission et apporte la puissance de Dieu 
                        dans nos activités quotidiennes.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Nos besoins actuels en prière</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour les étudiants qui découvrent la foi sur les campus.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour la sagesse dans la planification des activités 2023-2024.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour l'ouverture de nouveaux groupes dans les lycées.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour nos staffs qui se consacrent à plein temps au ministère.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gbuss-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gbuss-blue" />
                        Événements de prière
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <p className="font-medium">Nuit de prière nationale</p>
                          <p className="text-gray-600">25 novembre 2023, 20h-00h</p>
                        </li>
                        <li>
                          <p className="font-medium">Semaine de prière pour les campus</p>
                          <p className="text-gray-600">5-11 janvier 2024</p>
                        </li>
                        <li>
                          <p className="font-medium">Réunion zoom des intercesseurs</p>
                          <p className="text-gray-600">Chaque premier lundi du mois, 19h</p>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Témoignage</h3>
                  <div className="bg-white p-4 border rounded-md">
                    <p className="text-sm italic text-gray-600">
                      "Quand nous avons commencé à prier pour notre université, nous étions seulement 3 étudiants.
                      Après six mois de prière fidèle, nous avons vu 15 nouveaux étudiants rejoindre notre groupe
                      biblique. La prière a vraiment ouvert des portes!"
                    </p>
                    <p className="text-right text-sm font-medium mt-2">— Moussa K., Université de Dakar</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const Confirmation = ({ setShowConfirmation }: { setShowConfirmation: (value: boolean) => void }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-100 p-3">
            <CheckCircle className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gbuss-blue mb-4">Merci pour votre engagement!</h2>
        <p className="text-lg mb-6">
          Votre soutien spirituel est précieux pour le ministère du GBUSS.
          Une confirmation a été envoyée à votre adresse email avec plus d'informations.
        </p>
        <p className="text-gray-600 mb-6">
          "Ne vous inquiétez de rien; mais en toutes choses, par la prière et la supplication, 
          avec des actions de grâces, faites connaître vos demandes à Dieu." - Philippiens 4:6
        </p>
        <Button 
          onClick={() => setShowConfirmation(false)} 
          className="bg-gbuss-blue hover:bg-gbuss-blue/90"
        >
          Retour au formulaire
        </Button>
      </div>
    </div>
  );
};

export default PrierAvecNous;
