from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="Tamil Nadu Rice Yield Test API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.post("/api/predict")
def predict(req: PredictionRequest):
    # Simple formula that varies based on inputs
    base_yield = 3000
    
    # Temperature effect (optimal around 28-30°C)
    temp_factor = 1.0
    if 28 <= req.temperature <= 30:
        temp_factor = 1.2
    elif req.temperature > 35:
        temp_factor = 0.8
    elif req.temperature < 20:
        temp_factor = 0.7
    
    # Rainfall effect (optimal around 1000-1500mm)
    rain_factor = 1.0
    if 1000 <= req.rainfall <= 1500:
        rain_factor = 1.3
    elif req.rainfall < 500:
        rain_factor = 0.6
    elif req.rainfall > 2000:
        rain_factor = 0.9
    
    # Water availability effect
    water_factor = 0.5 + (req.water / 100.0) * 0.8
    
    # Fertilizer effect
    fert_factor = 0.7 + (req.fertilizer / 100.0) * 0.6
    
    # District effect (delta districts get bonus)
    district_factor = 1.0
    delta_districts = ["thanjavur", "tiruvarur", "nagapattinam", "mayiladuthurai"]
    if req.district.lower() in delta_districts:
        district_factor = 1.15
    
    # Season effect
    season_factor = 1.0
    if req.season.lower() == "samba":
        season_factor = 1.1
    elif req.season.lower() == "kuruvai":
        season_factor = 0.95
    
    # Calculate final yield
    yield_value = base_yield * temp_factor * rain_factor * water_factor * fert_factor * district_factor * season_factor
    
    # Add some randomness but keep it realistic
    yield_value = yield_value * (0.9 + random.random() * 0.2)
    yield_value = max(1500, min(6000, yield_value))  # Clamp between realistic values
    
    # Monthly distribution
    monthly_weights = [0.03, 0.04, 0.05, 0.08, 0.10, 0.13, 0.15, 0.14, 0.11, 0.07, 0.06, 0.04]
    monthly_yield = [round(yield_value * w, 2) for w in monthly_weights]
    
    # Weather analysis
    temp_score = max(0, min(100, 100 - abs(req.temperature - 29) * 3))
    rain_score = max(0, min(100, 100 - abs(req.rainfall - 1200) * 0.04))
    humid_score = max(0, min(100, 100 - abs(req.humidity - 75) * 1.5))
    water_score = req.water
    
    suitability = (temp_score + rain_score + humid_score + water_score) / 4
    
    return {
        "yield": round(yield_value, 2),
        "monthly_yield": monthly_yield,
        "weather_analysis": {
            "suitability_score": round(suitability, 1),
            "factors": {
                "temperature": {"score": round(temp_score, 1), "label": "Good" if temp_score > 70 else "Fair"},
                "rainfall": {"score": round(rain_score, 1), "label": "Good" if rain_score > 70 else "Fair"},
                "humidity": {"score": round(humid_score, 1), "label": "Good" if humid_score > 70 else "Fair"},
                "water": {"score": round(water_score, 1), "label": "Good" if water_score > 70 else "Fair"}
            }
        },
        "risk": {
            "drought": "High" if req.rainfall < 600 else "Low",
            "heat": "High" if req.temperature > 35 else "Low",
            "flood": "High" if req.rainfall > 2000 else "Low",
            "water": "High" if req.water < 40 else "Low"
        },
        "recommendations": [
            f"Predicted yield: {round(yield_value, 2)} kg/ha based on your inputs",
            "Adjust irrigation based on rainfall patterns",
            "Monitor temperature during critical growth stages"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)