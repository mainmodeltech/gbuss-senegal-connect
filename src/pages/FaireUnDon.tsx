
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Heart, Banknote, CreditCard, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaireUnDon = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowThankYou(true);
      toast({
        title: "Merci pour votre don!",
        description: "Votre contribution soutient notre mission auprès des étudiants.",
        variant: "default",
      });
    }, 1500);
  };

  const handleAmountSelect = (value: string) => {
    setAmount(value === "other" ? "" : parseInt(value));
  };

  return (
    <Layout>
      <PageHeader
        title="Faire un Don"
        subtitle="Soutenez l'œuvre de Dieu parmi les étudiants et élèves"
        background="bg-gbuss-green"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {showThankYou ? (
            <ThankYou setShowThankYou={setShowThankYou} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Donation Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gbuss-blue mb-6">Votre soutien</h2>
                
                <Tabs defaultValue="one-time" className="mb-8">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="one-time">Don ponctuel</TabsTrigger>
                    <TabsTrigger value="monthly">Don mensuel</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one-time">
                    <Card>
                      <CardHeader>
                        <CardTitle>Faire un don ponctuel</CardTitle>
                        <CardDescription>
                          Votre don unique soutient nos projets et activités en cours.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="amount">Montant du don</Label>
                              <div className="grid grid-cols-3 gap-3 mt-2 mb-4">
                                {[5000, 10000, 20000, 50000, 100000, "other"].map((value) => (
                                  <Button
                                    key={value}
                                    type="button"
                                    variant={amount === value ? "default" : "outline"}
                                    className={amount === value ? "bg-gbuss-green hover:bg-gbuss-green/90" : ""}
                                    onClick={() => handleAmountSelect(value.toString())}
                                  >
                                    {value === "other" ? "Autre" : `${value.toLocaleString()} FCFA`}
                                  </Button>
                                ))}
                              </div>
                              {(amount === "other" || amount === "") && (
                                <div className="mt-4">
                                  <Label htmlFor="custom-amount">Montant personnalisé (FCFA)</Label>
                                  <Input
                                    id="custom-amount"
                                    type="number"
                                    placeholder="Entrez un montant"
                                    value={typeof amount === "string" && amount !== "other" ? amount : ""}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Label>Méthode de paiement</Label>
                              <RadioGroup defaultValue="card" className="mt-2">
                                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                                  <RadioGroupItem value="card" id="card" />
                                  <Label htmlFor="card" className="cursor-pointer flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5" />
                                    Carte bancaire
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 mt-3">
                                  <RadioGroupItem value="mobile" id="mobile" />
                                  <Label htmlFor="mobile" className="cursor-pointer flex items-center">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Mobile money (Orange Money, Wave, Free Money)
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label htmlFor="name">Nom complet</Label>
                              <Input id="name" className="mt-1" required />
                            </div>

                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" className="mt-1" required />
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gbuss-green hover:bg-gbuss-green/90"
                              disabled={!amount || isProcessing}
                            >
                              {isProcessing ? "Traitement en cours..." : "Valider mon don"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <Card>
                      <CardHeader>
                        <CardTitle>Devenir donateur régulier</CardTitle>
                        <CardDescription>
                          Votre soutien mensuel nous aide à planifier et développer nos actions sur le long terme.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="monthly-amount">Montant mensuel</Label>
                              <div className="grid grid-cols-3 gap-3 mt-2 mb-4">
                                {[2000, 5000, 10000, 15000, 25000, "other"].map((value) => (
                                  <Button
                                    key={value}
                                    type="button"
                                    variant={amount === value ? "default" : "outline"}
                                    className={amount === value ? "bg-gbuss-green hover:bg-gbuss-green/90" : ""}
                                    onClick={() => handleAmountSelect(value.toString())}
                                  >
                                    {value === "other" ? "Autre" : `${value.toLocaleString()} FCFA`}
                                  </Button>
                                ))}
                              </div>
                              {(amount === "other" || amount === "") && (
                                <div className="mt-4">
                                  <Label htmlFor="custom-monthly-amount">Montant personnalisé (FCFA)</Label>
                                  <Input
                                    id="custom-monthly-amount"
                                    type="number"
                                    placeholder="Entrez un montant"
                                    value={typeof amount === "string" && amount !== "other" ? amount : ""}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Label>Méthode de paiement</Label>
                              <RadioGroup defaultValue="card" className="mt-2">
                                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                                  <RadioGroupItem value="card" id="monthly-card" />
                                  <Label htmlFor="monthly-card" className="cursor-pointer flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5" />
                                    Carte bancaire
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 mt-3">
                                  <RadioGroupItem value="mobile" id="monthly-mobile" />
                                  <Label htmlFor="monthly-mobile" className="cursor-pointer flex items-center">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Prélèvement mobile money
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label htmlFor="monthly-name">Nom complet</Label>
                              <Input id="monthly-name" className="mt-1" required />
                            </div>

                            <div>
                              <Label htmlFor="monthly-email">Email</Label>
                              <Input id="monthly-email" type="email" className="mt-1" required />
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gbuss-green hover:bg-gbuss-green/90"
                              disabled={!amount || isProcessing}
                            >
                              {isProcessing ? "Traitement en cours..." : "Devenir donateur mensuel"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Autres méthodes de don</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Transfert bancaire</h3>
                      <p className="text-sm text-gray-600">
                        Vous pouvez effectuer un transfert bancaire en utilisant les coordonnées suivantes:
                      </p>
                      <div className="mt-2 bg-gbuss-light p-3 rounded-md text-sm">
                        <p><span className="font-medium">Banque:</span> Banque Exemple Sénégal</p>
                        <p><span className="font-medium">Titulaire:</span> GBUSS - Groupe Biblique Universitaire et Scolaire du Sénégal</p>
                        <p><span className="font-medium">IBAN:</span> SN00 0000 0000 0000 0000 0000</p>
                        <p><span className="font-medium">BIC:</span> XXXXXXXXXXX</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">Par chèque</h3>
                      <p className="text-sm text-gray-600">
                        Envoyez votre chèque à l'ordre du "GBUSS" à l'adresse suivante:<br />
                        GBUSS, BP XXXXX, Dakar, Sénégal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-gbuss-green" />
                      <span>Pourquoi donner?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Votre impact</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Soutenir l'évangélisation des campus universitaires et des lycées.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Financer des ressources bibliques pour les étudiants.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Permettre l'organisation de camps bibliques et de formations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Soutenir les staffs qui se consacrent à plein temps au ministère.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Ce que 10.000 FCFA peuvent faire</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Banknote className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Fournir 5 Bibles à des étudiants.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Banknote className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Financer une journée d'évangélisation sur un campus.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Banknote className="h-5 w-5 text-gbuss-green mt-0.5" />
                          <span>Contribuer au transport des staffs pour visiter des groupes éloignés.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gbuss-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Notre engagement</h3>
                      <p className="text-sm text-gray-600">
                        Nous nous engageons à utiliser vos dons avec intégrité et transparence.
                        100% des fonds sont utilisés pour notre mission auprès des étudiants et des élèves.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Des questions?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Pour toute question concernant les dons ou pour des informations supplémentaires:
                  </p>
                  <div className="text-sm">
                    <p>Email: <span className="text-gbuss-green">dons@gbuss.org</span></p>
                    <p>Téléphone: <span className="text-gbuss-green">+221 XX XXX XX XX</span></p>
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

const ThankYou = ({ setShowThankYou }: { setShowThankYou: (value: boolean) => void }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gbuss-green mb-4">Merci pour votre don!</h2>
        <p className="text-lg mb-6">
          Votre générosité fait une réelle différence dans la vie des étudiants et élèves du Sénégal.
          Une confirmation a été envoyée à votre adresse email.
        </p>
        <p className="text-gray-600 mb-6">
          "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; 
          car Dieu aime celui qui donne avec joie." - 2 Corinthiens 9:7
        </p>
        <Button 
          onClick={() => setShowThankYou(false)} 
          className="bg-gbuss-green hover:bg-gbuss-green/90"
        >
          Faire un autre don
        </Button>
      </div>
    </div>
  );
};

export default FaireUnDon;
