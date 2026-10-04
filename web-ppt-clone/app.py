import os
import sqlite3
import json
import uuid
from datetime import datetime
from functools import wraps
from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'default-secret-key-for-dev')
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'}

DATABASE = os.path.join(app.root_path, 'ppt_clone.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    with get_db() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS presentations (
                id TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                data TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')
        conn.commit()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_default_presentation_data(title):
    return {
        "title": title,
        "aspectRatio": "16:9",
        "theme": "office",
        "transition": "none",
        "slides": [{
            "id": "slide-" + str(uuid.uuid4()),
            "layout": "title",
            "background": "#ffffff",
            "transition": "none",
            "notes": "",
            "inks": [],
            "elements": [
                {
                    "id": "elem-" + str(uuid.uuid4()),
                    "type": "text",
                    "x": 100, "y": 150, "width": 760, "height": 100,
                    "rotation": 0, "opacity": 1, "locked": False,
                    "content": title,
                    "fontSize": 64, "fontWeight": "bold", "fontStyle": "normal",
                    "textDecoration": "none", "color": "#000000",
                    "textAlign": "center", "fontFamily": "Inter",
                    "lineHeight": 1.2, "letterSpacing": 0,
                    "fill": "transparent", "highlight": "transparent",
                    "isPlaceholder": True, "verticalAlign": "middle"
                },
                {
                    "id": "elem-" + str(uuid.uuid4()),
                    "type": "text",
                    "x": 100, "y": 280, "width": 760, "height": 60,
                    "rotation": 0, "opacity": 1, "locked": False,
                    "content": "Subtitle",
                    "fontSize": 32, "fontWeight": "normal", "fontStyle": "normal",
                    "textDecoration": "none", "color": "#555555",
                    "textAlign": "center", "fontFamily": "Inter",
                    "lineHeight": 1.2, "letterSpacing": 0,
                    "fill": "transparent", "highlight": "transparent",
                    "isPlaceholder": True, "verticalAlign": "middle"
                }
            ]
        }]
    }

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form.get('confirm_password', '')
        
        if password != confirm_password:
            flash('Passwords do not match.', 'danger')
            return redirect(url_for('register'))
            
        hashed_password = generate_password_hash(password)
        
        try:
            with get_db() as conn:
                conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
                conn.commit()
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username already exists.', 'danger')
            return redirect(url_for('register'))
            
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        with get_db() as conn:
            user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
            
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['username'] = user['username']
            flash('Logged in successfully.', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password.', 'danger')
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    with get_db() as conn:
        presentations = conn.execute(
            'SELECT id, title, updated_at, data FROM presentations WHERE user_id = ? ORDER BY updated_at DESC', 
            (session['user_id'],)
        ).fetchall()
        
    formatted_presentations = []
    for p in presentations:
        try:
            data = json.loads(p['data'])
            slide_count = len(data.get('slides', []))
        except:
            slide_count = 0
            
        formatted_presentations.append({
            'id': p['id'],
            'title': p['title'],
            'updated_at': p['updated_at'],
            'slide_count': slide_count
        })
        
    return render_template('dashboard.html', presentations=formatted_presentations)

@app.route('/editor/new', methods=['GET', 'POST'])
@login_required
def new_presentation():
    title = request.args.get('title', 'Untitled Presentation')
    theme = request.args.get('theme', 'office')
    
    new_id = str(uuid.uuid4())
    data = get_default_presentation_data(title)
    data['theme'] = theme
    
    with get_db() as conn:
        conn.execute(
            'INSERT INTO presentations (id, user_id, title, data) VALUES (?, ?, ?, ?)',
            (new_id, session['user_id'], title, json.dumps(data))
        )
        conn.commit()
        
    return redirect(url_for('editor', id=new_id))

@app.route('/editor/<id>')
@login_required
def editor(id):
    with get_db() as conn:
        presentation = conn.execute(
            'SELECT * FROM presentations WHERE id = ? AND user_id = ?', 
            (id, session['user_id'])
        ).fetchone()
        
    if not presentation:
        flash('Presentation not found.', 'danger')
        return redirect(url_for('dashboard'))
        
    return render_template(
        'editor.html', 
        PRESENTATION_ID=id,
        title=presentation['title'],
        username=session['username']
    )

@app.route('/api/presentations/<id>', methods=['GET'])
@login_required
def get_presentation(id):
    with get_db() as conn:
        presentation = conn.execute(
            'SELECT * FROM presentations WHERE id = ? AND user_id = ?', 
            (id, session['user_id'])
        ).fetchone()
        
    if not presentation:
        return jsonify({'error': 'Not found'}), 404
        
    return jsonify({
        'title': presentation['title'],
        'data': json.loads(presentation['data'])
    })

@app.route('/api/presentations/<id>', methods=['POST'])
@login_required
def save_presentation(id):
    req_data = request.json
    if not req_data or 'data' not in req_data:
        return jsonify({'error': 'Invalid payload'}), 400
        
    title = req_data.get('title', 'Untitled')
    data_str = json.dumps(req_data['data'])
    
    with get_db() as conn:
        p = conn.execute('SELECT id FROM presentations WHERE id = ? AND user_id = ?', (id, session['user_id'])).fetchone()
        if p:
            conn.execute(
                'UPDATE presentations SET title = ?, data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
                (title, data_str, id, session['user_id'])
            )
        else:
            conn.execute(
                'INSERT INTO presentations (id, user_id, title, data) VALUES (?, ?, ?, ?)',
                (id, session['user_id'], title, data_str)
            )
        conn.commit()
        
    return jsonify({'success': True})

@app.route('/api/presentations/<id>', methods=['DELETE'])
@login_required
def delete_presentation(id):
    with get_db() as conn:
        conn.execute('DELETE FROM presentations WHERE id = ? AND user_id = ?', (id, session['user_id']))
        conn.commit()
    return jsonify({'success': True})

@app.route('/api/presentations/<id>/duplicate', methods=['POST'])
@login_required
def duplicate_presentation(id):
    with get_db() as conn:
        presentation = conn.execute(
            'SELECT * FROM presentations WHERE id = ? AND user_id = ?', 
            (id, session['user_id'])
        ).fetchone()
        
    if not presentation:
        return jsonify({'error': 'Not found'}), 404
        
    new_id = str(uuid.uuid4())
    new_title = presentation['title'] + ' (Copy)'
    
    data = json.loads(presentation['data'])
    data['title'] = new_title
    
    with get_db() as conn:
        conn.execute(
            'INSERT INTO presentations (id, user_id, title, data) VALUES (?, ?, ?, ?)',
            (new_id, session['user_id'], new_title, json.dumps(data))
        )
        conn.commit()
        
    return jsonify({'success': True, 'new_id': new_id})

@app.route('/api/upload-image', methods=['POST'])
@login_required
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        url = url_for('static', filename=f'uploads/{unique_filename}')
        return jsonify({'url': url})
    return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
