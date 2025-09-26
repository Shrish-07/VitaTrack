# backend/routes/directions_routes.py

from flask import Blueprint, jsonify, request
from utils.directions import get_directions

directions_bp = Blueprint("directions_bp", __name__)

@directions_bp.route("/api/directions", methods=["GET"])
def directions():
    """
    Query params:
        start: "lat,lon"
        end: "lat,lon"
    """
    start = request.args.get("start")
    end = request.args.get("end")
    if not start or not end:
        return jsonify({"error": "Provide start and end coordinates"}), 400

    try:
        data = get_directions(start, end)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
