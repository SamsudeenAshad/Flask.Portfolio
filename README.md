# Professional Flask Portfolio Website

A modern, dynamic Flask portfolio website showcasing expertise in software engineering, AI/ML development, data science, and business management. Features advanced animations, interactive components, and a professional design system.

## ✨ Features

### 🎨 Design & UX
- **Modern UI/UX Design**: Professional, colorful, and dynamic interface with glassmorphism effects
- **Dark/Light Mode Toggle**: Seamless theme switching with CSS variables
- **Responsive Design**: Mobile-first approach with advanced CSS Grid/Flexbox layouts
- **Advanced Animations**: AOS, particle effects, morphing shapes, glitch effects, and custom CSS animations
- **Interactive Elements**: Magnetic buttons, cursor effects, scroll progress indicator

### 📱 Portfolio Sections
- **Hero Section**: Dynamic particle background with animated text
- **About Me**: Statistics counter, skills overview with morphing shapes
- **Skills Visualization**: Interactive charts with Chart.js and animated skill bars
- **Projects Showcase**: Filterable project gallery with detailed modal views
- **Experience Timeline**: Professional experience with interactive timeline
- **CV Downloads**: Two professionally generated PDF versions (friendly & formal)
- **Contact Form**: Flask-WTF integrated contact system with validation

### ⚡ Performance & Technical
- **Modular Architecture**: Separate CSS and JS files for maintainability
- **Performance Optimized**: Lazy loading, intersection observers, reduced motion support
- **SEO Ready**: Semantic HTML structure and meta tags
- **Error Handling**: Custom 404/500 pages with modern design
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🛠 Tech Stack

### Backend
- **Flask**: Modern Python web framework with Jinja2 templating
- **Flask-Mail**: Email functionality for contact forms
- **Flask-WTF**: Form handling and CSRF protection
- **ReportLab**: Dynamic PDF generation for CV files

### Frontend
- **HTML5/CSS3**: Semantic markup with modern CSS features
- **JavaScript ES6+**: Modular architecture with modern features
- **Bootstrap 5**: Responsive grid system and components
- **Chart.js**: Interactive data visualizations
- **AOS**: Animate On Scroll library
- **Particles.js**: Interactive particle backgrounds
- **Typed.js**: Dynamic text typing animations

### Styling & Animation
- **CSS Variables**: Dynamic theming system
- **CSS Grid/Flexbox**: Advanced layout systems
- **Custom Animations**: Fade, slide, scale, bounce, glitch, neon effects
- **Font Awesome**: Professional icon library
- **Google Fonts**: Typography with Poppins font family

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Flask.Portfolio
```

2. **Create virtual environment**
```bash
python -m venv venv
```

3. **Activate virtual environment**
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

5. **Run the application**
```bash
python app.py
```

6. **Open in browser**
Navigate to `http://localhost:5000`

## 📁 Project Structure

```
Flask.Portfolio/
├── app.py                      # Main Flask application with routes
├── create_cv.py               # CV generation script
├── requirements.txt           # Python dependencies
├── tasks.md                   # Development progress tracker
├── data/
│   └── portfolio_data.json    # Portfolio content and configuration
├── static/
│   ├── css/
│   │   ├── style.css         # Main styles with themes and variables
│   │   ├── animations.css    # Advanced animation effects
│   │   └── components.css    # Component-specific styling
│   ├── js/
│   │   ├── main.js          # Core functionality and theme toggle
│   │   ├── animations.js    # Animation controllers and effects
│   │   └── components.js    # Interactive component handlers
│   ├── images/
│   │   ├── profile.jpg      # Profile photo
│   │   ├── about-image.jpg  # About section image
│   │   └── projects/        # Project showcase images
│   └── cv/
│       ├── cv_friendly.pdf  # Casual CV version
│       └── cv_formal.pdf    # Professional CV version
└── templates/
    ├── base.html            # Base template with navigation and layout
    ├── index.html           # Main portfolio page
    ├── 404.html             # Custom 404 error page
    └── 500.html             # Custom 500 error page
```

## 🎯 Key Features Explained

### Dynamic Theme System
- CSS variables enable instant theme switching
- Persistent theme preference using localStorage
- Smooth transitions between light and dark modes

### Interactive Animations
- Intersection Observer API for performance-optimized animations
- Custom cursor effects and magnetic button interactions
- Scroll-triggered animations with reduced motion support

### Responsive Design
- Mobile-first approach with breakpoints at 768px, 992px, 1200px
- Flexible grid layouts adapting to all screen sizes
- Touch-friendly interactions for mobile devices

### CV Generation System
- Automated PDF creation using ReportLab
- Two distinct styles: friendly (colorful) and formal (professional)
- Dynamic content populated from portfolio data

## 🔧 Customization

### Portfolio Data
Edit `data/portfolio_data.json` to customize:
- Personal information and contact details
- Skills and expertise levels
- Project descriptions and links
- Work experience and achievements
- Education and certifications

### Styling
Modify CSS variables in `static/css/style.css`:
```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #7c3aed;
  --accent-color: #06b6d4;
  /* ... more variables */
}
```

### Images
Replace images in `static/images/`:
- `profile.jpg`: Your profile photo (400x400px recommended)
- `about-image.jpg`: About section image
- `projects/`: Project screenshots (600x400px recommended)

## 🚀 Deployment

### Development
```bash
python app.py
```

### Production
For production deployment, consider:
- **Gunicorn**: `gunicorn --bind 0.0.0.0:8000 app:app`
- **Docker**: Container deployment
- **Cloud Platforms**: Heroku, AWS, Google Cloud, Digital Ocean
- **Environment Variables**: Set `FLASK_ENV=production`

### Environment Setup
```bash
export FLASK_ENV=production
export SECRET_KEY=your-secret-key-here
```

## 📋 Performance Features

- **Lazy Loading**: Images load as they enter viewport
- **Intersection Observers**: Efficient scroll-based animations
- **Reduced Motion**: Respects user accessibility preferences
- **Optimized Assets**: Minified CSS/JS for production
- **Caching**: Static file caching for improved load times

## 🧪 Testing

The application includes:
- Error handling with custom 404/500 pages
- Form validation and CSRF protection
- Cross-browser compatibility
- Mobile responsiveness testing
- Accessibility compliance

## 📞 Support

For questions or issues:
1. Check the `tasks.md` file for known issues
2. Review the Flask documentation
3. Check browser console for JavaScript errors
4. Ensure all dependencies are installed correctly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Flask, modern CSS, and vanilla JavaScript**
