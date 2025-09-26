from flask import Blueprint, jsonify, request
import requests
from config import OPENWEATHER_API_KEY

weather_bp = Blueprint("weather_bp", __name__)
BASE_URL = "http://api.openweathermap.org/data/2.5"

@weather_bp.route("/api/weather/current", methods=["GET"])
def get_current_weather():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    params = {"appid": OPENWEATHER_API_KEY, "units": "metric"}
    if city:
        params["q"] = city
    elif lat and lon:
        params["lat"] = lat
        params["lon"] = lon
    else:
        return jsonify({"error": "Provide city or lat/lon"}), 400

    response = requests.get(f"{BASE_URL}/weather", params=params)
    return jsonify(response.json())

@weather_bp.route("/api/weather/forecast", methods=["GET"])
def get_weather_forecast():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    params = {"appid": OPENWEATHER_API_KEY, "units": "metric"}
    if city:
        params["q"] = city
    elif lat and lon:
        params["lat"] = lat
        params["lon"] = lon
    else:
        return jsonify({"error": "Provide city or lat/lon"}), 400

    response = requests.get(f"{BASE_URL}/forecast", params=params)
    return jsonify(response.json())
