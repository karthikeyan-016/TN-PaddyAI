import { Thermometer, CloudRain, Droplets, Droplet } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface WeatherBalanceChartProps {
  factors: {
    temperature: { score: number; label: string };
    rainfall: { score: number; label: string };
    humidity: { score: number; label: string };
    water: { score: number; label: string };
  };
}

const SpeedometerGauge = ({ value, label, icon: Icon, color }: { value: number; label: string; icon: any; color: string }) => {
  const angle = (value / 100) * 180 - 90; // Convert to degrees for semicircle
  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-24 h-12">
        {/* Background arc */}
        <svg className="w-24 h-12" viewBox="0 0 100 50">
          <path
            d="M 10 40 A 30 30 0 0 1 90 40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 10 40 A 30 30 0 0 1 90 40"
            stroke={getColor(value)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(value / 100) * 125.66} 125.66`}
            className="transition-all duration-1000 ease-out"
          />
          {/* Needle */}
          <line
            x1="50"
            y1="40"
            x2={50 + 25 * Math.cos((angle * Math.PI) / 180)}
            y2={40 + 25 * Math.sin((angle * Math.PI) / 180)}
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Center dot */}
          <circle cx="50" cy="40" r="3" fill="#374151" />
        </svg>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 mb-1">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-xs font-medium text-gray-600">{label}</span>
        </div>
        <div className="text-lg font-bold" style={{ color: getColor(value) }}>
          {value}%
        </div>
      </div>
    </div>
  );
};

const WeatherBalanceChart = ({ factors }: WeatherBalanceChartProps) => {
  const { t } = useLanguage();
  
  const gaugeData = [
    { 
      value: factors.temperature.score, 
      label: t.prediction.temp_label, 
      icon: Thermometer, 
      color: '#ef4444' 
    },
    { 
      value: factors.rainfall.score, 
      label: t.prediction.rain_label, 
      icon: CloudRain, 
      color: '#3b82f6' 
    },
    { 
      value: factors.humidity.score, 
      label: t.prediction.humid_label, 
      icon: Droplets, 
      color: '#06b6d4' 
    },
    { 
      value: factors.water.score, 
      label: t.prediction.water_label, 
      icon: Droplet, 
      color: '#10b981' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {gaugeData.map((gauge, index) => (
          <SpeedometerGauge
            key={index}
            value={gauge.value}
            label={gauge.label}
            icon={gauge.icon}
            color={gauge.color}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Excellent (80-100%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Good (60-79%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Poor (0-59%)</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherBalanceChart;