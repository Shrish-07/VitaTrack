# backend/app.py
from flask import Flask
from flask_cors import CORS  # <-- add this
from config import (
    DISASTER_API_KEY,
    DIRECTIONS_API_KEY,
    AIRNOW_API_KEY,
    OPENWEATHER_API_KEY,
    GEMINI_API_KEY
)

# Import route modules
from routes.disaster_routes import disaster_bp
from routes.weather_routes import weather_bp
from routes.air_quality_routes import air_bp
from routes.directions_routes import directions_bp
from routes.chatbot_routes import chatbot_bp
from routes.metrics_routes import metrics_bp

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # <-- enable CORS for all routes

# Register Blueprints
app.register_blueprint(disaster_bp, url_prefix='/disaster')
app.register_blueprint(weather_bp, url_prefix='/weather')
app.register_blueprint(air_bp, url_prefix='/airquality')
app.register_blueprint(directions_bp, url_prefix='/directions')
app.register_blueprint(chatbot_bp, url_prefix='/chatbot')
app.register_blueprint(metrics_bp, url_prefix='/api/metrics')

# Root route
@app.route("/")
def home():
    return {"message": "SHProject API is running!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
