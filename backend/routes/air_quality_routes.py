from flask import Blueprint, jsonify, request
import requests
from config import AIRNOW_API_KEY

air_bp = Blueprint("air_bp", __name__)
BASE_URL = "https://www.airnowapi.org/aq/observation/latLong/current/"

@air_bp.route("/api/air_quality", methods=["GET"])
def get_air_quality():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    if not lat or not lon:
        return jsonify({"error": "Provide lat and lon"}), 400

    params = {
        "format": "application/json",
        "latitude": lat,
        "longitude": lon,
        "distance": 25,
        "API_KEY": AIRNOW_API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    return jsonify(response.json())
