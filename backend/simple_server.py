from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI()

print("Using simplified prediction model based on agricultural parameters.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    district: str
    season: str
    year: int
    temperature: float
    rainfall: float
    humidity: float
    water: float
    fertilizer: float

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/climate-data")
def get_climate_data(district: str = "thanjavur", season: str = "samba", year: int = 2024):
    district_factors = {
        'thanjavur': {'temp_adj': 0, 'rain_adj': 1.2, 'humidity_adj': 5},
        'nagapattinam': {'temp_adj': -1, 'rain_adj': 1.1, 'humidity_adj': 8},
        'tiruvarur': {'temp_adj': 0.5, 'rain_adj': 1.0, 'humidity_adj': 3},
        'cuddalore': {'temp_adj': -0.5, 'rain_adj': 0.9, 'humidity_adj': 6},
        'villupuram': {'temp_adj': 1, 'rain_adj': 0.8, 'humidity_adj': 2},
        'chennai': {'temp_adj': 2, 'rain_adj': 0.7, 'humidity_adj': 4}
    }
    
    district_data = district_factors.get(district.lower(), district_factors['thanjavur'])
    base_temps = [26.5, 28.2, 31.1, 33.8, 35.2, 34.1, 32.8, 32.3, 31.7, 29.8, 27.9, 26.8]
    adjusted_temps = [temp + district_data['temp_adj'] for temp in base_temps]
    base_rainfall = [25, 18, 22, 45, 85, 180, 220, 195, 165, 285, 320, 145]
    adjusted_rainfall = [rain * district_data['rain_adj'] for rain in base_rainfall]
    
    return {
        "district": district.title(),
        "season": season.title(),
        "year": year,
        "climate_metrics": {
            "avg_temperature": round(sum(adjusted_temps) / 12, 1),
            "total_rainfall": round(sum(adjusted_rainfall)),
            "humidity_avg": 76 + district_data['humidity_adj'],
            "wind_speed": 12.5,
            "sunshine_hours": 6.8,
            "rainy_days": round(sum(adjusted_rainfall) / 15)
        }
    }

@app.post("/api/predict")
def predict(req: PredictionRequest):
    try:
        base_yield = 2500
        
        if 25 <= req.temperature <= 30:
            temp_factor = 1.0
        elif req.temperature < 25:
            temp_factor = 0.8 + (req.temperature - 20) * 0.04
        else:
            temp_factor = 1.0 - (req.temperature - 30) * 0.03
        temp_factor = max(0.5, min(1.2, temp_factor))
        
        if 1000 <= req.rainfall <= 1800:
            rain_factor = 1.0
        elif req.rainfall < 1000:
            rain_factor = 0.6 + (req.rainfall / 1000) * 0.4
        else:
            rain_factor = 1.0 - (req.rainfall - 1800) * 0.0002
        rain_factor = max(0.4, min(1.3, rain_factor))
        
        if 70 <= req.humidity <= 85:
            humidity_factor = 1.0
        else:
            humidity_factor = 1.0 - abs(req.humidity - 77.5) * 0.01
        humidity_factor = max(0.7, min(1.1, humidity_factor))
        
        water_factor = 0.7 + (req.water / 100) * 0.4
        water_factor = max(0.7, min(1.1, water_factor))
        
        fertilizer_factor = 0.8 + (req.fertilizer / 100) * 0.3
        fertilizer_factor = max(0.8, min(1.2, fertilizer_factor))
        
        district_factors = {
            'thanjavur': 1.2, 'nagapattinam': 1.15, 'tiruvarur': 1.1,
            'cuddalore': 1.05, 'villupuram': 1.0, 'chengalpattu': 0.95,
            'kanchipuram': 0.95, 'tiruvallur': 0.9, 'chennai': 0.85
        }
        district_factor = district_factors.get(req.district.lower(), 1.0)
        
        season_factors = {'kuruvai': 1.1, 'samba': 1.0, 'thaladi': 0.9}
        season_factor = season_factors.get(req.season.lower(), 1.0)
        
        predicted_yield = (base_yield * temp_factor * rain_factor * 
                         humidity_factor * water_factor * fertilizer_factor * 
                         district_factor * season_factor)
        
        predicted_yield = max(1000, min(6000, predicted_yield))
        
        monthly_weights = [0.03, 0.04, 0.05, 0.08, 0.10, 0.13, 0.15, 0.14, 0.11, 0.07, 0.06, 0.04]
        monthly_yield = [round(predicted_yield * w, 1) for w in monthly_weights]
        
        temp_score = max(0, min(100, 100 - abs(req.temperature - 28) * 3))
        rain_score = max(0, min(100, min(req.rainfall / 15, 100)))
        humidity_score = max(0, min(100, 100 - abs(req.humidity - 77) * 2))
        water_score = max(0, min(100, req.water))
        
        suitability_score = int((temp_score + rain_score + humidity_score + water_score) / 4)
        
        drought_risk = "High" if req.rainfall < 800 and req.water < 60 else "Medium" if req.rainfall < 1200 else "Low"
        heat_risk = "High" if req.temperature > 35 else "Medium" if req.temperature > 32 else "Low"
        flood_risk = "High" if req.rainfall > 2500 else "Medium" if req.rainfall > 2000 else "Low"
        water_risk = "High" if req.water < 30 else "Medium" if req.water < 60 else "Low"
        
        recommendations = []
        if drought_risk != "Low":
            recommendations.append("Consider drought-resistant varieties and efficient irrigation")
        if heat_risk != "Low":
            recommendations.append("Plan for heat stress management during flowering stage")
        if flood_risk != "Low":
            recommendations.append("Ensure proper drainage and avoid waterlogging")
        if req.fertilizer < 40:
            recommendations.append("Consider increasing fertilizer application based on soil test")
        if not recommendations:
            recommendations.append("Conditions are favorable for rice cultivation")
        
        return {
            "yield": round(predicted_yield, 1),
            "monthly_yield": monthly_yield,
            "weather_analysis": {
                "suitability_score": max(0, min(100, suitability_score)),
                "factors": {
                    "temperature": {
                        "score": round(temp_score, 1), 
                        "label": "Optimal" if temp_score > 80 else "Moderate" if temp_score > 60 else "Poor"
                    },
                    "rainfall": {
                        "score": round(rain_score, 1), 
                        "label": "Excellent" if rain_score > 90 else "Good" if rain_score > 70 else "Moderate"
                    },
                    "humidity": {
                        "score": round(humidity_score, 1), 
                        "label": "Favorable" if humidity_score > 75 else "Moderate" if humidity_score > 50 else "Poor"
                    },
                    "water": {
                        "score": round(water_score, 1), 
                        "label": "Secure" if water_score > 70 else "Limited" if water_score > 40 else "Critical"
                    }
                }
            },
            "risk": {
                "drought": drought_risk,
                "heat": heat_risk,
                "flood": flood_risk,
                "water": water_risk
            },
            "recommendations": recommendations
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return {
            "yield": 2500.0,
            "monthly_yield": [75, 100, 125, 200, 250, 325, 375, 350, 275, 175, 150, 100],
            "weather_analysis": {
                "suitability_score": 70, 
                "factors": {
                    "temperature": {"score": 70, "label": "Moderate"},
                    "rainfall": {"score": 70, "label": "Moderate"},
                    "humidity": {"score": 70, "label": "Moderate"},
                    "water": {"score": 70, "label": "Limited"}
                }
            },
            "risk": {"drought": "Medium", "heat": "Medium", "flood": "Low", "water": "Medium"},
            "recommendations": ["Using simplified prediction model. Please check your inputs."]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)