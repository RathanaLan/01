import os
import sys
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from sharepoint_manager import SharePointManager, GraphApiError

app = Flask(__name__, template_folder="templates", static_folder="static")
sp_manager = SharePointManager()

# Ensure schema on app start
try:
    print("[INIT] Verifying SharePoint lists and schema per SHAREPOINT-CONNECTION...")
    schema_status = sp_manager.ensure_all_lists()
    print("[INIT] Schema status:", schema_status)
except Exception as e:
    print(f"[WARN] SharePoint initialization error: {e}", file=sys.stderr)


# -------------------------------------------------------------
# Frontend Route
# -------------------------------------------------------------
@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


@app.route("/")
def index():
    return render_template("index.html")


# -------------------------------------------------------------
# API Routes
# -------------------------------------------------------------
@app.route("/api/me", methods=["GET"])
def get_current_user():
    try:
        profile = sp_manager.get_current_user_profile()
        return jsonify({"success": True, "user": profile})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/status", methods=["GET"])
def get_status():
    try:
        site_id = sp_manager.resolve_site_id()
        existing = sp_manager.get_existing_lists()
        return jsonify({
            "status": "connected",
            "hostname": sp_manager.hostname,
            "site_path": sp_manager.site_path,
            "site_id": site_id,
            "lists": {
                "Room_List": existing.get("Room_List"),
                "Equipment_List": existing.get("Equipment_List"),
                "Room_Bookings": existing.get("Room_Bookings")
            }
        })
    except GraphApiError as ge:
        return jsonify({"status": "error", "message": str(ge)}), 502
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/api/schema/verify", methods=["POST"])
def verify_schema():
    try:
        report = sp_manager.ensure_all_lists()
        return jsonify({"success": True, "report": report})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# --- ROOMS ---
@app.route("/api/rooms", methods=["GET"])
def list_rooms():
    try:
        rooms = sp_manager.get_rooms()
        return jsonify({"success": True, "rooms": rooms})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/rooms", methods=["POST"])
def create_room():
    try:
        data = request.json or {}
        if not data.get("name") or not data.get("room_code"):
            return jsonify({"success": False, "error": "Room name and room code are required"}), 400
        
        result = sp_manager.create_room(data)
        return jsonify({"success": True, "room": result})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/rooms/<item_id>", methods=["PATCH"])
def update_room(item_id):
    try:
        data = request.json or {}
        sp_manager.update_room(item_id, data)
        return jsonify({"success": True})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/rooms/<item_id>", methods=["DELETE"])
def delete_room(item_id):
    try:
        success = sp_manager.delete_room(item_id)
        return jsonify({"success": success})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# --- EQUIPMENT ---
@app.route("/api/equipment", methods=["GET"])
def list_equipment():
    try:
        equipment = sp_manager.get_equipment()
        return jsonify({"success": True, "equipment": equipment})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/equipment", methods=["POST"])
def create_equipment():
    try:
        data = request.json or {}
        if not data.get("name"):
            return jsonify({"success": False, "error": "Equipment name is required"}), 400
        
        result = sp_manager.create_equipment(data)
        return jsonify({"success": True, "equipment": result})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# --- BOOKINGS ---
@app.route("/api/bookings", methods=["GET"])
def list_bookings():
    try:
        date_str = request.args.get("date")
        room_code = request.args.get("room_code")
        bookings = sp_manager.get_bookings(date_str=date_str, room_code=room_code)
        return jsonify({"success": True, "bookings": bookings})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    try:
        data = request.json or {}
        required = ["title", "room_code", "room_name", "booked_by", "date", "start_time", "end_time"]
        for field in required:
            if not data.get(field):
                return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400
        
        if data["start_time"] >= data["end_time"]:
            return jsonify({"success": False, "error": "End time must be after start time"}), 400

        result = sp_manager.create_booking(data)
        return jsonify({"success": True, "booking": result})
    except ValueError as val_err:
        return jsonify({"success": False, "error": str(val_err), "is_conflict": True}), 409
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/bookings/<item_id>/cancel", methods=["POST"])
def cancel_booking(item_id):
    try:
        success = sp_manager.cancel_booking(item_id)
        return jsonify({"success": success})
    except GraphApiError as ge:
        return jsonify({"success": False, "error": str(ge)}), 502
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n=======================================================")
    print(f" DENSO FY30 SMART ROOM BOOKING SYSTEM (Graph API Compliant)")
    print(f" Running at: http://127.0.0.1:{port}")
    print(f" Note: Auto-reload enabled on file edits.")
    print(f"=======================================================\n")
    app.run(host="0.0.0.0", port=port, debug=True)
