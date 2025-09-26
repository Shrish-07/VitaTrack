import requests
from config import OPENWEATHER_API_KEY

BASE_URL = "http://api.openweathermap.org/data/2.5"

def fetch_current_weather(city=None, lat=None, lon=None):
    if not city and (not lat or not lon):
        raise ValueError("Provide city or lat/lon")
    params = {"appid": OPENWEATHER_API_KEY, "units": "metric"}
    if city:
        params["q"] = city
    else:
        params["lat"] = lat
        params["lon"] = lon
    response = requests.get(f"{BASE_URL}/weather", params=params)
    response.raise_for_status()
    return response.json()

def fetch_weather_forecast(city=None, lat=None, lon=None):
    if not city and (not lat or not lon):
        raise ValueError("Provide city or lat/lon")
    params = {"appid": OPENWEATHER_API_KEY, "units": "metric"}
    if city:
        params["q"] = city
    else:
        params["lat"] = lat
        params["lon"] = lon
    response = requests.get(f"{BASE_URL}/forecast", params=params)
    response.raise_for_status()
    return response.json()
