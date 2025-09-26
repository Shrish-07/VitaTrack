import requests
from config import DISASTER_API_KEY

BASE_URL = "https://eonet.gsfc.nasa.gov/api/v3/events"

def fetch_disasters(limit=20):
    params = {"status": "open", "limit": limit}
    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()

def fetch_disaster_by_id(event_id):
    url = f"{BASE_URL}/{event_id}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
