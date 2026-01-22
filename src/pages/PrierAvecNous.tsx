import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, HeartHandshake, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitPrayerCommitment, submitVolunteerCommitment, submitResourceContribution } from "@/services/api";

const PrierAvecNous = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'prayer' | 'volunteer' | 'resources'>('prayer');
  const { toast } = useToast();

  // Prayer form state
  const [prayerForm, setPrayerForm] = useState({
    name: '',
    email: '',
    frequency: '',
    preferred_topics: [] as string[],
    receive_updates: false
  });

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [] as string[],
    availability: '',
    message: ''
  });

  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    name: '',
    email: '',
    phone: '',
    resource_type: '',
    description: '',
    is_recurring: false
  });

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitPrayerCommitment(prayerForm);
      setConfirmationType('prayer');
      setShowConfirmation(true);
      toast({
        title: "Engagement enregistré",
        description: "Merci de vous engager à nos côtés dans la prière.",
        variant: "default",
      });
      setPrayerForm({ name: '', email: '', frequency: '', preferred_topics: [], receive_updates: false });
    } catch (error) {
      console.error('Error submitting prayer commitment:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitVolunteerCommitment(volunteerForm);
      setConfirmationType('volunteer');
      setShowConfirmation(true);
      toast({
        title: "Candidature envoyée",
        description: "Merci pour votre engagement bénévole.",
        variant: "default",
      });
      setVolunteerForm({ name: '', email: '', phone: '', skills: [], availability: '', message: '' });
    } catch (error) {
      console.error('Error submitting volunteer commitment:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitResourceContribution(resourceForm);
      setConfirmationType('resources');
      setShowConfirmation(true);
      toast({
        title: "Contribution enregistrée",
        description: "Merci pour votre générosité.",
        variant: "default",
      });
      setResourceForm({ name: '', email: '', phone: '', resource_type: '', description: '', is_recurring: false });
    } catch (error) {
      console.error('Error submitting resource contribution:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrayerFrequencyChange = (frequency: string) => {
    setPrayerForm({ ...prayerForm, frequency });
  };

  const handleSkillToggle = (skill: string) => {
    setVolunteerForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
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
            <Confirmation type={confirmationType} setShowConfirmation={setShowConfirmation} />
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
                        <form onSubmit={handlePrayerSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="prayer-name">Nom complet</Label>
                                <Input 
                                  id="prayer-name" 
                                  required 
                                  className="mt-1"
                                  value={prayerForm.name}
                                  onChange={(e) => setPrayerForm({...prayerForm, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="prayer-email">Email</Label>
                                <Input 
                                  id="prayer-email" 
                                  type="email" 
                                  required 
                                  className="mt-1"
                                  value={prayerForm.email}
                                  onChange={(e) => setPrayerForm({...prayerForm, email: e.target.value})}
                                />
                              </div>
                            </div>

                            <div>
                              <Label>Je m'engage à prier</Label>
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                {['daily', 'weekly', 'monthly', 'specific'].map((freq) => (
                                  <div key={freq} className="flex items-start space-x-3">
                                    <Checkbox 
                                      id={freq} 
                                      checked={prayerForm.frequency === freq}
                                      onCheckedChange={() => handlePrayerFrequencyChange(freq)}
                                    />
                                    <Label htmlFor={freq} className="font-normal">
                                      {freq === 'daily' && 'Quotidiennement'}
                                      {freq === 'weekly' && 'Hebdomadairement'}
                                      {freq === 'monthly' && 'Mensuellement'}
                                      {freq === 'specific' && 'À des occasions spécifiques'}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox 
                                id="prayer-letter" 
                                checked={prayerForm.receive_updates}
                                onCheckedChange={(checked) => setPrayerForm({...prayerForm, receive_updates: checked as boolean})}
                              />
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
                        <form onSubmit={handleVolunteerSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="vol-name">Nom complet</Label>
                                <Input 
                                  id="vol-name" 
                                  required 
                                  className="mt-1"
                                  value={volunteerForm.name}
                                  onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="vol-email">Email</Label>
                                <Input 
                                  id="vol-email" 
                                  type="email" 
                                  required 
                                  className="mt-1"
                                  value={volunteerForm.email}
                                  onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="vol-phone">Téléphone</Label>
                              <Input 
                                id="vol-phone" 
                                className="mt-1"
                                value={volunteerForm.phone}
                                onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label>Domaines d'intérêt</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                {[
                                  { id: 'teaching', label: "Animation d'études bibliques" },
                                  { id: 'mentoring', label: 'Mentorat' },
                                  { id: 'events', label: "Organisation d'événements" },
                                  { id: 'comms', label: 'Communication' },
                                  { id: 'admin', label: 'Administration' },
                                  { id: 'tech', label: 'Support technique' }
                                ].map((skill) => (
                                  <div key={skill.id} className="flex items-start space-x-3">
                                    <Checkbox 
                                      id={skill.id}
                                      checked={volunteerForm.skills.includes(skill.id)}
                                      onCheckedChange={() => handleSkillToggle(skill.id)}
                                    />
                                    <Label htmlFor={skill.id} className="font-normal">{skill.label}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="vol-availability">Disponibilité</Label>
                              <Textarea 
                                id="vol-availability" 
                                placeholder="Quand êtes-vous disponible? (jours, heures, fréquence)"
                                className="mt-1"
                                rows={2}
                                value={volunteerForm.availability}
                                onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label htmlFor="vol-message">Message (optionnel)</Label>
                              <Textarea 
                                id="vol-message" 
                                placeholder="Partagez brièvement votre expérience et vos motivations"
                                className="mt-1"
                                rows={4}
                                value={volunteerForm.message}
                                onChange={(e) => setVolunteerForm({...volunteerForm, message: e.target.value})}
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
                        <form onSubmit={handleResourceSubmit}>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="res-name">Nom complet</Label>
                                <Input 
                                  id="res-name" 
                                  required 
                                  className="mt-1"
                                  value={resourceForm.name}
                                  onChange={(e) => setResourceForm({...resourceForm, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="res-email">Email</Label>
                                <Input 
                                  id="res-email" 
                                  type="email" 
                                  required 
                                  className="mt-1"
                                  value={resourceForm.email}
                                  onChange={(e) => setResourceForm({...resourceForm, email: e.target.value})}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="res-phone">Téléphone</Label>
                              <Input 
                                id="res-phone" 
                                className="mt-1"
                                value={resourceForm.phone}
                                onChange={(e) => setResourceForm({...resourceForm, phone: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label htmlFor="res-type">Type de ressource</Label>
                              <Input 
                                id="res-type" 
                                placeholder="Ex: Livres, Matériel, Espace de réunion..."
                                className="mt-1"
                                value={resourceForm.resource_type}
                                onChange={(e) => setResourceForm({...resourceForm, resource_type: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label htmlFor="res-details">Description</Label>
                              <Textarea 
                                id="res-details" 
                                placeholder="Décrivez les ressources que vous pouvez partager et comment elles pourraient soutenir le ministère"
                                className="mt-1"
                                rows={4}
                                value={resourceForm.description}
                                onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                              />
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox 
                                id="res-recurring"
                                checked={resourceForm.is_recurring}
                                onCheckedChange={(checked) => setResourceForm({...resourceForm, is_recurring: checked as boolean})}
                              />
                              <Label htmlFor="res-recurring" className="font-normal">
                                Je peux offrir cette ressource de manière récurrente
                              </Label>
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
                          <span>Pour la sagesse dans la planification des activités.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour l'ouverture de nouveaux groupes dans les lycées.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gbuss-blue">•</span>
                          <span>Pour le financement des projets missionnaires.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gbuss-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Prochaine réunion de prière
                      </h3>
                      <p className="text-sm text-gray-600">
                        Rejoignez-nous chaque premier samedi du mois pour un temps de prière collective en ligne.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Des questions?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Pour toute question sur les engagements ou pour des informations supplémentaires:
                  </p>
                  <div className="text-sm">
                    <p>Email: <span className="text-gbuss-green">engagement@gbuss.org</span></p>
                    <p>Téléphone: <span className="text-gbuss-green">+221 77 XXX XX XX</span></p>
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

const Confirmation = ({ 
  type, 
  setShowConfirmation 
}: { 
  type: 'prayer' | 'volunteer' | 'resources';
  setShowConfirmation: (value: boolean) => void;
}) => {
  const messages = {
    prayer: {
      title: "Merci pour votre engagement de prière!",
      message: "Votre soutien dans la prière est précieux pour notre mission. Vous recevrez bientôt des nouvelles de notre mouvement."
    },
    volunteer: {
      title: "Merci pour votre candidature!",
      message: "Nous avons bien reçu votre demande de bénévolat. Notre équipe vous contactera prochainement pour discuter des opportunités."
    },
    resources: {
      title: "Merci pour votre générosité!",
      message: "Votre contribution en ressources aidera à développer notre ministère. Nous vous contacterons pour organiser les détails."
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gbuss-blue mb-4">{messages[type].title}</h2>
        <p className="text-lg mb-6">{messages[type].message}</p>
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
