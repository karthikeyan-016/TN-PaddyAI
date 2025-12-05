import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudRain, Thermometer, Droplets, Wind, Sun, AlertTriangle } from "lucide-react";

const ClimateInsights = () => {
  const [district, setDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [year, setYear] = useState("2024");
  const [results, setResults] = useState(null);

  const districts = [
    "Chennai", "Thanjavur", "Coimbatore", "Madurai", "Salem", "Tirunelveli",
    "Vellore", "Erode", "Dindigul", "Tiruppur", "Karur", "Nagapattinam"
  ];

  const seasons = [
    { value: "kuruvai", label: "Kuruvai (Jun-Sep)" },
    { value: "samba", label: "Samba (Aug-Jan)" },
    { value: "thaladi", label: "Thaladi (Sep-Feb)" }
  ];

  const generateClimateData = () => {
    if (!district || !season) {
      alert("Please select district and season");
      return;
    }

    // Generate dynamic data based on inputs
    const baseTemp = district === "Chennai" ? 32 : district === "Thanjavur" ? 30 : 28;
    const baseRainfall = season === "samba" ? 1200 : season === "kuruvai" ? 800 : 600;
    const baseHumidity = district.includes("Chennai") ? 85 : 75;

    const climateData = {
      district,
      season,
      year,
      temperature: baseTemp + Math.random() * 4 - 2,
      rainfall: baseRainfall + Math.random() * 400 - 200,
      humidity: baseHumidity + Math.random() * 20 - 10,
      windSpeed: 10 + Math.random() * 10,
      sunshineHours: 6 + Math.random() * 3,
      suitability: Math.floor(60 + Math.random() * 30),
      risks: {
        drought: baseRainfall < 700 ? "High" : baseRainfall < 1000 ? "Medium" : "Low",
        flood: baseRainfall > 1500 ? "High" : baseRainfall > 1200 ? "Medium" : "Low",
        heat: baseTemp > 33 ? "High" : baseTemp > 30 ? "Medium" : "Low"
      }
    };

    setResults(climateData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Climate Insights
          </h1>
          <p className="text-muted-foreground">
            Get climate analysis based on district and season selection
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="district">District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="season">Season</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="2020"
                  max="2030"
                />
              </div>

              <div className="flex items-end">
                <Button onClick={generateClimateData} className="w-full">
                  Analyze Climate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <>
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    📍 {results.district} District - {results.season.charAt(0).toUpperCase() + results.season.slice(1)} Season {results.year}
                  </h2>
                  <p className="text-blue-100">Climate Suitability Score: {results.suitability}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Climate Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                <CardContent className="p-6">
                  <Thermometer className="w-8 h-8 mb-2" />
                  <p className="text-sm opacity-90">Temperature</p>
                  <p className="text-2xl font-bold">{results.temperature.toFixed(1)}°C</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <CloudRain className="w-8 h-8 mb-2" />
                  <p className="text-sm opacity-90">Rainfall</p>
                  <p className="text-2xl font-bold">{results.rainfall.toFixed(0)}mm</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                <CardContent className="p-6">
                  <Droplets className="w-8 h-8 mb-2" />
                  <p className="text-sm opacity-90">Humidity</p>
                  <p className="text-2xl font-bold">{results.humidity.toFixed(0)}%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-500 to-slate-600 text-white">
                <CardContent className="p-6">
                  <Wind className="w-8 h-8 mb-2" />
                  <p className="text-sm opacity-90">Wind Speed</p>
                  <p className="text-2xl font-bold">{results.windSpeed.toFixed(1)} km/h</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                <CardContent className="p-6">
                  <Sun className="w-8 h-8 mb-2" />
                  <p className="text-sm opacity-90">Sunshine</p>
                  <p className="text-2xl font-bold">{results.sunshineHours.toFixed(1)}h/day</p>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">Drought Risk</span>
                      <span className={`font-bold ${results.risks.drought === 'High' ? 'text-red-600' : results.risks.drought === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
                        {results.risks.drought}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">Flood Risk</span>
                      <span className={`font-bold ${results.risks.flood === 'High' ? 'text-red-600' : results.risks.flood === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
                        {results.risks.flood}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">Heat Stress</span>
                      <span className={`font-bold ${results.risks.heat === 'High' ? 'text-red-600' : results.risks.heat === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
                        {results.risks.heat}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.suitability > 80 && (
                      <p className="text-green-600">✓ Excellent conditions for rice cultivation</p>
                    )}
                    {results.suitability > 60 && results.suitability <= 80 && (
                      <p className="text-orange-600">→ Good conditions with some precautions needed</p>
                    )}
                    {results.suitability <= 60 && (
                      <p className="text-red-600">⚠ Challenging conditions, consider risk mitigation</p>
                    )}
                    
                    {results.risks.drought === 'High' && (
                      <p className="text-red-600">• Implement water conservation measures</p>
                    )}
                    {results.risks.flood === 'High' && (
                      <p className="text-blue-600">• Ensure proper drainage systems</p>
                    )}
                    {results.risks.heat === 'High' && (
                      <p className="text-orange-600">• Use heat-resistant rice varieties</p>
                    )}
                    
                    <p className="text-gray-600">• Monitor weather forecasts regularly</p>
                    <p className="text-gray-600">• Adjust irrigation schedule based on rainfall</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClimateInsights;