
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-gbuss-blue mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 text-center">
          Oops! La page que vous cherchez n'existe pas.
        </p>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Il semble que vous ayez suivi un lien cassé ou entré une URL qui n'existe pas sur notre site.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gbuss-blue hover:bg-gbuss-blue/90">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
