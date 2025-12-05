import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const YieldTrends = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 animate-fade-in">
          <TrendingUp className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-4xl font-bold text-foreground">{t.nav.trends}</h1>
          <p className="text-muted-foreground">Coming Soon - Historical yield trends and analytics</p>
        </div>
      </div>
    </div>
  );
};

export default YieldTrends;
