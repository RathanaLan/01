"""
Simple HTTP / Flask Server for Habit & Success Planner
Can be run with `python app.py` or viewed directly by opening index.html.
"""
import os
import sys

try:
    from flask import Flask, render_template, send_from_directory, redirect, url_for
    app = Flask(__name__, template_folder='templates', static_folder='static')

    @app.route('/')
    def home():
        return render_template('daily.html')

    @app.route('/daily')
    def daily():
        return render_template('daily.html')

    @app.route('/weekly')
    def weekly():
        return render_template('weekly.html')

    if __name__ == '__main__':
        port = int(os.environ.get('PORT', 5050))
        print(f"Habit Success Planner running at: http://localhost:{port}")
        app.run(host='0.0.0.0', port=port, debug=True)

except ImportError:
    # Fallback to standard Python http.server if Flask is not installed
    import http.server
    import socketserver

    PORT = 5050
    Handler = http.server.SimpleHTTPRequestHandler

    print(f"Serving files at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
