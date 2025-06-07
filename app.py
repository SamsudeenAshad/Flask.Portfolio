from flask import Flask, render_template, request, jsonify, send_file
import json
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Load portfolio data
def load_portfolio_data():
    try:
        with open('data/portfolio_data.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            "personal_info": {},
            "skills": [],
            "projects": [],
            "experience": [],
            "volunteering": [],
            "education": []
        }

@app.route('/')
def index():
    """Main portfolio page"""
    data = load_portfolio_data()
    return render_template('index.html', data=data)

@app.route('/about')
def about():
    """About page with detailed information"""
    data = load_portfolio_data()
    return render_template('about.html', data=data)

@app.route('/projects')
def projects():
    """Projects showcase page"""
    data = load_portfolio_data()
    return render_template('projects.html', projects=data.get('projects', []))

@app.route('/project/<int:project_id>')
def project_detail(project_id):
    """Individual project detail page"""
    data = load_portfolio_data()
    projects = data.get('projects', [])
    project = next((p for p in projects if p.get('id') == project_id), None)
    if not project:
        return render_template('404.html'), 404
    return render_template('project_detail.html', project=project)

@app.route('/skills')
def skills():
    """Skills and expertise page"""
    data = load_portfolio_data()
    return render_template('skills.html', skills=data.get('skills', []))

@app.route('/experience')
def experience():
    """Experience and timeline page"""
    data = load_portfolio_data()
    return render_template('experience.html', 
                         experience=data.get('experience', []),
                         volunteering=data.get('volunteering', []))

@app.route('/cv')
def cv():
    """CV section with download options"""
    return render_template('cv.html')

@app.route('/download-cv/<cv_type>')
def download_cv(cv_type):
    """Download CV files"""
    if cv_type == 'friendly':
        cv_path = 'static/cv/cv_friendly.pdf'
    elif cv_type == 'formal':
        cv_path = 'static/cv/cv_formal.pdf'
    else:
        return "CV type not found", 404
    
    if os.path.exists(cv_path):
        return send_file(cv_path, as_attachment=True)
    else:
        return "CV file not found", 404

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact form handling"""
    if request.method == 'POST':
        # Handle contact form submission
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # Here you would typically send an email or save to database
        # For now, we'll just return a success response
        return jsonify({
            'status': 'success',
            'message': 'Thank you for your message! I\'ll get back to you soon.'
        })
    
    return render_template('contact.html')

@app.route('/api/skills')
def api_skills():
    """API endpoint for skills data"""
    data = load_portfolio_data()
    return jsonify(data.get('skills', []))

@app.route('/api/projects')
def api_projects():
    """API endpoint for projects data"""
    data = load_portfolio_data()
    return jsonify(data.get('projects', []))

@app.errorhandler(404)
def not_found(error):
    data = load_portfolio_data()
    return render_template('404.html', data=data), 404

@app.errorhandler(500)
def internal_error(error):
    data = load_portfolio_data()
    return render_template('500.html', data=data), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
