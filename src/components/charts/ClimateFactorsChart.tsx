import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

interface ClimateFactorsChartProps {
  factors: {
    temperature: { score: number; label: string };
    rainfall: { score: number; label: string };
    humidity: { score: number; label: string };
    water: { score: number; label: string };
  };
}

const ClimateFactorsChart = ({ factors }: ClimateFactorsChartProps) => {
  const { t } = useLanguage();
  
  const chartData = [
    { name: t.prediction.temp_label, score: factors.temperature.score },
    { name: t.prediction.rain_label, score: factors.rainfall.score },
    { name: t.prediction.humid_label, score: factors.humidity.score },
    { name: t.prediction.water_label, score: factors.water.score },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Bar 
          dataKey="score" 
          fill="hsl(var(--accent))" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ClimateFactorsChart;
