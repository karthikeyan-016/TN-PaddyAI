import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Sprout, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import HealthCheck from "@/components/HealthCheck";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center space-x-2 text-primary hover:text-accent transition-colors">
            <Sprout className="w-8 h-8" />
            <span className="font-bold text-xl hidden md:block">Rice Yield AI</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink
              to="/home"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.home}
            </NavLink>
            <NavLink
              to="/prediction"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.prediction}
            </NavLink>
            <NavLink
              to="/climate"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.climate}
            </NavLink>

            <NavLink
              to="/risk"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.risk}
            </NavLink>
            <NavLink
              to="/about"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.about}
            </NavLink>
            <NavLink
              to="/contact"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-secondary font-medium"
            >
              {t.nav.contact}
            </NavLink>
          </div>

          {/* Health Check and Language Toggle */}
          <div className="flex items-center space-x-3">
            <HealthCheck />
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-primary/30 hover:bg-primary/10 hover:border-primary"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
