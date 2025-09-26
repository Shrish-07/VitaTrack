# backend/config.py

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# API Keys
DISASTER_API_KEY = os.getenv("DISASTER_API_KEY")          # NASA EONET
DIRECTIONS_API_KEY = os.getenv("GEOAPIFY_API_KEY")        # Geoapify API
AIRNOW_API_KEY = os.getenv("AIRNOW_API_KEY")              # AirNow
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")    # OpenWeather
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")              # Gemini AI

# Usage in other modules:
# from config import DISASTER_API_KEY, DIRECTIONS_API_KEY, AIRNOW_API_KEY, OPENWEATHER_API_KEY, GEMINI_API_KEY
