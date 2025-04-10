
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gbuss-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-gbuss.png" alt="GBUSS Logo" className="h-12" />
              <h3 className="font-heading font-bold text-xl">GBUSS</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Le Groupe Biblique Universitaire et Scolaire du Sénégal. Ensemble pour témoigner de Jésus-Christ dans l'environnement académique.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-white hover:text-gbuss-purple">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:text-gbuss-purple">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-white hover:text-gbuss-purple">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/vision-mission" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/actions" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Nos Actions
                </Link>
              </li>
              <li>
                <Link to="/temoignages" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Équipe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gbuss-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic">
              <div className="flex items-start space-x-3 mb-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">Dakar, Sénégal</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <Phone size={18} />
                <span className="text-gray-300">+221 xx xxx xx xx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span className="text-gray-300">contact@gbuss.org</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} GBUSS - Groupe Biblique Universitaire et Scolaire du Sénégal. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
