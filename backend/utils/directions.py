# backend/utils/directions.py

import requests
from config import DIRECTIONS_API_KEY

BASE_URL = "https://api.geoapify.com/v1/routing"

def get_directions(start_coords, end_coords):
    """
    Fetches route directions from Geoapify API.
    start_coords & end_coords: strings in "lat,lon" format
    """
    if not start_coords or not end_coords:
        raise ValueError("Provide start and end coordinates")

    waypoints = f"{start_coords}|{end_coords}"
    params = {
        "waypoints": waypoints,
        "mode": "drive",
        "apiKey": DIRECTIONS_API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()
