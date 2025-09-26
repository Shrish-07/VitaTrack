import requests
from config import GEMINI_API_KEY

BASE_URL = "https://api.gemini.com/v1/chat"

def get_chatbot_response(message):
    if not message:
        raise ValueError("Provide a message")
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    payload = {"input": message}
    response = requests.post(BASE_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()
