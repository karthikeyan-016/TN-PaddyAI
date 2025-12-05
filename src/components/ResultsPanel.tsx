import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, AlertTriangle } from "lucide-react";
import { PredictionResult } from "@/pages/PredictionDashboard";
import { useLanguage } from "@/hooks/useLanguage";
import MonthlyYieldChart from "./charts/MonthlyYieldChart";
import ClimateFactorsChart from "./charts/ClimateFactorsChart";
import WeatherBalanceChart from "./charts/WeatherBalanceChart";
// With this:
import WeatherAdvice from "./WeatherAdviceSimple";

interface ResultsPanelProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

const ResultsPanel = ({ result, isLoading }: ResultsPanelProps) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <Card className="glass-card p-12 flex flex-col items-center justify-center min-h-[600px]">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
        <p className="text-xl text-muted-foreground">Analyzing data...</p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="glass-card p-12 flex flex-col items-center justify-center min-h-[600px]">
        <TrendingUp className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-xl text-muted-foreground text-center">
          Enter parameters and click predict to see results
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Yield Summary Card */}
      <Card className="glass-card p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary">
            {t.prediction.predicted_yield}
          </h3>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>

        <div className="flex items-end space-x-2 mb-4">
          <span className="text-5xl font-bold text-foreground">
            {result.yield.toLocaleString()}
          </span>
          <span className="text-2xl text-muted-foreground mb-2">
            {t.prediction.kg_per_hectare}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t.prediction.suitability}
            </span>
            <span className="text-lg font-bold text-primary">
              {result.weather_analysis.suitability_score}%
            </span>
          </div>
          <Progress
            value={result.weather_analysis.suitability_score}
            className="h-3"
          />
        </div>
      </Card>

      {/* Monthly Trend Chart */}
      <Card className="glass-card p-6 animate-slide-up">
        <h3 className="text-xl font-bold mb-4 text-foreground">
          {t.prediction.monthly_trend}
        </h3>
        <MonthlyYieldChart data={result.monthly_yield} />
      </Card>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            {t.prediction.climate_factors}
          </h3>
          <ClimateFactorsChart factors={result.weather_analysis.factors} />
        </Card>

        <Card className="glass-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            {t.prediction.weather_balance}
          </h3>
          <WeatherBalanceChart factors={result.weather_analysis.factors} />
        </Card>
      </div>

      {/* Weather-Based Advice */}
      <Card className="glass-card p-6 animate-slide-up">
        <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          Smart Agricultural Advice
        </h3>
        <WeatherAdvice factors={result.weather_analysis.factors} />
      </Card>

      {/* Recommendations */}
      <Card className="glass-card p-6 animate-slide-up">
        <h3 className="text-xl font-bold mb-4 text-primary">
          {t.prediction.recommendations}
        </h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-foreground/90">{rec}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ResultsPanel;
