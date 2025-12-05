import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface PredictionFormProps {
  onPredict: (data: any) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    district: "",
    season: "",
    year: 2024,
    temperature: 28,
    rainfall: 1000,
    humidity: 70,
    water: 75,
    fertilizer: 50,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <Card className="glass-card p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6 text-primary">{t.prediction.inputs}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* District */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">{t.prediction.district}</Label>
          <Select value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder={t.prediction.district} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border max-h-64">
              {t.districts.map((district: string) => (
                <SelectItem key={district} value={district} className="text-base">
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Season */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">{t.prediction.season}</Label>
          <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder={t.prediction.season} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="samba">{t.seasons.samba}</SelectItem>
              <SelectItem value="kuruvai">{t.seasons.kuruvai}</SelectItem>
              <SelectItem value="thaladi">{t.seasons.thaladi}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">{t.prediction.year}</Label>
          <Select value={formData.year.toString()} onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}>
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border max-h-64">
              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t.prediction.temperature}</Label>
            <span className="text-primary font-bold">{formData.temperature}°C</span>
          </div>
          <Slider
            value={[formData.temperature]}
            onValueChange={([value]) => setFormData({ ...formData, temperature: value })}
            min={15}
            max={45}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Rainfall */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t.prediction.rainfall}</Label>
            <span className="text-primary font-bold">{formData.rainfall} mm</span>
          </div>
          <Slider
            value={[formData.rainfall]}
            onValueChange={([value]) => setFormData({ ...formData, rainfall: value })}
            min={0}
            max={3000}
            step={50}
            className="cursor-pointer"
          />
        </div>

        {/* Humidity */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t.prediction.humidity}</Label>
            <span className="text-primary font-bold">{formData.humidity}%</span>
          </div>
          <Slider
            value={[formData.humidity]}
            onValueChange={([value]) => setFormData({ ...formData, humidity: value })}
            min={0}
            max={100}
            step={5}
            className="cursor-pointer"
          />
        </div>

        {/* Water Availability */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t.prediction.water}</Label>
            <span className="text-primary font-bold">{formData.water}%</span>
          </div>
          <Slider
            value={[formData.water]}
            onValueChange={([value]) => setFormData({ ...formData, water: value })}
            min={0}
            max={100}
            step={5}
            className="cursor-pointer"
          />
        </div>

        {/* Fertilizer */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t.prediction.fertilizer}</Label>
            <span className="text-primary font-bold">{formData.fertilizer}%</span>
          </div>
          <Slider
            value={[formData.fertilizer]}
            onValueChange={([value]) => setFormData({ ...formData, fertilizer: value })}
            min={0}
            max={100}
            step={5}
            className="cursor-pointer"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold emerald-glow"
          disabled={isLoading || !formData.district || !formData.season}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            t.prediction.predict_button
          )}
        </Button>
      </form>
    </Card>
  );
};

export default PredictionForm;
