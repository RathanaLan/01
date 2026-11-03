import os
import sys
import msal
import requests
from dotenv import load_dotenv

# Try loading from .env first, fallback to .env.example
if os.path.exists(".env"):
    load_dotenv(".env")
elif os.path.exists(".env.example"):
    load_dotenv(".env.example")
else:
    load_dotenv()

# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------
TENANT_ID = os.getenv("TENANT_ID", "").strip()
CLIENT_ID = os.getenv("CLIENT_ID", "").strip()
CLIENT_SECRET = os.getenv("CLIENT_SECRET", "").strip()

# Sanitize Hostname (e.g., https://globaldenso.sharepoint.com/ -> globaldenso.sharepoint.com)
raw_hostname = os.getenv("SHAREPOINT_HOSTNAME", "globaldenso.sharepoint.com").strip()
HOSTNAME = raw_hostname.replace("https://", "").replace("http://", "").strip("/")

# Sanitize Site Path (e.g., /sites/AP000022/Radiator/Testing_Site)
raw_site_path = os.getenv("SHAREPOINT_SITE_PATH", "/sites/AP000022/Radiator/Testing_Site").strip()
SITE_PATH = "/" + raw_site_path.strip("/") if raw_site_path else ""

# ---------------------------------------------------------
# Sample HR List Configuration
# ---------------------------------------------------------
LIST_NAME = "HR_Employee_Directory"
LIST_DESCRIPTION = "Sample HR Employee Directory with profile and employment data"

# Note: Standard SharePoint list automatically creates the 'Title' column (used for Full Name)
COLUMNS = [
    {
        "name": "EmployeeID",
        "description": "Unique Employee ID",
        "text": {}
    },
    {
        "name": "Department",
        "description": "Employee Department",
        "choice": {
            "choices": [
                "Human Resources",
                "Information Technology",
                "Engineering",
                "Production",
                "Quality Assurance",
                "Supply Chain"
            ]
        }
    },
    {
        "name": "Position",
        "description": "Job Title / Role",
        "text": {}
    },
    {
        "name": "EmploymentType",
        "description": "Employment Category",
        "choice": {
            "choices": ["Full-Time", "Contract", "Part-Time", "Intern"]
        }
    },
    {
        "name": "Email",
        "description": "Corporate Email Address",
        "text": {}
    },
    {
        "name": "JoinDate",
        "description": "Date joined the company",
        "dateTime": {"format": "dateOnly"}
    },
    {
        "name": "Status",
        "description": "Employment Status",
        "choice": {
            "choices": ["Active", "On Leave", "Probation", "Resigned"]
        }
    }
]

# Sample data rows to populate into the HR list
SAMPLE_HR_ITEMS = [
    {
        "Title": "Somchai Prasert",
        "EmployeeID": "EMP-1001",
        "Department": "Human Resources",
        "Position": "HR Manager",
        "EmploymentType": "Full-Time",
        "Email": "somchai.prasert@example.com",
        "JoinDate": "2021-03-15T00:00:00Z",
        "Status": "Active"
    },
    {
        "Title": "Anong Srisuk",
        "EmployeeID": "EMP-1002",
        "Department": "Human Resources",
        "Position": "Talent Acquisition Specialist",
        "EmploymentType": "Full-Time",
        "Email": "anong.srisuk@example.com",
        "JoinDate": "2023-06-01T00:00:00Z",
        "Status": "Active"
    },
    {
        "Title": "Kittisak Wong",
        "EmployeeID": "EMP-1003",
        "Department": "Production",
        "Position": "Production Supervisor",
        "EmploymentType": "Full-Time",
        "Email": "kittisak.wong@example.com",
        "JoinDate": "2022-09-10T00:00:00Z",
        "Status": "Active"
    },
    {
        "Title": "Nareerat Chai",
        "EmployeeID": "EMP-1004",
        "Department": "Quality Assurance",
        "Position": "QA Engineer",
        "EmploymentType": "Probation",
        "Email": "nareerat.chai@example.com",
        "JoinDate": "2026-08-01T00:00:00Z",
        "Status": "Probation"
    }
]


def acquire_token():
    """Acquires a token using Microsoft MSAL Client Credentials."""
    authority = f"https://login.microsoftonline.com/{TENANT_ID}"
    app = msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=authority,
        client_credential=CLIENT_SECRET
    )
    result = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
    if "access_token" in result:
        return result["access_token"]

    err = result.get("error")
    err_desc = result.get("error_description", "")
    raise RuntimeError(f"Authentication failed: {err}\nDetails: {err_desc}")


def resolve_site_id(headers):
    """Resolves the Graph API Site ID using the hostname and relative site path."""
    clean_path = SITE_PATH.strip("/")
    if clean_path:
        url = f"https://graph.microsoft.com/v1.0/sites/{HOSTNAME}:/{clean_path}"
    else:
        url = f"https://graph.microsoft.com/v1.0/sites/{HOSTNAME}"

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise RuntimeError(f"Failed to find SharePoint site at '{HOSTNAME}{SITE_PATH}' ({response.status_code}): {response.text}")

    return response.json()["id"]


def create_sharepoint_list(headers, site_id):
    """Creates the SharePoint list with custom columns."""
    url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists"

    payload = {
        "displayName": LIST_NAME,
        "description": LIST_DESCRIPTION,
        "list": {
            "template": "genericList"
        },
        "columns": COLUMNS
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code not in (200, 201):
        raise RuntimeError(f"Failed to create list '{LIST_NAME}' ({response.status_code}): {response.text}")

    return response.json()


def populate_sample_items(headers, site_id, list_id, items):
    """Adds sample records to the newly created list."""
    url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/lists/{list_id}/items"
    inserted = []

    for item in items:
        payload = {"fields": item}
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code in (200, 201):
            inserted.append(item["Title"])
            print(f"   [+] Added: {item['Title']} ({item['EmployeeID']}) - {item['Position']}")
        else:
            print(f"   [-] Failed to add {item['Title']}: {resp.status_code} - {resp.text}")

    return inserted


def main():
    print("=" * 65)
    print(" Microsoft Graph API: Create HR SharePoint List & Sample Data")
    print("=" * 65)

    if not TENANT_ID or not CLIENT_ID or not CLIENT_SECRET:
        print("\n[!] Missing credentials. Please check TENANT_ID, CLIENT_ID, and CLIENT_SECRET.")
        sys.exit(1)

    try:
        print("\n1. Authenticating with Microsoft Entra ID...")
        token = acquire_token()
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        print("   Token acquired successfully.")

        print(f"\n2. Resolving SharePoint Site ID for: {HOSTNAME}{SITE_PATH}...")
        site_id = resolve_site_id(headers)
        print(f"   Site ID: {site_id}")

        print(f"\n3. Creating SharePoint List '{LIST_NAME}'...")
        list_obj = create_sharepoint_list(headers, site_id)
        list_id = list_obj["id"]
        web_url = list_obj.get("webUrl", "N/A")

        print(f"   List created successfully!")
        print(f"   - Name:    {list_obj.get('displayName')}")
        print(f"   - List ID: {list_id}")
        print(f"   - Web URL: {web_url}")

        print(f"\n4. Inserting {len(SAMPLE_HR_ITEMS)} sample HR records...")
        populate_sample_items(headers, site_id, list_id, SAMPLE_HR_ITEMS)

        print("\n" + "=" * 65)
        print(" ALL DONE! Your HR SharePoint list is ready to use.")
        print(f" Direct Link: {web_url}")
        print("=" * 65)

    except Exception as exc:
        print(f"\n[ERROR] {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
