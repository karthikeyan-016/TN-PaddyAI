interface WeatherAdviceProps {
  factors: {
    temperature: { score: number; label: string };
    rainfall: { score: number; label: string };
    humidity: { score: number; label: string };
    water: { score: number; label: string };
  };
}

const WeatherAdviceSimple = ({ factors }: WeatherAdviceProps) => {
  const getAdvice = (factor: string, score: number) => {
    if (score >= 80) {
      const excellent = {
        temperature: "Perfect temperature! Continue current practices.",
        rainfall: "Excellent rainfall! Focus on drainage management.",
        humidity: "Optimal humidity! Monitor for diseases.",
        water: "Great water supply! Maintain irrigation schedule."
      };
      return { advice: excellent[factor], color: "text-green-700", bg: "bg-green-50" };
    } else if (score >= 60) {
      const good = {
        temperature: "Temperature is manageable. Use shade nets if needed.",
        rainfall: "Moderate rainfall. Supplement with irrigation.",
        humidity: "Humidity acceptable. Watch for pest activity.",
        water: "Good water supply. Plan irrigation carefully."
      };
      return { advice: good[factor], color: "text-yellow-700", bg: "bg-yellow-50" };
    } else {
      const poor = {
        temperature: "Temperature stress! Use heat-resistant varieties.",
        rainfall: "Low rainfall! Implement drip irrigation urgently.",
        humidity: "Humidity stress! Adjust irrigation timing.",
        water: "Water shortage! Use micro-irrigation systems."
      };
      return { advice: poor[factor], color: "text-red-700", bg: "bg-red-50" };
    }
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      {Object.entries(factors).map(([key, factor]) => {
        const advice = getAdvice(key, factor.score);
        return (
          <div key={key} className={`p-4 rounded-lg border-l-4 ${advice.bg} border-l-current`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold capitalize text-gray-800">{key}</h4>
              <span className={`font-bold text-lg ${getStatusColor(factor.score)}`}>
                {factor.score}%
              </span>
            </div>
            <p className={`text-sm ${advice.color}`}>
              {advice.advice}
            </p>
          </div>
        );
      })}
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Overall Assessment</h4>
        <p className="text-blue-700 text-sm">
          {(() => {
            const avgScore = Object.values(factors).reduce((sum, factor) => sum + factor.score, 0) / 4;
            if (avgScore >= 80) return "Excellent conditions for rice cultivation! Continue with standard practices.";
            if (avgScore >= 60) return "Good conditions with some areas needing attention. Focus on lower-scoring factors.";
            return "Challenging conditions detected. Implement recommended interventions immediately.";
          })()} 
        </p>
      </div>
    </div>
  );
};

export default WeatherAdviceSimple;