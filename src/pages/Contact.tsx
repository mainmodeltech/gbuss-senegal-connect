import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getContactInfo, getOpeningHours, getFAQs, submitContactForm } from "@/services/api";
import type { ContactInfo as ContactInfoType, OpeningHours, FAQ } from "@/lib/supabase";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfoType[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactData, hoursData, faqData] = await Promise.all([
          getContactInfo(),
          getOpeningHours(),
          getFAQs()
        ]);
        setContactInfo(contactData || []);
        setOpeningHours(hoursData || []);
        setFaqs(faqData || []);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      setShowConfirmation(true);
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'address': return <MapPin className="h-6 w-6" />;
      case 'email': return <Mail className="h-6 w-6" />;
      case 'phone': return <Phone className="h-6 w-6" />;
      case 'social': return <Facebook className="h-6 w-6" />;
      default: return <Mail className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <PageHeader title="Contact" subtitle="Nous sommes à votre écoute" />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-gbuss-blue" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Contact"
        subtitle="Nous sommes à votre écoute"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {showConfirmation ? (
            <Confirmation setShowConfirmation={setShowConfirmation} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Nom complet</Label>
                          <Input 
                            id="name" 
                            required 
                            className="mt-1"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            required 
                            className="mt-1"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Sujet</Label>
                        <Input 
                          id="subject" 
                          required 
                          className="mt-1"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          required 
                          className="mt-1"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gbuss-blue hover:bg-gbuss-blue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gbuss-blue mb-6">Comment nous joindre</h2>
                
                <div className="space-y-6">
                  {contactInfo.length > 0 ? (
                    contactInfo.map((info) => (
                      <ContactInfoCard 
                        key={info.id}
                        title={info.title}
                        icon={getIconForType(info.type)}
                      >
                        {info.link ? (
                          <a href={info.link} className="text-gbuss-blue hover:underline">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </ContactInfoCard>
                    ))
                  ) : (
                    <>
                      <ContactInfoCard title="Adresse" icon={<MapPin className="h-6 w-6" />}>
                        <p className="text-gray-600">Bureau National du GBUSS</p>
                        <p className="text-gray-600">Dakar, Sénégal</p>
                      </ContactInfoCard>
                      <ContactInfoCard title="Email" icon={<Mail className="h-6 w-6" />}>
                        <a href="mailto:contact@gbuss.org" className="text-gbuss-blue hover:underline">
                          contact@gbuss.org
                        </a>
                      </ContactInfoCard>
                      <ContactInfoCard title="Téléphone" icon={<Phone className="h-6 w-6" />}>
                        <a href="tel:+22133XXXXXX" className="text-gbuss-blue hover:underline">
                          +221 33 XXX XX XX
                        </a>
                      </ContactInfoCard>
                    </>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Horaires d'ouverture</h3>
                  <div className="bg-gbuss-light p-4 rounded-md">
                    {openingHours.length > 0 ? (
                      openingHours.map((hours) => (
                        <p key={hours.id} className="mb-2">
                          <span className="font-medium">{hours.days}:</span> {hours.is_closed ? 'Fermé' : hours.hours}
                        </p>
                      ))
                    ) : (
                      <>
                        <p className="mb-2"><span className="font-medium">Lundi - Vendredi:</span> 9h00 - 17h00</p>
                        <p><span className="font-medium">Samedi - Dimanche:</span> Fermé</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gbuss-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gbuss-blue mb-12">Où nous trouver</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-12 rounded-md shadow-sm border text-center text-gray-500">
              Carte interactive de localisation du GBUSS
              <p className="mt-4 text-sm">
                (Une carte Google Maps sera intégrée ici)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gbuss-blue mb-12 text-center">Questions fréquentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <FaqItem 
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))
            ) : (
              <>
                <FaqItem 
                  question="Comment puis-je rejoindre un groupe GBUSS dans mon université?"
                  answer="Contactez-nous par email ou téléphone, et nous vous mettrons en relation avec le coordinateur local de votre campus."
                />
                <FaqItem 
                  question="Proposez-vous des formations pour les responsables d'église?"
                  answer="Oui, nous organisons régulièrement des formations pour les responsables d'église qui souhaitent développer un ministère auprès des jeunes."
                />
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface ContactInfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContactInfoCard = ({ title, icon, children }: ContactInfoCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-sm transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-gbuss-blue/10 p-2 rounded-full text-gbuss-blue">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gbuss-blue mb-2">{question}</h3>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  );
};

const Confirmation = ({ setShowConfirmation }: { setShowConfirmation: (value: boolean) => void }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gbuss-blue mb-4">Message envoyé!</h2>
        <p className="text-lg mb-6">
          Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais, 
          généralement sous 24 à 48 heures ouvrables.
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

export default Contact;
