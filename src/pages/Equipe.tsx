
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Facebook, Twitter } from "lucide-react";

// Team member data
const nationalTeam = [
  {
    id: 1,
    name: "Pasteur Amadou Sarr",
    role: "Secrétaire Général",
    bio: "Pasteur Amadou dirige le GBUSS depuis 8 ans avec passion et dévouement. Son cœur pour les étudiants et sa vision claire ont permis une croissance significative du mouvement.",
    image: "/placeholder.svg",
    contact: {
      email: "amadou.sarr@gbuss.org",
      phone: "+221 78 xxx xx xx",
      facebook: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Mme Fatou Diop",
    role: "Responsable Formation",
    bio: "Fatou coordonne les programmes de formation biblique et le développement du leadership au sein du GBUSS. Elle est passionnée par l'équipement des jeunes leaders.",
    image: "/placeholder.svg",
    contact: {
      email: "fatou.diop@gbuss.org",
      phone: "+221 77 xxx xx xx",
      facebook: "#"
    }
  },
  {
    id: 3,
    name: "M. Jean Mendy",
    role: "Responsable Évangélisation",
    bio: "Jean supervise les initiatives d'évangélisation sur les campus. Son expertise en apologétique chrétienne est une ressource précieuse pour le mouvement.",
    image: "/placeholder.svg",
    contact: {
      email: "jean.mendy@gbuss.org",
      phone: "+221 76 xxx xx xx",
      twitter: "#"
    }
  },
  {
    id: 4,
    name: "Mme Marie Ndiaye",
    role: "Trésorière",
    bio: "Marie gère les finances du GBUSS avec intégrité et sagesse. Elle est également impliquée dans la recherche de partenariats stratégiques.",
    image: "/placeholder.svg",
    contact: {
      email: "marie.ndiaye@gbuss.org",
      phone: "+221 75 xxx xx xx"
    }
  }
];

const regionalLeaders = [
  {
    id: 5,
    name: "Ibrahim Sow",
    role: "Coordination Dakar",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Assane Diallo",
    role: "Coordination Saint-Louis",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Charlotte Faye",
    role: "Coordination Thiès",
    image: "/placeholder.svg"
  },
  {
    id: 8,
    name: "Ousmane Mbaye",
    role: "Coordination Ziguinchor",
    image: "/placeholder.svg"
  },
  {
    id: 9,
    name: "Mariama Cissé",
    role: "Coordination Kaolack",
    image: "/placeholder.svg"
  },
  {
    id: 10,
    name: "Demba Fall",
    role: "Coordination Lycées Dakar",
    image: "/placeholder.svg"
  }
];

const board = [
  {
    id: 11,
    name: "Dr. Samuel Diouf",
    role: "Président du Conseil",
    organization: "Université Cheikh Anta Diop"
  },
  {
    id: 12,
    name: "Pasteur Pierre Gomis",
    role: "Vice-président",
    organization: "Église Évangélique du Sénégal"
  },
  {
    id: 13,
    name: "Mme Aïda Niang",
    role: "Secrétaire",
    organization: "ONG Compassion"
  },
  {
    id: 14,
    name: "M. Paul Sène",
    role: "Membre",
    organization: "Entrepreneur chrétien"
  }
];

const Equipe = () => {
  return (
    <Layout>
      <PageHeader
        title="Notre Équipe"
        subtitle="Découvrez les personnes qui animent le GBUSS"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* National Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Équipe Nationale</h2>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Notre équipe nationale coordonne les activités du GBUSS à travers tout le Sénégal, 
              avec passion et dévouement pour la mission que Dieu nous a confiée.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {nationalTeam.map(member => (
                <TeamMemberCard 
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  contact={member.contact}
                />
              ))}
            </div>
          </div>

          {/* Regional Leaders */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Responsables Régionaux</h2>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Nos coordinateurs régionaux dirigent les activités du GBUSS dans leurs zones respectives,
              adaptant notre vision aux réalités locales.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
              {regionalLeaders.map(leader => (
                <RegionalLeaderCard 
                  key={leader.id}
                  name={leader.name}
                  role={leader.role}
                  image={leader.image}
                />
              ))}
            </div>
          </div>

          {/* Board Members */}
          <div>
            <h2 className="text-3xl font-bold text-gbuss-blue mb-6 text-center">Conseil d'Administration</h2>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Notre conseil d'administration fournit orientation, sagesse et supervision 
              pour assurer la fidélité du mouvement à sa mission.
            </p>
            
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-center text-gbuss-blue">Membres du Conseil</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="divide-y">
                    {board.map(member => (
                      <div key={member.id} className="flex justify-between items-center py-4 px-6">
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.organization}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gbuss-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gbuss-blue mb-6">Rejoignez notre équipe</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Vous êtes passionné par l'évangélisation des étudiants et des élèves ? 
            Découvrez les opportunités pour servir avec le GBUSS comme volontaire, stagiaire ou membre du personnel.
          </p>
          <div className="inline-block bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
            <p className="mb-4">Envoyez votre CV et lettre de motivation à:</p>
            <p className="text-gbuss-green font-medium">recrutement@gbuss.org</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Team Member Card Component
interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  contact: {
    email?: string;
    phone?: string;
    facebook?: string;
    twitter?: string;
  };
}

const TeamMemberCard = ({ name, role, bio, image, contact }: TeamMemberCardProps) => {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-all">
      <div className="aspect-[4/3] bg-gbuss-light">
        <div className="h-full w-full flex items-center justify-center bg-gbuss-blue/10">
          <span className="text-4xl font-semibold text-gbuss-blue/30">{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-base text-gbuss-blue">{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{bio}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex flex-wrap gap-3">
          {contact.email && (
            <a href={`mailto:${contact.email}`} aria-label="Email" className="text-gray-500 hover:text-gbuss-blue">
              <Mail size={18} />
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`} aria-label="Phone" className="text-gray-500 hover:text-gbuss-blue">
              <Phone size={18} />
            </a>
          )}
          {contact.facebook && (
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-gbuss-blue">
              <Facebook size={18} />
            </a>
          )}
          {contact.twitter && (
            <a href={contact.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-gbuss-blue">
              <Twitter size={18} />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// Regional Leader Card Component
interface RegionalLeaderCardProps {
  name: string;
  role: string;
  image: string;
}

const RegionalLeaderCard = ({ name, role, image }: RegionalLeaderCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-sm transition-all text-center">
      <div className="aspect-square bg-gbuss-light">
        <div className="h-full w-full flex items-center justify-center bg-gbuss-green/10">
          <span className="text-3xl font-semibold text-gbuss-green/30">{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </CardContent>
    </Card>
  );
};

export default Equipe;
