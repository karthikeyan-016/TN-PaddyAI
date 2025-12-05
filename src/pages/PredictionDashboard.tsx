import { useState } from "react";
import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";
import ResultsPanel from "@/components/ResultsPanel";
import { useLanguage } from "@/hooks/useLanguage";

export interface PredictionResult {
  yield: number;
  monthly_yield: number[];
  weather_analysis: {
    suitability_score: number;
    factors: {
      temperature: { score: number; label: string };
      rainfall: { score: number; label: string };
      humidity: { score: number; label: string };
      water: { score: number; label: string };
    };
  };
  risk: {
    drought: string;
    heat: string;
    flood: string;
    water: string;
  };
  recommendations: string[];
}

const PredictionDashboard = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      console.log("API Prediction Response:", data);
      setResult(data);
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Failed to connect to backend. Please ensure the backend server is running on port 8000.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t.prediction.title}
          </h1>
          <p className="text-muted-foreground">
            Enter parameters to predict rice yield for your region
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-3">
            <ResultsPanel result={result} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboard;
