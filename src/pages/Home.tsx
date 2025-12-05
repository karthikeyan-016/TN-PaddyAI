import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CloudRain, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/hooks/useLanguage";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
        
        {/* Animated elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                {t.home.hero_title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.hero_subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                onClick={() => navigate("/prediction")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold emerald-glow group"
              >
                {t.home.cta_button}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 hover:scale-105 transition-transform duration-300 animate-slide-up">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <CloudRain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{t.home.feature1_title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.home.feature1_desc}
              </p>
            </Card>

            <Card className="glass-card p-8 hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{t.home.feature2_title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.home.feature2_desc}
              </p>
            </Card>

            <Card className="glass-card p-8 hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{t.home.feature3_title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.home.feature3_desc}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
