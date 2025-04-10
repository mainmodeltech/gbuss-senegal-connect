
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Logo component
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src="/logo-gbuss.png" alt="GBUSS Logo" className="h-10 w-auto" />
    <div className="font-heading font-bold text-xl text-gbuss-blue hidden md:block">
      GBUSS
    </div>
  </Link>
);

// Mobile menu button
const MobileMenuButton = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => (
  <Button onClick={toggleMenu} variant="ghost" size="icon" className="md:hidden">
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </Button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  // Navigation links
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Vision & Mission", href: "/vision-mission" },
    { name: "Nos Actions", href: "/actions" },
    { name: "Témoignages", href: "/temoignages" },
    { name: "Équipe", href: "/equipe" },
    { name: "Contact", href: "/contact" },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing pages
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gbuss-blue",
                  pathname === link.href
                    ? "text-gbuss-blue font-semibold"
                    : "text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/prier-avec-nous">
              <Button variant="outline" className="border-gbuss-purple text-gbuss-purple hover:bg-gbuss-purple hover:text-white">
                S'engager
              </Button>
            </Link>
            <Link to="/faire-un-don">
              <Button className="bg-gbuss-blue text-white hover:bg-gbuss-blue/90">
                Faire un don
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col py-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-md",
                  pathname === link.href
                    ? "bg-gbuss-blue/10 text-gbuss-blue font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 px-4">
              <Link to="/prier-avec-nous">
                <Button variant="outline" className="w-full border-gbuss-purple text-gbuss-purple hover:bg-gbuss-purple hover:text-white">
                  S'engager
                </Button>
              </Link>
              <Link to="/faire-un-don">
                <Button className="w-full bg-gbuss-blue text-white hover:bg-gbuss-blue/90">
                  Faire un don
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
