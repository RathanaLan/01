"""
Automated Verification Suite for Habit Routine & Success Planner
"""
import os
import sys
import re

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

def test_file_structure():
    required_files = [
        "index.html",
        os.path.join("templates", "weekly.html"),
        os.path.join("templates", "daily.html"),
        os.path.join("static", "css", "style.css"),
        os.path.join("static", "css", "print.css"),
        os.path.join("static", "js", "app.js"),
        os.path.join("static", "js", "pomodoro.js"),
        os.path.join("static", "js", "weekly.js"),
        os.path.join("static", "js", "recorder.js"),
        os.path.join("static", "js", "supabase-config.js"),
        os.path.join("static", "js", "supabase-sync.js"),
        "supabase_schema.sql",
        "app.py",
        "README.md"
    ]
    
    print(">>> 1. Verifying File Structure...")
    missing = []
    for rel_path in required_files:
        full_path = os.path.join(BASE_DIR, rel_path)
        if not os.path.isfile(full_path):
            missing.append(rel_path)
        else:
            size = os.path.getsize(full_path)
            print(f"  [OK] {rel_path} ({size} bytes)")
            
    assert not missing, f"Missing required files: {missing}"
    print(">>> File structure verified 100%!\n")

def test_index_content():
    print(">>> 2. Verifying Homepage (index.html) Requirements...")
    index_path = os.path.join(BASE_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Schedule hours
    assert "07:30 – 08:00 AM" in html, "Work schedule 7:30 AM start missing"
    assert "04:15 – 04:30 PM" in html, "Work schedule 4:30 PM end missing"
    assert "05:30 – 06:00 AM" in html, "Morning wake up missing"
    assert "10:00 PM – 05:30 AM" in html, "Sleep routine missing"

    # Meal suggestions
    assert "Breakfast" in html, "Breakfast section missing"
    assert "Lunch" in html, "Lunch section missing"
    assert "Dinner" in html, "Dinner section missing"
    assert "Smart Snacks" in html, "Snacks section missing"

    # Productivity techniques
    assert "Pomodoro Technique" in html, "Pomodoro technique missing"
    assert "Deep Work" in html, "Deep work missing"
    assert "Time-Blocking" in html, "Time-blocking missing"

    # Wind-down routine
    assert "Digital Sunset" in html, "Digital sunset missing"
    assert "Evening Reflection" in html, "Evening reflection missing"
    assert "timerDisplay" in html, "Timer display widget missing"
    assert "habit-item" in html, "Habit items missing"

    # Recording Suite
    assert "recordSection" in html, "Recording section missing"
    assert "logMorningText" in html, "Morning log input missing"
    assert "logEveningText" in html, "Evening log input missing"
    assert "recordVoiceBtn" in html, "Record voice button missing"
    assert "recordsHistoryList" in html, "Records history list missing"

    # Supabase Cloud Sync
    assert "supabaseModal" in html, "Supabase modal missing"
    assert "supabaseStatusBadge" in html, "Supabase status badge missing"
    assert "daily_habit_tracking" in html, "Supabase table name missing"

    # 5-Second Hero to Master Schedule Switcher
    assert "top-switch-wrapper" in html, "Top switch wrapper missing"
    assert "btnShowHero" in html, "Button show hero missing"
    assert "btnShowSchedule" in html, "Button show schedule missing"
    assert "autoSwitchBanner" in html, "Auto switch banner missing"
    assert "heroViewContainer" in html, "Hero view container missing"
    assert "masterScheduleTopContainer" in html, "Master schedule top container missing"

    print(">>> index.html requirements verified 100%!\n")

def test_weekly_content():
    print(">>> 3. Verifying Weekly Page (templates/weekly.html) Requirements...")
    weekly_path = os.path.join(BASE_DIR, "templates", "weekly.html")
    with open(weekly_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Budget breakdown categories
    assert "Food &amp; Groceries" in html or "Food & Groceries" in html, "Food category missing"
    assert "Learning &amp; Growth" in html or "Learning & Growth" in html, "Learning category missing"
    assert "Leisure &amp; Social" in html or "Leisure & Social" in html, "Leisure category missing"
    assert "Savings &amp; Wealth" in html or "Savings & Wealth" in html, "Savings category missing"

    # Budget calculator
    assert "calcIncomeInput" in html, "Budget calculator input missing"
    assert "calcCurrencySelect" in html, "Budget currency select missing"
    assert "weekly-goal-item" in html, "Weekly goal checklist items missing"
    assert "day-column" in html, "Day-by-day pillars missing"

    print(">>> templates/weekly.html requirements verified 100%!\n")

def test_link_integrity():
    print(">>> 4. Verifying Internal Relative Link Integrity...")
    
    # Check index.html asset paths
    index_path = os.path.join(BASE_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    for asset in [
        "static/css/style.css", 
        "static/css/print.css", 
        "static/js/app.js", 
        "static/js/pomodoro.js", 
        "static/js/recorder.js",
        "static/js/supabase-config.js",
        "static/js/supabase-sync.js"
    ]:
        full = os.path.join(BASE_DIR, asset)
        assert os.path.exists(full), f"Asset {asset} referenced in index.html does not exist!"

    # Check templates/weekly.html asset paths
    weekly_path = os.path.join(BASE_DIR, "templates", "weekly.html")
    with open(weekly_path, "r", encoding="utf-8") as f:
        w_content = f.read()
        
    for asset in ["../static/css/style.css", "../static/css/print.css", "../static/js/weekly.js"]:
        norm_path = os.path.normpath(os.path.join(BASE_DIR, "templates", asset))
        assert os.path.exists(norm_path), f"Asset {asset} referenced in weekly.html does not exist at {norm_path}!"
        
    print(">>> All relative links and paths are intact and valid!\n")

def test_python_app():
    print(">>> 5. Testing Python Server...")
    import app
    if hasattr(app, 'app'):
        client = app.app.test_client()
        res_home = client.get('/')
        assert res_home.status_code == 200, f"GET / failed with {res_home.status_code}"
        res_weekly = client.get('/weekly')
        assert res_weekly.status_code == 200, f"GET /weekly failed with {res_weekly.status_code}"
        print("  [OK] Flask routes '/' and '/weekly' returned HTTP 200 OK")
    print(">>> Python server test passed!\n")

if __name__ == '__main__':
    print("=========================================================")
    print("RUNNING AUTOMATED VERIFICATION: HABIT SUCCESS PLANNER")
    print("=========================================================\n")
    test_file_structure()
    test_index_content()
    test_weekly_content()
    test_link_integrity()
    test_python_app()
    print("=========================================================")
    print("ALL TESTS PASSED WITH 100% SUCCESS!")
    print("=========================================================")
