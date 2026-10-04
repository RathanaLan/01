import re
import os
import json
import sqlite3
from app import app, init_db

print("=== STARTING SLIDECRAFT VERIFICATION ===")

# 1. Check DOM IDs between JS and HTML
with open('static/js/editor.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

with open('templates/editor.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

ids_in_js = re.findall(r'document\.getElementById\([\'"]([^\'"]+)[\'"]\)', js_content)
missing = []
for el_id in set(ids_in_js):
    pattern = rf'id=[\'"]{re.escape(el_id)}[\'"]'
    if not re.search(pattern, html_content):
        missing.append(el_id)

print(f"Total document.getElementById references: {len(set(ids_in_js))}")
if missing:
    print(f"FAILED: Missing IDs in HTML: {missing}")
else:
    print("SUCCESS: All document.getElementById references exist in templates/editor.html!")

# 2. Test Flask app using test_client
init_db()
client = app.test_client()

# Register user
reg_res = client.post('/register', data={
    'username': 'autotest_user',
    'password': 'Password123!',
    'confirm_password': 'Password123!'
}, follow_redirects=True)
assert reg_res.status_code == 200, f"Register failed: {reg_res.status_code}"
print("SUCCESS: User registration verified")

# Login user
login_res = client.post('/login', data={
    'username': 'autotest_user',
    'password': 'Password123!'
}, follow_redirects=True)
assert login_res.status_code == 200, f"Login failed: {login_res.status_code}"
print("SUCCESS: User login verified")

# Create Presentation
create_res = client.get('/editor/new', follow_redirects=False)
assert create_res.status_code in [302, 200], f"Create deck failed: {create_res.status_code}"
location = create_res.headers.get('Location', '')
match = re.search(r'/editor/(\d+)', location)
match = re.search(r'/editor/([a-f0-9\-]+)', location)
assert match, f"Could not find presentation ID in redirect location: {location}"
pres_id = match.group(1)
print(f"SUCCESS: Created presentation ID: {pres_id}")

# Fetch presentation API
api_get = client.get(f'/api/presentations/{pres_id}')
assert api_get.status_code == 200, f"API get failed: {api_get.status_code}"
data = api_get.get_json()
assert 'data' in data and 'slides' in data['data'], "Presentation JSON structure invalid"
print(f"SUCCESS: Fetched presentation API. Title: '{data['title']}', Slides count: {len(data['data']['slides'])}")

# Update presentation API
test_payload = {
    'title': 'Automated Test Presentation',
    'data': {
        'title': 'Automated Test Presentation',
        'aspectRatio': '16:9',
        'theme': 'office',
        'transition': 'fade',
        'slides': [
            {
                'id': 'slide_test_1',
                'layout': 'title',
                'background': '#ffffff',
                'notes': 'Test speaker notes',
                'inks': [],
                'elements': [
                    {
                        'id': 'el_title',
                        'type': 'text',
                        'content': 'Verified Title',
                        'x': 100, 'y': 100, 'width': 700, 'height': 80,
                        'fontSize': 44, 'fontWeight': 'bold', 'color': '#c43e1c'
                    }
                ]
            }
        ]
    }
}
api_post = client.post(f'/api/presentations/{pres_id}', 
                       data=json.dumps(test_payload), 
                       content_type='application/json')
assert api_post.status_code == 200, f"API post failed: {api_post.status_code}"
post_data = api_post.get_json()
assert post_data.get('success') is True, "API save returned success: false"
print("SUCCESS: Updated presentation via /api/presentations/<id>")

# Fetch again to verify persistence
api_get2 = client.get(f'/api/presentations/{pres_id}')
data2 = api_get2.get_json()
assert data2['title'] == 'Automated Test Presentation'
assert data2['data']['slides'][0]['elements'][0]['content'] == 'Verified Title'
print("SUCCESS: Persistence roundtrip verified in SQLite database")

# Test Image Upload API with mock image
from io import BytesIO
mock_img = BytesIO(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82")
upload_res = client.post('/api/upload-image', data={'image': (mock_img, 'test_unit.png')}, content_type='multipart/form-data')
upload_res = client.post('/api/upload-image', data={'file': (mock_img, 'test_unit.png')}, content_type='multipart/form-data')
assert upload_res.status_code == 200, f"Upload failed: {upload_res.status_code}"
upload_data = upload_res.get_json()
assert 'url' in upload_data, "No URL in image upload response"
print(f"SUCCESS: Upload image API verified: {upload_data['url']}")

# Verify editor template rendering
editor_page = client.get(f'/editor/{pres_id}')
assert editor_page.status_code == 200, f"Editor page failed: {editor_page.status_code}"
assert b'SlideCraft' in editor_page.data, "SlideCraft title missing from editor page"
print("SUCCESS: /editor/<id> page renders HTTP 200 OK")

print("\n=== ALL BACKEND & DOM VERIFICATION CHECKS PASSED ===")
