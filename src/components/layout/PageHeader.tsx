
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  background?: string;
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  background = "bg-gbuss-blue", 
  className 
}: PageHeaderProps) => {
  return (
    <div 
      className={cn(
        "relative py-16 md:py-24 -mt-16",
        background,
        className
      )}
    >
      <div className="container mx-auto px-4 pt-16 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
