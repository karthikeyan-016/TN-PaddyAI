from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# ---------- Config ----------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "rice_yield_model_xgb.pkl")
# If your model is named differently, change the above line.
# -----------------------------

app = FastAPI(title="Tamil Nadu Rice Yield Prediction API")

# Allow frontend (Vite dev server + any origin for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
def load_model():
    global model
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    model = joblib.load(MODEL_PATH)
    print("✅ Loaded model from", MODEL_PATH)


# ---------- Request / Response Schemas ----------

class PredictionRequest(BaseModel):
    district: str
    season: str          # "kuruvai", "samba", "thaladi" from frontend
    year: int
    temperature: float   # °C
    rainfall: float      # mm
    humidity: float      # %
    water: float         # % (water availability / irrigation)
    fertilizer: float    # 0–100 slider


class PredictionResultWeatherFactor(BaseModel):
    score: float
    label: str


class PredictionResponse(BaseModel):
    # Matches PredictionResult interface in PredictionDashboard.tsx
    yield_: float
    monthly_yield: list[float]
    weather_analysis: dict
    risk: dict
    recommendations: list[str]


# Helper: district-based area guess
DELTA_DISTRICTS = {"Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai"}

def estimate_area_ha(district: str) -> float:
    if district in DELTA_DISTRICTS:
        return 80000.0   # higher rice area in delta
    return 30000.0       # generic value for others


def map_season(season_raw: str) -> str:
    season_raw = season_raw.lower().strip()
    mapping = {
        "kuruvai": "Kuruvai",
        "samba": "Samba",
        "thaladi": "Navarai",  # approximate mapping
    }
    return mapping.get(season_raw, "Samba")


def compute_suitability(temp: float, rainfall: float, water: float, humidity: float) -> int:
    # Simple heuristic scoring
    score = 0

    # Temperature ideal ~ 25–32
    if 25 <= temp <= 32:
        score += 30
    elif 22 <= temp <= 35:
        score += 20
    else:
        score += 10

    # Rainfall ideal ~ 900–1500 mm
    if 900 <= rainfall <= 1500:
        score += 30
    elif 700 <= rainfall <= 2000:
        score += 20
    else:
        score += 10

    # Water (irrigation)
    if water >= 75:
        score += 25
    elif water >= 50:
        score += 15
    else:
        score += 5

    # Humidity (loose effect)
    if 60 <= humidity <= 85:
        score += 15
    else:
        score += 8

    return max(0, min(100, int(score)))


def qualitative_label(score: float, good: str = "Good", moderate: str = "Moderate", poor: str = "Poor") -> str:
    if score >= 70:
        return good
    elif score >= 40:
        return moderate
    else:
        return poor


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/predict")
def predict(req: PredictionRequest):
    # Normalize district string to Title Case to match training data
    district = req.district.strip()
    if district:
        district = district[0].upper() + district[1:]

    # Map season string to training season categories
    season = map_season(req.season)

    # Build feature row with same columns as training dataset
    area_ha = estimate_area_ha(district)
    baseline_yield = 4000.0  # kg/ha, rough baseline
    production_tonnes = area_ha * baseline_yield / 1000.0

    rainfall_mm = req.rainfall
    max_temp_c = req.temperature
    min_temp_c = req.temperature - 5.0

    irrigation_percent = req.water
    # Map fertilizer slider (0–100) to ~70–250 kg/ha range
    fertilizer_kg_per_ha = 70.0 + (req.fertilizer / 100.0) * (250.0 - 70.0)

    # Create DataFrame exactly with training dataset columns
    data = {
        "year": [req.year],
        "district": [district],
        "season": [season],
        "area_ha": [area_ha],
        "production_tonnes": [production_tonnes],
        "rainfall_mm": [rainfall_mm],
        "max_temp_c": [max_temp_c],
        "min_temp_c": [min_temp_c],
        "irrigation_percent": [irrigation_percent],
        "fertilizer_kg_per_ha": [fertilizer_kg_per_ha]
    }

    X = pd.DataFrame(data)

    # Predict yield
    y_pred = float(model.predict(X)[0])  # kg per hectare
    
    # Ensure yield is positive and realistic (minimum 1000 kg/ha, maximum 8000 kg/ha)
    y_pred = max(1000.0, min(8000.0, abs(y_pred)))

    # Build monthly yield profile (just an illustrative seasonal curve)
    # Higher yield in core cropping months
    # Simple 12-month distribution that sums to ~predicted yield
    monthly_weights = [0.03, 0.04, 0.05, 0.08, 0.10, 0.13, 0.15, 0.14, 0.11, 0.07, 0.06, 0.04]
    monthly_yield = [round(y_pred * w, 2) for w in monthly_weights]

    # Weather suitability and factors
    suitability_score = compute_suitability(req.temperature, req.rainfall, req.water, req.humidity)

    temp_score = max(0, min(100, 100 - abs(req.temperature - 29) * 4))
    rain_score = max(0, min(100, 100 - abs(req.rainfall - 1200) * 0.05))
    humid_score = max(0, min(100, 100 - abs(req.humidity - 75) * 2))
    water_score = max(0, min(100, req.water))

    weather_analysis = {
        "suitability_score": suitability_score,
        "factors": {
            "temperature": {
                "score": round(temp_score, 1),
                "label": qualitative_label(temp_score, "Optimal", "Manageable", "Stressful"),
            },
            "rainfall": {
                "score": round(rain_score, 1),
                "label": qualitative_label(rain_score, "Well distributed", "Variable", "Inadequate"),
            },
            "humidity": {
                "score": round(humid_score, 1),
                "label": qualitative_label(humid_score, "Favorable", "Mixed", "Unfavorable"),
            },
            "water": {
                "score": round(water_score, 1),
                "label": qualitative_label(water_score, "Secure", "Cautious", "Insufficient"),
            },
        },
    }

    # Risk levels based on simple thresholds
    drought_risk = "High" if req.rainfall < 700 and req.water < 60 else ("Moderate" if req.rainfall < 900 else "Low")
    heat_risk = "High" if req.temperature > 36 else ("Moderate" if req.temperature > 32 else "Low")
    flood_risk = "High" if req.rainfall > 2000 else ("Moderate" if req.rainfall > 1500 else "Low")
    water_risk = "High" if req.water < 40 else ("Moderate" if req.water < 70 else "Low")

    risk = {
        "drought": drought_risk,
        "heat": heat_risk,
        "flood": flood_risk,
        "water": water_risk,
    }

    # Simple text recommendations
    recommendations = []

    if drought_risk != "Low":
        recommendations.append(
            "Plan for drought-resilient varieties and staggered irrigation to reduce moisture stress."
        )
    if heat_risk != "Low":
        recommendations.append(
            "Avoid peak heat stress by adjusting sowing window and ensuring adequate water during flowering."
        )
    if flood_risk != "Low":
        recommendations.append(
            "Improve drainage in low-lying fields and avoid excess standing water during heavy rains."
        )
    if req.fertilizer < 40:
        recommendations.append(
            "Current fertilizer input seems low; review NPK recommendation for your soil test results."
        )
    if not recommendations:
        recommendations.append(
            "Conditions are generally favorable. Maintain timely irrigation and recommended fertilizer schedule."
        )

    # Response shaped for frontend PredictionResult
    return {
        "yield": round(y_pred, 2),
        "monthly_yield": monthly_yield,
        "weather_analysis": weather_analysis,
        "risk": risk,
        "recommendations": recommendations,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
