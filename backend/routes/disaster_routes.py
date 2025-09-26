from flask import Blueprint, jsonify, request
from utils.disaster import fetch_disasters, fetch_disaster_by_id

disaster_bp = Blueprint("disaster_bp", __name__)

@disaster_bp.route("/api/disasters", methods=["GET"])
def disasters():
    limit = request.args.get("limit", 20)
    try:
        data = fetch_disasters(limit)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@disaster_bp.route("/api/disasters/<event_id>", methods=["GET"])
def disaster(event_id):
    try:
        data = fetch_disaster_by_id(event_id)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
