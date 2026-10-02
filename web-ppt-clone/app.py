import os
import json
import sqlite3
from datetime import datetime
from functools import wraps
from flask import (
    Flask, render_template, request, redirect, url_for, 
    session, flash, jsonify, g
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get('DATABASE_PATH', os.path.join(BASE_DIR, 'database.db'))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'}

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'web-ppt-clone-secret-key-super-safe')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max image upload

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------------------------------------------------------
# DATABASE UTILITIES
# -----------------------------------------------------------------------------
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db

@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS presentations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            data TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    """)
    db.commit()
    db.close()

init_db()


# -----------------------------------------------------------------------------
# AUTH DECORATOR
# -----------------------------------------------------------------------------
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash("Please log in to access this page.", "warning")
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# -----------------------------------------------------------------------------
# DEFAULT PRESENTATION TEMPLATE
# -----------------------------------------------------------------------------
def get_default_presentation_data(title="Presentation1"):
    return {
        "title": title,
        "aspectRatio": "16:9",
        "theme": "office",
        "transition": "fade",
        "slides": [
            {
                "id": "slide_1",
                "layout": "title",
                "background": "#ffffff",
                "notes": "",
                "elements": [
                    {
                        "id": "el_title",
                        "type": "text",
                        "isPlaceholder": True,
                        "x": 100,
                        "y": 150,
                        "width": 760,
                        "height": 110,
                        "content": title,
                        "fontSize": 54,
                        "fontWeight": "bold",
                        "color": "#1e293b",
                        "textAlign": "center",
                        "fontFamily": "Inter"
                    },
                    {
                        "id": "el_sub",
                        "type": "text",
                        "isPlaceholder": True,
                        "x": 180,
                        "y": 280,
                        "width": 600,
                        "height": 70,
                        "content": "Click to add subtitle",
                        "fontSize": 24,
                        "fontWeight": "normal",
                        "color": "#64748b",
                        "textAlign": "center",
                        "fontFamily": "Inter"
                    }
                ]
            }
        ]
    }



# -----------------------------------------------------------------------------
# ROUTES: AUTHENTICATION
# -----------------------------------------------------------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        confirm = request.form.get('confirm_password', '').strip()

        if not username or not password:
            flash("Username and password are required.", "danger")
            return render_template('register.html', username=username)

        if len(password) < 4:
            flash("Password must be at least 4 characters long.", "danger")
            return render_template('register.html', username=username)

        if password != confirm:
            flash("Passwords do not match.", "danger")
            return render_template('register.html', username=username)

        db = get_db()
        try:
            password_hash = generate_password_hash(password)
            db.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                (username, password_hash)
            )
            db.commit()
            flash("Registration successful! You can now log in.", "success")
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash("Username already exists. Please choose another one.", "danger")
            return render_template('register.html', username=username)

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        if not username or not password:
            flash("Please enter both username and password.", "danger")
            return render_template('login.html', username=username)

        db = get_db()
        user = db.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        ).fetchone()

        if user and check_password_hash(user['password_hash'], password):
            session['user_id'] = user['id']
            session['username'] = user['username']
            flash(f"Welcome back, {user['username']}!", "success")
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid username or password.", "danger")
            return render_template('login.html', username=username)

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('login'))


# -----------------------------------------------------------------------------
# ROUTES: DASHBOARD & PRESENTATION MANAGEMENT
# -----------------------------------------------------------------------------
@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    db = get_db()
    presentations = db.execute(
        "SELECT id, title, updated_at FROM presentations WHERE user_id = ? ORDER BY updated_at DESC",
        (session['user_id'],)
    ).fetchall()
    return render_template('dashboard.html', presentations=presentations, username=session.get('username'))


@app.route('/editor/new')
@login_required
def new_presentation():
    title = request.args.get('title', 'My Presentation')
    default_data = get_default_presentation_data(title)
    
    db = get_db()
    cursor = db.execute(
        "INSERT INTO presentations (user_id, title, data) VALUES (?, ?, ?)",
        (session['user_id'], title, json.dumps(default_data))
    )
    db.commit()
    new_id = cursor.lastrowid
    return redirect(url_for('editor', pres_id=new_id))


@app.route('/editor/<int:pres_id>')
@login_required
def editor(pres_id):
    db = get_db()
    pres = db.execute(
        "SELECT * FROM presentations WHERE id = ? AND user_id = ?",
        (pres_id, session['user_id'])
    ).fetchone()

    if not pres:
        flash("Presentation not found or access denied.", "danger")
        return redirect(url_for('dashboard'))

    return render_template('editor.html', presentation=pres, username=session.get('username'))


# -----------------------------------------------------------------------------
# API ROUTES (JSON Save, Load, Delete, Image Upload)
# -----------------------------------------------------------------------------
@app.route('/api/presentations/<int:pres_id>', methods=['GET'])
@login_required
def api_get_presentation(pres_id):
    db = get_db()
    pres = db.execute(
        "SELECT * FROM presentations WHERE id = ? AND user_id = ?",
        (pres_id, session['user_id'])
    ).fetchone()

    if not pres:
        return jsonify({"error": "Presentation not found"}), 404

    try:
        data_obj = json.loads(pres['data'])
    except Exception:
        data_obj = get_default_presentation_data(pres['title'])

    return jsonify({
        "id": pres['id'],
        "title": pres['title'],
        "data": data_obj,
        "updated_at": pres['updated_at']
    })


@app.route('/api/presentations/<int:pres_id>', methods=['POST', 'PUT'])
@login_required
def api_save_presentation(pres_id):
    db = get_db()
    pres = db.execute(
        "SELECT id FROM presentations WHERE id = ? AND user_id = ?",
        (pres_id, session['user_id'])
    ).fetchone()

    if not pres:
        return jsonify({"error": "Presentation not found"}), 404

    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "Invalid JSON body"}), 400

    title = body.get('title')
    data = body.get('data')

    if data is None:
        return jsonify({"error": "Missing presentation data"}), 400

    # Ensure title is synced
    if not title and isinstance(data, dict):
        title = data.get('title', 'Untitled')

    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    data_str = json.dumps(data) if isinstance(data, (dict, list)) else str(data)

    db.execute(
        "UPDATE presentations SET title = ?, data = ?, updated_at = ? WHERE id = ? AND user_id = ?",
        (title, data_str, now, pres_id, session['user_id'])
    )
    db.commit()

    return jsonify({
        "success": True,
        "message": "Presentation saved successfully.",
        "updated_at": now
    })


@app.route('/api/presentations/<int:pres_id>', methods=['DELETE'])
@login_required
def api_delete_presentation(pres_id):
    db = get_db()
    db.execute(
        "DELETE FROM presentations WHERE id = ? AND user_id = ?",
        (pres_id, session['user_id'])
    )
    db.commit()
    return jsonify({"success": True, "message": "Presentation deleted."})


@app.route('/api/upload-image', methods=['POST'])
@login_required
def api_upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_name = secure_filename(file.filename)
        filename = f"{session['user_id']}_{timestamp}_{safe_name}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        url = url_for('static', filename=f"uploads/{filename}")
        return jsonify({"success": True, "url": url})

    return jsonify({"error": "Invalid file type. Allowed: png, jpg, jpeg, gif, svg, webp"}), 400


# -----------------------------------------------------------------------------
# APPLICATION ENTRYPOINT
# -----------------------------------------------------------------------------
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    print(f"[*] Starting Web PPT Clone at http://{host}:{port}")
    app.run(host=host, port=port, debug=True)
