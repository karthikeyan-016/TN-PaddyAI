import { Thermometer, CloudRain, Droplets, Droplet, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WeatherAdviceProps {
  factors: {
    temperature: { score: number; label: string };
    rainfall: { score: number; label: string };
    humidity: { score: number; label: string };
    water: { score: number; label: string };
  };
}

const WeatherAdvice = ({ factors }: WeatherAdviceProps) => {
  console.log('WeatherAdvice rendered with factors:', factors);
  const getAdvice = (factor: string, score: number) => {
    const adviceMap = {
      temperature: {
        excellent: {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          advice: "Perfect temperature conditions! Maintain current practices and monitor for any sudden changes."
        },
        good: {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          advice: "Temperature is manageable. Consider shade nets during peak hours and ensure adequate water supply."
        },
        poor: {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          advice: "Temperature stress detected! Use heat-resistant varieties, increase irrigation frequency, and apply mulching."
        }
      },
      rainfall: {
        excellent: {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          advice: "Excellent rainfall! Focus on proper drainage to prevent waterlogging and monitor for pest diseases."
        },
        good: {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          advice: "Moderate rainfall. Supplement with irrigation during dry spells and harvest rainwater for future use."
        },
        poor: {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          advice: "Low rainfall alert! Implement drip irrigation, use drought-tolerant varieties, and apply water-saving techniques."
        }
      },
      humidity: {
        excellent: {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          advice: "Optimal humidity levels! Monitor for fungal diseases and ensure good air circulation in fields."
        },
        good: {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          advice: "Humidity is acceptable. Watch for pest activity and apply preventive fungicide if needed."
        },
        poor: {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          advice: "Humidity stress! Adjust irrigation timing, improve field ventilation, and monitor plant health closely."
        }
      },
      water: {
        excellent: {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          advice: "Excellent water availability! Maintain efficient irrigation schedule and avoid over-watering."
        },
        good: {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          advice: "Good water supply. Plan irrigation carefully and consider water conservation methods."
        },
        poor: {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          advice: "Water scarcity warning! Implement micro-irrigation, mulching, and consider drought-resistant crops."
        }
      }
    };

    const level = score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'poor';
    return adviceMap[factor][level];
  };

  const getFactorIcon = (factor: string) => {
    const icons = {
      temperature: Thermometer,
      rainfall: CloudRain,
      humidity: Droplets,
      water: Droplet
    };
    return icons[factor];
  };

  const getStatusBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500 text-white">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-500 text-white">Good</Badge>;
    return <Badge className="bg-red-500 text-white">Needs Attention</Badge>;
  };

  return (
    <div className="space-y-4">
      {Object.entries(factors).map(([factorKey, factorData]) => {
        const advice = getAdvice(factorKey, factorData.score);
        const FactorIcon = getFactorIcon(factorKey);
        const StatusIcon = advice.icon;

        return (
          <div key={factorKey} className={`p-4 rounded-lg border-l-4 ${advice.bgColor} border-l-current`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FactorIcon className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-800 capitalize">{factorKey}</h4>
                {getStatusBadge(factorData.score)}
              </div>
              <div className="flex items-center space-x-2">
                <StatusIcon className={`w-5 h-5 ${advice.color}`} />
                <span className="font-bold text-lg">{factorData.score}%</span>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed">
              {advice.advice}
            </p>
          </div>
        );
      })}

      {/* Overall Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Overall Weather Assessment
        </h4>
        <p className="text-blue-700 text-sm">
          {(() => {
            const avgScore = Object.values(factors).reduce((sum, factor) => sum + factor.score, 0) / 4;
            if (avgScore >= 80) return "Excellent weather conditions for rice cultivation! Continue with standard practices and monitor regularly.";
            if (avgScore >= 60) return "Good weather conditions with some areas needing attention. Focus on the lower-scoring factors for optimal results.";
            return "Challenging weather conditions detected. Implement recommended interventions immediately and consider consulting agricultural experts.";
          })()}
        </p>
      </div>
    </div>
  );
};

export default WeatherAdvice;