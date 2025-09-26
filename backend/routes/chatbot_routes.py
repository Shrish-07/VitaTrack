# backend/routes/chatbot_routes.py
from flask import Blueprint, jsonify, request
import requests
from config import GEMINI_API_KEY

chatbot_bp = Blueprint("chatbot_bp", __name__)
BASE_URL = "https://api.gemini.com/v1/chat"

# POST route for sending messages
@chatbot_bp.route("/api/chatbot", methods=["POST"])
def chat():
    """
    Accepts user input and returns AI response from Gemini API
    Request body: { "message": "Hello!" }
    """
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"error": "Provide a message"}), 400

    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    payload = {"input": user_message}

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional GET route for testing if the endpoint is reachable
@chatbot_bp.route("/api/chatbot", methods=["GET"])
def chatbot_test():
    return jsonify({"message": "Chatbot route is working! Use POST to send messages."})
