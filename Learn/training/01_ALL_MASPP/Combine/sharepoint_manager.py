import os
import sys
import time
import requests
import msal
from dotenv import load_dotenv

# Load environment without accessing/opening .env directly
load_dotenv()


class GraphApiError(Exception):
    """Custom exception representing a Microsoft Graph API failure (HTTP 502)."""
    def __init__(self, message, status_code=502):
        super().__init__(message)
        self.status_code = status_code


class SharePointManager:
    def __init__(self):
        self.tenant_id = os.getenv("TENANT_ID") or os.getenv("SHAREPOINT_TENANT_ID", "").strip()
        self.client_id = os.getenv("CLIENT_ID") or os.getenv("SHAREPOINT_CLIENT_ID", "").strip()
        self.client_secret = os.getenv("CLIENT_SECRET") or os.getenv("SHAREPOINT_CLIENT_SECRET", "").strip()
        
        # Authentication mode: Default to 'app' (Client Secret) to bypass interactive login blocks (AADSTS50105)
        self.auth_mode = os.getenv("AUTH_MODE", "app").lower().strip()

        # Support full SHAREPOINT_SITE_URL or HOSTNAME + SITE_PATH
        full_site_url = os.getenv("SHAREPOINT_SITE_URL", "")
        if full_site_url:
            clean_url = full_site_url.replace("https://", "").replace("http://", "").strip("/")
            parts = clean_url.split("/", 1)
            self.hostname = parts[0]
            self.site_path = "/" + parts[1] if len(parts) > 1 else ""
        else:
            raw_hostname = os.getenv("SHAREPOINT_HOSTNAME", "globaldenso.sharepoint.com").strip()
            self.hostname = raw_hostname.replace("https://", "").replace("http://", "").strip("/")
            raw_site_path = os.getenv("SHAREPOINT_SITE_PATH", "/sites/AP000022/Radiator/Testing_Site").strip()
            self.site_path = "/" + raw_site_path.strip("/") if raw_site_path else ""

        self.site_id = None
        self.token = None
        self.token_expiry = 0
        self.user_profile = None

        # Local token cache for delegated user login
        self.cache_file = ".msal_cache.bin"
        self.token_cache = msal.SerializableTokenCache()
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r") as f:
                    self.token_cache.deserialize(f.read())
            except Exception:
                pass

        # Snapshot cache (per SHAREPOINT-CONNECTION Section 7.7)
        self.cache_ttl = float(os.getenv("SHAREPOINT_CACHE_TTL", 3000)) / 1000.0
        self._cache = {
            "rooms": {"timestamp": 0, "data": []},
            "equipment": {"timestamp": 0, "data": []},
            "bookings": {"timestamp": 0, "data": []}
        }

        self.list_ids = {
            "Room_List": None,
            "Equipment_List": None,
            "Room_Bookings": None
        }

    def _save_token_cache(self):
        """Persists the token cache so the user doesn't have to sign in every time."""
        if self.token_cache.has_state_changed:
            try:
                with open(self.cache_file, "w") as f:
                    f.write(self.token_cache.serialize())
            except Exception:
                pass

    def invalidate_cache(self, category=None):
        """Invalidates cache on write operations."""
        if category and category in self._cache:
            self._cache[category]["timestamp"] = 0
        else:
            for k in self._cache:
                self._cache[k]["timestamp"] = 0

    def get_token(self):
        """Acquires token: either Interactive User Sign-In (Delegated) or Client Secret (App)."""
        if self.auth_mode == "user":
            return self._get_delegated_user_token()
        else:
            return self._get_app_token()

    def _get_delegated_user_token(self):
        """
        Interactive User Authentication:
        Uses MSAL PublicClientApplication so SharePoint records the real logged-in
        human user in 'Created By' and 'Modified By'.
        """
        authority = f"https://login.microsoftonline.com/{self.tenant_id}"
        scopes = [
            "https://graph.microsoft.com/Sites.ReadWrite.All",
            "https://graph.microsoft.com/User.Read"
        ]

        app = msal.PublicClientApplication(
            self.client_id,
            authority=authority,
            token_cache=self.token_cache
        )

        # 1. Try silent acquisition from token cache
        accounts = app.get_accounts()
        if accounts:
            result = app.acquire_token_silent(scopes, account=accounts[0])
            if result and "access_token" in result:
                self._save_token_cache()
                return result["access_token"]

        # 2. Try interactive browser login
        print("\n[AUTH] Opening browser for Microsoft 365 User Sign-In...")
        try:
            result = app.acquire_token_interactive(
                scopes=scopes,
                prompt="select_account"
            )
            if result and "access_token" in result:
                self._save_token_cache()
                print(f"[AUTH] Logged in successfully as: {result.get('id_token_claims', {}).get('name', 'User')}")
                return result["access_token"]
        except Exception as e:
            print(f"[AUTH] Interactive browser flow failed ({e}). Falling back to Device Code Flow...")

        # 3. Fallback: Device Code Flow (very reliable, works on all environments)
        flow = app.initiate_device_flow(scopes=scopes)
        if "user_code" not in flow:
            raise GraphApiError(f"Failed to create device flow: {flow.get('error_description')}")

        print("\n" + "=" * 60)
        print(" MICROSOFT 365 SIGN-IN REQUIRED")
        print(f" 1. Open this URL in your browser: {flow['verification_uri']}")
        print(f" 2. Enter this code: {flow['user_code']}")
        print("=" * 60 + "\n")

        result = app.acquire_token_by_device_flow(flow)
        if "access_token" in result:
            self._save_token_cache()
            print(f"[AUTH] Logged in successfully as: {result.get('id_token_claims', {}).get('name', 'User')}")
            return result["access_token"]

        raise GraphApiError(f"User login failed: {result.get('error_description') or result.get('error')}")

    def _get_app_token(self):
        """Acquires daemon token using Client Secret."""
        if self.token and time.time() < (self.token_expiry - 120):
            return self.token

        authority = f"https://login.microsoftonline.com/{self.tenant_id}"
        app = msal.ConfidentialClientApplication(
            self.client_id,
            authority=authority,
            client_credential=self.client_secret
        )
        res = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
        if "access_token" in res:
            self.token = res["access_token"]
            self.token_expiry = time.time() + res.get("expires_in", 3600)
            return self.token
        raise GraphApiError(f"Entra ID authentication failed: {res.get('error_description') or res.get('error')}")

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.get_token()}",
            "Content-Type": "application/json"
        }

    def get_current_user_profile(self):
        """Returns the active work user profile for display and auto-filling bookings."""
        user_name = os.getenv("CURRENT_USER_NAME", "ADMIN-DX-DENSO")
        user_email = os.getenv("CURRENT_USER_EMAIL", "dnkh_dxadmin.a6t@ap.denso.com")
        user_dept = os.getenv("CURRENT_USER_DEPT", "DX Promotion / Radiator Plant")

        return {
            "displayName": user_name,
            "mail": user_email,
            "userPrincipalName": user_email,
            "department": user_dept,
            "role": "Work / Admin",
            "auth_mode": self.auth_mode
        }

    def resolve_site_id(self):
        if self.site_id:
            return self.site_id
        
        headers = self.get_headers()
        clean_path = self.site_path.strip("/")
        if clean_path:
            url = f"https://graph.microsoft.com/v1.0/sites/{self.hostname}:/{clean_path}"
        else:
            url = f"https://graph.microsoft.com/v1.0/sites/{self.hostname}"
            
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            raise GraphApiError(f"Failed to find SharePoint site at '{self.hostname}{self.site_path}' ({resp.status_code}): {resp.text}")
        
        self.site_id = resp.json()["id"]
        return self.site_id

    def fetch_all_paged(self, initial_url):
        headers = self.get_headers()
        items = []
        next_url = initial_url

        while next_url:
            resp = requests.get(next_url, headers=headers)
            if resp.status_code != 200:
                raise GraphApiError(f"Graph read failed ({resp.status_code}): {resp.text}")
            data = resp.json()
            items.extend(data.get("value", []))
            next_url = data.get("@odata.nextLink")

        return items

    def get_existing_lists(self):
        site_id = self.resolve_site_id()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists?$select=id,displayName,name&$top=999"
        lists = self.fetch_all_paged(url)
        return {l.get("displayName") or l.get("name"): l["id"] for l in lists}

    def ensure_all_lists(self):
        existing = self.get_existing_lists()
        status_report = {}

        if "Room_List" in existing:
            self.list_ids["Room_List"] = existing["Room_List"]
            status_report["Room_List"] = {"status": "exists", "id": existing["Room_List"]}
        else:
            list_id = self._create_room_list()
            self.list_ids["Room_List"] = list_id
            status_report["Room_List"] = {"status": "created", "id": list_id}

        if "Equipment_List" in existing:
            self.list_ids["Equipment_List"] = existing["Equipment_List"]
            status_report["Equipment_List"] = {"status": "exists", "id": existing["Equipment_List"]}
        else:
            list_id = self._create_equipment_list()
            self.list_ids["Equipment_List"] = list_id
            status_report["Equipment_List"] = {"status": "created", "id": list_id}

        if "Room_Bookings" in existing:
            self.list_ids["Room_Bookings"] = existing["Room_Bookings"]
            status_report["Room_Bookings"] = {"status": "exists", "id": existing["Room_Bookings"]}
        else:
            list_id = self._create_bookings_list()
            self.list_ids["Room_Bookings"] = list_id
            status_report["Room_Bookings"] = {"status": "created", "id": list_id}

        return status_report

    def _create_room_list(self):
        site_id = self.resolve_site_id()
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists"
        payload = {
            "displayName": "Room_List",
            "description": "Master list of meeting rooms and operating rules for Smart Room Booking",
            "list": {"template": "genericList"},
            "columns": [
                {"name": "RoomCode", "text": {}},
                {"name": "Building", "text": {}},
                {"name": "Floor", "text": {}},
                {"name": "Capacity", "number": {"decimalPlaces": "none"}},
                {"name": "OperatingHoursStart", "text": {}},
                {"name": "OperatingHoursEnd", "text": {}},
                {"name": "SlotDurationMinutes", "number": {"decimalPlaces": "none"}},
                {"name": "AvailableEquipment", "text": {"allowMultipleLines": True}},
                {"name": "ColorCode", "text": {}},
                {"name": "Status", "choice": {"choices": ["Available", "Maintenance", "Inactive"]}},
                {"name": "Features", "text": {"allowMultipleLines": True}}
            ]
        }
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Failed to create Room_List: {resp.text}")
        return resp.json()["id"]

    def _create_equipment_list(self):
        site_id = self.resolve_site_id()
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists"
        payload = {
            "displayName": "Equipment_List",
            "description": "Inventory of bookable audio/visual and conference equipment",
            "list": {"template": "genericList"},
            "columns": [
                {"name": "Category", "choice": {"choices": ["Audio/Video", "Display", "Presentation", "Specialty"]}},
                {"name": "TotalQuantity", "number": {"decimalPlaces": "none"}},
                {"name": "AvailableQuantity", "number": {"decimalPlaces": "none"}},
                {"name": "Status", "choice": {"choices": ["Available", "Maintenance"]}},
                {"name": "Notes", "text": {}}
            ]
        }
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Failed to create Equipment_List: {resp.text}")
        return resp.json()["id"]

    def _create_bookings_list(self):
        site_id = self.resolve_site_id()
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists"
        payload = {
            "displayName": "Room_Bookings",
            "description": "Log of room and equipment reservation transactions",
            "list": {"template": "genericList"},
            "columns": [
                {"name": "RoomCode", "text": {}},
                {"name": "RoomName", "text": {}},
                {"name": "BookedBy", "text": {}},
                {"name": "BookerEmail", "text": {}},
                {"name": "Department", "text": {}},
                {"name": "BookingDate", "text": {}},
                {"name": "StartTime", "text": {}},
                {"name": "EndTime", "text": {}},
                {"name": "AttendeesCount", "number": {"decimalPlaces": "none"}},
                {"name": "BookedEquipment", "text": {"allowMultipleLines": True}},
                {"name": "Status", "choice": {"choices": ["Confirmed", "Cancelled", "Completed"]}},
                {"name": "Notes", "text": {"allowMultipleLines": True}}
            ]
        }
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Failed to create Room_Bookings: {resp.text}")
        return resp.json()["id"]

    # ------------------ CRUD: ROOMS ------------------
    def get_rooms(self):
        now = time.time()
        if self._cache["rooms"]["data"] and (now - self._cache["rooms"]["timestamp"]) < self.cache_ttl:
            return self._cache["rooms"]["data"]

        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_List") or self.get_existing_lists().get("Room_List")
        if not list_id:
            return []

        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items?expand=fields&$top=999"
        items = self.fetch_all_paged(url)
        rooms = []
        for it in items:
            fields = it.get("fields", {})
            rooms.append({
                "id": it.get("id"),
                "name": fields.get("Title", "Unnamed Room"),
                "room_code": fields.get("RoomCode", ""),
                "building": fields.get("Building", ""),
                "floor": fields.get("Floor", ""),
                "capacity": int(fields.get("Capacity", 0)),
                "hours_start": fields.get("OperatingHoursStart", "08:00"),
                "hours_end": fields.get("OperatingHoursEnd", "18:00"),
                "slot_duration": int(fields.get("SlotDurationMinutes", 30)),
                "equipment": fields.get("AvailableEquipment", ""),
                "color": fields.get("ColorCode", "#E60012"),
                "status": fields.get("Status", "Available"),
                "features": fields.get("Features", "")
            })
        sorted_rooms = sorted(rooms, key=lambda x: x["room_code"])
        self._cache["rooms"] = {"timestamp": now, "data": sorted_rooms}
        return sorted_rooms

    def create_room(self, data):
        self.invalidate_cache("rooms")
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_List") or self.get_existing_lists().get("Room_List")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items"
        
        fields = {
            "Title": data.get("name"),
            "RoomCode": data.get("room_code"),
            "Building": data.get("building", "Radiator Plant"),
            "Floor": data.get("floor", "1F"),
            "Capacity": int(data.get("capacity", 10)),
            "OperatingHoursStart": data.get("hours_start", "08:00"),
            "OperatingHoursEnd": data.get("hours_end", "18:00"),
            "SlotDurationMinutes": int(data.get("slot_duration", 30)),
            "AvailableEquipment": data.get("equipment", ""),
            "ColorCode": data.get("color", "#E60012"),
            "Status": data.get("status", "Available"),
            "Features": data.get("features", "")
        }
        resp = requests.post(url, headers=headers, json={"fields": fields})
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Error creating room: {resp.text}")
        return resp.json()

    def update_room(self, item_id, data):
        self.invalidate_cache("rooms")
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_List") or self.get_existing_lists().get("Room_List")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items/{item_id}/fields"
        
        fields = {}
        if "name" in data: fields["Title"] = data["name"]
        if "room_code" in data: fields["RoomCode"] = data["room_code"]
        if "building" in data: fields["Building"] = data["building"]
        if "floor" in data: fields["Floor"] = data["floor"]
        if "capacity" in data: fields["Capacity"] = int(data["capacity"])
        if "hours_start" in data: fields["OperatingHoursStart"] = data["hours_start"]
        if "hours_end" in data: fields["OperatingHoursEnd"] = data["hours_end"]
        if "slot_duration" in data: fields["SlotDurationMinutes"] = int(data["slot_duration"])
        if "equipment" in data: fields["AvailableEquipment"] = data["equipment"]
        if "color" in data: fields["ColorCode"] = data["color"]
        if "status" in data: fields["Status"] = data["status"]
        if "features" in data: fields["Features"] = data["features"]

        resp = requests.patch(url, headers=headers, json=fields)
        if resp.status_code not in (200, 204):
            raise GraphApiError(f"Error updating room: {resp.text}")
        return True

    def delete_room(self, item_id):
        self.invalidate_cache("rooms")
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_List") or self.get_existing_lists().get("Room_List")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items/{item_id}"
        resp = requests.delete(url, headers=headers)
        return resp.status_code in (204, 200)

    # ------------------ CRUD: EQUIPMENT ------------------
    def get_equipment(self):
        now = time.time()
        if self._cache["equipment"]["data"] and (now - self._cache["equipment"]["timestamp"]) < self.cache_ttl:
            return self._cache["equipment"]["data"]

        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Equipment_List") or self.get_existing_lists().get("Equipment_List")
        if not list_id:
            return []

        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items?expand=fields&$top=999"
        items = self.fetch_all_paged(url)
        equipment = []
        for it in items:
            fields = it.get("fields", {})
            equipment.append({
                "id": it.get("id"),
                "name": fields.get("Title", "Equipment Item"),
                "category": fields.get("Category", "Specialty"),
                "total_qty": int(fields.get("TotalQuantity", 1)),
                "available_qty": int(fields.get("AvailableQuantity", 1)),
                "status": fields.get("Status", "Available"),
                "notes": fields.get("Notes", "")
            })
        sorted_eq = sorted(equipment, key=lambda x: x["name"])
        self._cache["equipment"] = {"timestamp": now, "data": sorted_eq}
        return sorted_eq

    def create_equipment(self, data):
        self.invalidate_cache("equipment")
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Equipment_List") or self.get_existing_lists().get("Equipment_List")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items"
        
        fields = {
            "Title": data.get("name"),
            "Category": data.get("category", "Audio/Video"),
            "TotalQuantity": int(data.get("total_qty", 1)),
            "AvailableQuantity": int(data.get("available_qty", data.get("total_qty", 1))),
            "Status": data.get("status", "Available"),
            "Notes": data.get("notes", "")
        }
        resp = requests.post(url, headers=headers, json={"fields": fields})
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Error creating equipment: {resp.text}")
        return resp.json()

    # ------------------ CRUD: BOOKINGS ------------------
    def get_bookings(self, date_str=None, room_code=None):
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_Bookings") or self.get_existing_lists().get("Room_Bookings")
        if not list_id:
            return []

        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items?expand=fields&$top=999"
        items = self.fetch_all_paged(url)
        bookings = []
        for it in items:
            fields = it.get("fields", {})
            b_date = fields.get("BookingDate", "")
            b_room = fields.get("RoomCode", "")
            
            if date_str and b_date != date_str:
                continue
            if room_code and b_room != room_code:
                continue
                
            bookings.append({
                "id": it.get("id"),
                "title": fields.get("Title", "Meeting"),
                "room_code": b_room,
                "room_name": fields.get("RoomName", ""),
                "booked_by": fields.get("BookedBy", ""),
                "email": fields.get("BookerEmail", ""),
                "department": fields.get("Department", ""),
                "date": b_date,
                "start_time": fields.get("StartTime", ""),
                "end_time": fields.get("EndTime", ""),
                "attendees": int(fields.get("AttendeesCount", 1)),
                "equipment": fields.get("BookedEquipment", ""),
                "status": fields.get("Status", "Confirmed"),
                "notes": fields.get("Notes", "")
            })
        return sorted(bookings, key=lambda x: (x["date"], x["start_time"]))

    def check_conflict(self, room_code, date_str, start_time, end_time, exclude_booking_id=None):
        bookings = self.get_bookings(date_str=date_str, room_code=room_code)
        for b in bookings:
            if b["status"] != "Confirmed":
                continue
            if exclude_booking_id and str(b["id"]) == str(exclude_booking_id):
                continue
            if start_time < b["end_time"] and end_time > b["start_time"]:
                return b
        return None

    def create_booking(self, data):
        self.invalidate_cache("bookings")
        conflict = self.check_conflict(
            room_code=data.get("room_code"),
            date_str=data.get("date"),
            start_time=data.get("start_time"),
            end_time=data.get("end_time")
        )
        if conflict:
            raise ValueError(f"Time slot conflict! Room '{data.get('room_name')}' is already reserved for '{conflict['title']}' ({conflict['start_time']} - {conflict['end_time']}) by {conflict['booked_by']}.")

        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_Bookings") or self.get_existing_lists().get("Room_Bookings")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items"
        
        # When called with Delegated User Token, SharePoint stamps 'Created By' with the user's name!
        fields = {
            "Title": data.get("title", "Meeting"),
            "RoomCode": data.get("room_code"),
            "RoomName": data.get("room_name"),
            "BookedBy": data.get("booked_by"),
            "BookerEmail": data.get("email", ""),
            "Department": data.get("department", "Radiator Plant"),
            "BookingDate": data.get("date"),
            "StartTime": data.get("start_time"),
            "EndTime": data.get("end_time"),
            "AttendeesCount": int(data.get("attendees", 1)),
            "BookedEquipment": data.get("equipment", ""),
            "Status": "Confirmed",
            "Notes": data.get("notes", "")
        }
        resp = requests.post(url, headers=headers, json={"fields": fields})
        if resp.status_code not in (200, 201):
            raise GraphApiError(f"Error saving booking to SharePoint: {resp.text}")
        return resp.json()

    def cancel_booking(self, item_id):
        self.invalidate_cache("bookings")
        site_id = self.resolve_site_id()
        list_id = self.list_ids.get("Room_Bookings") or self.get_existing_lists().get("Room_Bookings")
        headers = self.get_headers()
        url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items/{item_id}/fields"
        resp = requests.patch(url, headers=headers, json={"Status": "Cancelled"})
        return resp.status_code in (200, 204)
