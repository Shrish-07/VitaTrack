import requests
from config import AIRNOW_API_KEY

BASE_URL = "https://www.airnowapi.org/aq/observation/latLong/current/"

def get_air_quality(lat, lon):
    if not lat or not lon:
        raise ValueError("Provide lat and lon")
    params = {
        "format": "application/json",
        "latitude": lat,
        "longitude": lon,
        "distance": 25,
        "API_KEY": AIRNOW_API_KEY
    }
    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()
