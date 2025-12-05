import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

interface RiskAnalysisChartProps {
  risks: {
    drought: string;
    heat: string;
    flood: string;
    water: string;
  };
}

const RiskAnalysisChart = ({ risks }: RiskAnalysisChartProps) => {
  const { t } = useLanguage();
  
  const getRiskValue = (risk: string) => {
    const riskMap: { [key: string]: number } = {
      'Low': 25,
      'Moderate': 50,
      'High': 75,
      'Critical': 100,
    };
    return riskMap[risk] || 0;
  };

  const getRiskColor = (risk: string) => {
    const colorMap: { [key: string]: string } = {
      'Low': 'hsl(var(--primary))',
      'Moderate': 'hsl(45 93% 47%)',
      'High': 'hsl(25 95% 53%)',
      'Critical': 'hsl(var(--destructive))',
    };
    return colorMap[risk] || 'hsl(var(--muted))';
  };

  const chartData = [
    { name: t.prediction.drought_risk, value: getRiskValue(risks.drought), risk: risks.drought },
    { name: t.prediction.heat_risk, value: getRiskValue(risks.heat), risk: risks.heat },
    { name: t.prediction.flood_risk, value: getRiskValue(risks.flood), risk: risks.flood },
    { name: t.prediction.water_risk, value: getRiskValue(risks.water), risk: risks.water },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          type="number"
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          type="category"
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
          width={100}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string, props: any) => [props.payload.risk, 'Risk Level']}
        />
        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskAnalysisChart;
