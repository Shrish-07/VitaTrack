# backend/routes/metrics_routes.py
from flask import Blueprint, request, jsonify
import requests

# Define Blueprint (no url_prefix here, it's added in app.py)
metrics_bp = Blueprint('metrics', __name__)

# API Keys
OPENWEATHER_API_KEY = "d8f74cc22f35aed3b07c8f47c6d7f6d1"
AIRNOW_API_KEY = "B11FBD4A-B70D-4288-888D-5B39C19CF64D"

# In-memory user metrics
user_metrics = {
    "hydration": 32,       # oz
    "hydration_goal": 64,  # oz
    "steps": 5200,
    "mental_health": "Good"
}

# Helper functions
def get_weather_and_uv(zip_code):
    try:
        # Get weather data
        weather_res = requests.get(
            f"https://api.openweathermap.org/data/2.5/weather?zip={zip_code}&units=imperial&appid={OPENWEATHER_API_KEY}"
        )
        weather_json = weather_res.json()
        temp = weather_json["main"]["temp"]
        description = weather_json["weather"][0]["description"]
        lat = weather_json["coord"]["lat"]
        lon = weather_json["coord"]["lon"]

        # New UV endpoint (One Call API 3.0)
        uv_res = requests.get(
            f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily,alerts&appid={OPENWEATHER_API_KEY}"
        )
        uv_json = uv_res.json()
        uv_index = uv_json.get("current", {}).get("uvi", None)

        return {"temp": temp, "description": description}, uv_index
    except Exception as e:
        print("Weather/UV API error:", e)
        return None, None

def get_air_quality(zip_code):
    try:
        res = requests.get(
            f"https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode={zip_code}&distance=25&API_KEY={AIRNOW_API_KEY}"
        )
        data = res.json()
        if data:
            return data[0]["AQI"]
        return None
    except Exception as e:
        print("Air Quality API error:", e)
        return None

def get_recent_disasters(limit=5):
    try:
        res = requests.get("https://eonet.gsfc.nasa.gov/api/v3/events")
        events = res.json().get("events", [])
        return [
            {"title": e["title"], "categories": [c["title"] for c in e["categories"]]}
            for e in events[:limit]
        ]
    except Exception as e:
        print("Disaster API error:", e)
        return []

# GET all metrics
@metrics_bp.route('/', methods=['GET'])
def get_metrics():
    zip_code = request.args.get("zip", "")
    if not zip_code or len(zip_code) != 5:
        return jsonify({"error": "Please provide a valid 5-digit ZIP code"}), 400

    weather_data, uv_index = get_weather_and_uv(zip_code)
    air_quality = get_air_quality(zip_code)
    disasters = get_recent_disasters(limit=5)

    response = {
        "hydration": {"value": user_metrics["hydration"], "goal": user_metrics["hydration_goal"]},
        "steps": user_metrics["steps"],
        "mental_health": user_metrics["mental_health"],
        "weather": weather_data,
        "uvIndex": uv_index,  # use camelCase for React
        "air_quality": air_quality,
        "disasters": disasters
    }
    return jsonify(response), 200

# POST update
@metrics_bp.route('/update', methods=['POST'])
def update_metrics():
    data = request.json
    for key in ['hydration', 'hydration_goal', 'steps', 'mental_health']:
        if key in data:
            user_metrics[key] = data[key]
    return jsonify({"message": "Metrics updated successfully", "metrics": user_metrics}), 200

# POST reset
@metrics_bp.route('/reset', methods=['POST'])
def reset_metrics():
    global user_metrics
    user_metrics = {
        "hydration": 32,
        "hydration_goal": 64,
        "steps": 5200,
        "mental_health": "Good"
    }
    return jsonify({"message": "Metrics reset to default", "metrics": user_metrics}), 200
