import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <Info className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">{t.nav.about}</h1>
          </div>

          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Purpose</h2>
            <p className="text-foreground/90 leading-relaxed">
              The Tamil Nadu Rice Yield Prediction System is designed to empower farmers with AI-driven insights 
              for better agricultural planning and decision-making. By analyzing climate patterns, soil conditions, 
              and historical data, we provide accurate yield predictions to help farmers optimize their farming practices.
            </p>
          </Card>

          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Features</h2>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>AI-powered yield prediction based on multiple climate and soil parameters</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Comprehensive risk analysis for drought, heat, flood, and water stress</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Visual analytics with interactive charts and graphs</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Bilingual support for English and Tamil languages</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Actionable recommendations for optimal farming decisions</span>
              </li>
            </ul>
          </Card>

          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-foreground/90 leading-relaxed">
              Our system uses machine learning models trained on historical agricultural data from Tamil Nadu. 
              By inputting parameters such as district, season, temperature, rainfall, humidity, water availability, 
              and fertilizer usage, the AI model analyzes these factors to predict rice yield with high accuracy. 
              The system also provides risk assessments and personalized recommendations to help farmers make informed decisions.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
