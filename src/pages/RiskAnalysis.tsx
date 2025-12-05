import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, AlertTriangle, CloudRain, Thermometer, Bug, Droplets, Wind, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from 'react';

const RiskAnalysis = () => {
  const { t } = useLanguage();
  const [selectedSeason, setSelectedSeason] = useState('samba');

  const seasonalRisks = {
    kuruvai: {
      name: 'Kuruvai Season (Jun-Sep)',
      period: 'Southwest Monsoon Period',
      emoji: '🌱',
      color: 'from-green-500 to-emerald-600',
      risks: [
        {
          type: 'Flood Risk',
          level: 'High',
          percentage: 75,
          icon: '🌊',
          color: '#3b82f6',
          description: 'Heavy monsoon rains can cause flooding in low-lying areas',
          impacts: ['Crop submergence', 'Root rot diseases', 'Delayed planting'],
          mitigation: ['Improve drainage systems', 'Use flood-resistant varieties', 'Staggered planting']
        },
        {
          type: 'Pest Infestation',
          level: 'High',
          percentage: 70,
          icon: '🐛',
          color: '#10b981',
          description: 'High humidity favors pest and disease development',
          impacts: ['Brown plant hopper', 'Stem borer attacks', 'Bacterial leaf blight'],
          mitigation: ['Regular monitoring', 'Integrated pest management', 'Resistant varieties']
        },
        {
          type: 'Wind Damage',
          level: 'Medium',
          percentage: 45,
          icon: '💨',
          color: '#f59e0b',
          description: 'Strong monsoon winds can cause lodging',
          impacts: ['Plant lodging', 'Reduced grain filling', 'Harvest difficulties'],
          mitigation: ['Wind barriers', 'Proper spacing', 'Balanced fertilization']
        },
        {
          type: 'Nutrient Leaching',
          level: 'Medium',
          percentage: 50,
          icon: '🧪',
          color: '#8b5cf6',
          description: 'Excessive rainfall leads to nutrient loss',
          impacts: ['Nitrogen deficiency', 'Poor plant growth', 'Reduced yield'],
          mitigation: ['Split fertilizer application', 'Slow-release fertilizers', 'Organic matter addition']
        }
      ]
    },
    samba: {
      name: 'Samba Season (Aug-Jan)',
      period: 'Northeast Monsoon Period',
      emoji: '🌾',
      color: 'from-blue-500 to-cyan-600',
      risks: [
        {
          type: 'Drought Stress',
          level: 'Medium',
          percentage: 40,
          icon: '🌵',
          color: '#ef4444',
          description: 'Irregular northeast monsoon can cause water stress',
          impacts: ['Reduced tillering', 'Poor grain filling', 'Yield reduction'],
          mitigation: ['Efficient irrigation', 'Drought-tolerant varieties', 'Mulching']
        },
        {
          type: 'Cold Stress',
          level: 'Medium',
          percentage: 35,
          icon: '❄️',
          color: '#06b6d4',
          description: 'Winter temperatures can affect crop growth',
          impacts: ['Delayed flowering', 'Spikelet sterility', 'Extended crop duration'],
          mitigation: ['Proper timing of planting', 'Cold-tolerant varieties', 'Water management']
        },
        {
          type: 'Blast Disease',
          level: 'High',
          percentage: 65,
          icon: '🦠',
          color: '#dc2626',
          description: 'Cool, humid conditions favor blast disease',
          impacts: ['Leaf blast', 'Neck blast', 'Severe yield loss'],
          mitigation: ['Resistant varieties', 'Fungicide application', 'Balanced nutrition']
        },
        {
          type: 'Cyclone Risk',
          level: 'Medium',
          percentage: 30,
          icon: '🌀',
          color: '#7c3aed',
          description: 'Northeast monsoon cyclones can damage crops',
          impacts: ['Crop lodging', 'Flooding', 'Complete crop loss'],
          mitigation: ['Weather monitoring', 'Early harvest', 'Crop insurance']
        }
      ]
    },
    thaladi: {
      name: 'Thaladi Season (Sep-Feb)',
      period: 'Post-Monsoon Period',
      emoji: '🌿',
      color: 'from-orange-500 to-red-600',
      risks: [
        {
          type: 'Water Scarcity',
          level: 'High',
          percentage: 80,
          icon: '💧',
          color: '#ef4444',
          description: 'Limited water availability during dry season',
          impacts: ['Crop stress', 'Reduced area cultivation', 'Poor grain quality'],
          mitigation: ['Efficient irrigation systems', 'Water harvesting', 'Short-duration varieties']
        },
        {
          type: 'Heat Stress',
          level: 'High',
          percentage: 70,
          icon: '🌡️',
          color: '#f59e0b',
          description: 'Rising temperatures during grain filling stage',
          impacts: ['Spikelet sterility', 'Reduced grain weight', 'Poor quality'],
          mitigation: ['Heat-tolerant varieties', 'Adequate irrigation', 'Timely harvest']
        },
        {
          type: 'Rodent Damage',
          level: 'Medium',
          percentage: 45,
          icon: '🐭',
          color: '#6b7280',
          description: 'Dry conditions increase rodent activity',
          impacts: ['Grain damage', 'Storage losses', 'Field damage'],
          mitigation: ['Community trapping', 'Proper storage', 'Bait stations']
        },
        {
          type: 'Market Risk',
          level: 'Medium',
          percentage: 40,
          icon: '📈',
          color: '#059669',
          description: 'Price fluctuations during harvest season',
          impacts: ['Low prices', 'Storage costs', 'Quality deterioration'],
          mitigation: ['Market intelligence', 'Value addition', 'Contract farming']
        }
      ]
    }
  };

  const currentSeasonData = seasonalRisks[selectedSeason];

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskTextColor = (level) => {
    switch (level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#1D2430'}}>
      <Navbar />
      
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${currentSeasonData.color} text-white`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Shield className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-bold">Risk Analysis</h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive seasonal risk assessment for rice cultivation in Tamil Nadu
            </p>
            
            {/* Season Selector */}
            <div className="flex justify-center mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[250px]">
                <label className="block text-sm font-medium text-white/90 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Select Season
                </label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kuruvai">🌱 Kuruvai (Jun-Sep)</SelectItem>
                    <SelectItem value="samba">🌾 Samba (Aug-Jan)</SelectItem>
                    <SelectItem value="thaladi">🌿 Thaladi (Sep-Feb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Season Overview */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <span className="text-3xl mr-3">{currentSeasonData.emoji}</span>
                  {currentSeasonData.name}
                </h2>
                <p className="text-white/80">{currentSeasonData.period}</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {currentSeasonData.risks.length} Risk Factors
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Risk Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {currentSeasonData.risks.map((risk, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white">
                    <span className="text-2xl mr-3">{risk.icon}</span>
                    {risk.type}
                  </CardTitle>
                  <Badge className={`${getRiskColor(risk.level)} text-white`}>
                    {risk.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-white/90">
                  <span>Risk Level</span>
                  <span className="font-bold">{risk.percentage}%</span>
                </div>
                <Progress value={risk.percentage} className="h-2" />
                
                <p className="text-white/80 text-sm">{risk.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Potential Impacts:</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      {risk.impacts.map((impact, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Mitigation Strategies:</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      {risk.mitigation.map((strategy, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Risk Management Summary</h3>
              <p className="text-slate-300 max-w-3xl mx-auto mb-6">
                The {currentSeasonData.name.toLowerCase()} presents unique challenges for rice cultivation. 
                Proactive risk management through proper planning, variety selection, and timely interventions 
                can significantly reduce potential losses and ensure sustainable production.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400">
                    {currentSeasonData.risks.filter(r => r.level === 'High').length}
                  </div>
                  <div className="text-sm text-slate-300">High Risk Factors</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {currentSeasonData.risks.filter(r => r.level === 'Medium').length}
                  </div>
                  <div className="text-sm text-slate-300">Medium Risk Factors</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(currentSeasonData.risks.reduce((acc, r) => acc + r.percentage, 0) / currentSeasonData.risks.length)}%
                  </div>
                  <div className="text-sm text-slate-300">Average Risk Level</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskAnalysis;