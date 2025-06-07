// Components JavaScript - Interactive Portfolio Components

// Skills Chart Component
class SkillsChart {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    init() {
        const chartContainers = document.querySelectorAll('.chart-container canvas');
        chartContainers.forEach(canvas => {
            this.createChart(canvas);
        });
    }

    createChart(canvas) {
        const skillsData = JSON.parse(document.querySelector('[data-skills]')?.dataset.skills || '[]');
        
        if (!skillsData.length) return;

        const chartData = this.processSkillsData(skillsData);
        
        const chart = new Chart(canvas, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#6366f1',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });

        this.charts.set(canvas.id, chart);
    }

    processSkillsData(skillsData) {
        const labels = [];
        const data = [];
        const colors = [];

        skillsData.forEach(category => {
            category.items.forEach(skill => {
                labels.push(skill.name);
                data.push(skill.level);
                colors.push(skill.color);
            });
        });

        return {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };
    }

    updateChart(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.data = this.processSkillsData(newData);
            chart.update('active');
        }
    }
}

// Project Filter Component
class ProjectFilter {
    constructor() {
        this.activeFilter = 'all';
        this.projects = [];
        this.init();
    }

    init() {
        this.cacheProjects();
        this.bindFilterEvents();
        this.setupSearchFilter();
    }

    cacheProjects() {
        this.projects = Array.from(document.querySelectorAll('.project-card'));
    }

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveFilter(button.dataset.filter);
                this.updateActiveButton(button);
                this.filterProjects();
            });
        });
    }

    setupSearchFilter() {
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.searchProjects(e.target.value);
            }, 300));
        }
    }

    setActiveFilter(filter) {
        this.activeFilter = filter;
    }

    updateActiveButton(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    filterProjects() {
        this.projects.forEach(project => {
            const category = project.dataset.category;
            const shouldShow = this.activeFilter === 'all' || category === this.activeFilter;
            
            if (shouldShow) {
                this.showProject(project);
            } else {
                this.hideProject(project);
            }
        });

        this.updateProjectCount();
    }

    searchProjects(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.projects.forEach(project => {
            const title = project.querySelector('.project-title').textContent.toLowerCase();
            const description = project.querySelector('.project-description').textContent.toLowerCase();
            const tech = Array.from(project.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            const matches = title.includes(term) || 
                          description.includes(term) || 
                          tech.includes(term);
            
            if (matches) {
                this.showProject(project);
            } else {
                this.hideProject(project);
            }
        });
    }

    showProject(project) {
        project.style.display = 'block';
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px) scale(0.9)';
        
        requestAnimationFrame(() => {
            project.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0) scale(1)';
        });
    }

    hideProject(project) {
        project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        project.style.opacity = '0';
        project.style.transform = 'translateY(-20px) scale(0.9)';
        
        setTimeout(() => {
            project.style.display = 'none';
        }, 300);
    }

    updateProjectCount() {
        const visibleProjects = this.projects.filter(project => 
            project.style.display !== 'none'
        );
        
        const countElement = document.getElementById('projectCount');
        if (countElement) {
            countElement.textContent = `${visibleProjects.length} project${visibleProjects.length !== 1 ? 's' : ''}`;
        }
    }
}

// Contact Form Component
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.isSubmitting = false;
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
        this.setupProgressIndicator();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupValidation() {
        this.validators = {
            name: (value) => value.length >= 2 ? null : 'Name must be at least 2 characters',
            email: (value) => this.isValidEmail(value) ? null : 'Please enter a valid email address',
            subject: (value) => value.length >= 5 ? null : 'Subject must be at least 5 characters',
            message: (value) => value.length >= 10 ? null : 'Message must be at least 10 characters'
        };
    }

    setupProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.innerHTML = '<div class="form-progress-bar"></div>';
        this.form.insertBefore(progressBar, this.form.firstChild);
    }

    validateField(field) {
        const validator = this.validators[field.name];
        if (!validator) return true;

        const error = validator(field.value.trim());
        
        if (error) {
            this.showFieldError(field, error);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const isValid = this.validateForm();

        if (!isValid) {
            this.showAlert('Please fix the errors above', 'error');
            return;
        }

        this.isSubmitting = true;
        this.showLoadingState();

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                this.showAlert(result.message || 'Message sent successfully!', 'success');
                this.resetForm();
                this.trackFormSubmission();
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            this.showAlert('Failed to send message. Please try again.', 'error');
            console.error('Contact form error:', error);
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        this.updateProgress(30);
    }

    hideLoadingState() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        this.updateProgress(100);
        setTimeout(() => this.updateProgress(0), 1000);
    }

    updateProgress(percentage) {
        const progressBar = this.form.querySelector('.form-progress-bar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    showAlert(message, type) {
        const alert = document.getElementById('contactAlert');
        const messageElement = document.getElementById('alertMessage');
        
        if (alert && messageElement) {
            alert.className = `alert alert-${type === 'error' ? 'danger' : 'success'} mt-4`;
            messageElement.textContent = message;
            alert.style.display = 'block';
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                alert.style.display = 'none';
            }, 5000);
        }
    }

    resetForm() {
        this.form.reset();
        this.form.querySelectorAll('.error').forEach(field => {
            this.clearFieldError(field);
        });
    }

    trackFormSubmission() {
        // Analytics tracking (if needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'contact',
                event_label: 'contact_form'
            });
        }
    }
}

// Skills Progress Animation
class SkillsProgress {
    constructor() {
        this.isAnimated = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateSkills();
                    this.isAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.dataset.width;
                bar.style.width = width + '%';
                
                // Add counter animation
                this.animatePercentage(bar, width);
            }, index * 200);
        });
    }

    animatePercentage(bar, targetValue) {
        const percentageElement = bar.parentNode.querySelector('.skill-percentage');
        if (!percentageElement) return;

        let currentValue = 0;
        const increment = targetValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            percentageElement.textContent = Math.round(currentValue) + '%';
        }, 40);
    }
}

// Statistics Counter
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.isAnimated = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateCounters();
                    this.isAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }

    animateCounters() {
        this.counters.forEach((counter, index) => {
            setTimeout(() => {
                this.animateCounter(counter);
            }, index * 300);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// CV Download Tracker
class CVDownloadTracker {
    constructor() {
        this.init();
    }

    init() {
        const cvButtons = document.querySelectorAll('.cv-download-btn');
        
        cvButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackDownload(e.target);
                this.showDownloadFeedback(e.target);
            });
        });
    }

    trackDownload(button) {
        const cvType = button.href.includes('friendly') ? 'friendly' : 'formal';
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cv_download', {
                event_category: 'download',
                event_label: cvType
            });
        }
        
        // Local storage tracking
        const downloads = JSON.parse(localStorage.getItem('cvDownloads') || '[]');
        downloads.push({
            type: cvType,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('cvDownloads', JSON.stringify(downloads));
    }

    showDownloadFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// Lazy Loading Component
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupImageObserver();
            this.observeImages();
        } else {
            this.loadAllImages();
        }
    }

    setupImageObserver() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        
        img.addEventListener('load', () => {
            img.classList.remove('lazy');
        });
        
        img.addEventListener('error', () => {
            img.classList.add('error');
        });
    }

    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.loadImage(img);
        });
    }
}

// Notification System
class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        return notification;
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 1rem;
            margin-bottom: 10px;
            box-shadow: var(--shadow-large);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: auto;
            max-width: 300px;
        `;

        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="${icon}" style="color: ${this.getColor(type)};"></i>
                <span>${message}</span>
                <button class="notification-close" style="margin-left: auto; background: none; border: none; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));

        return notification;
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#6366f1'
        };
        return colors[type] || colors.info;
    }

    remove(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components with slight delays to ensure proper loading
    setTimeout(() => new SkillsChart(), 100);
    setTimeout(() => new ProjectFilter(), 200);
    setTimeout(() => new ContactForm(), 300);
    setTimeout(() => new SkillsProgress(), 400);
    setTimeout(() => new StatsCounter(), 500);
    setTimeout(() => new CVDownloadTracker(), 600);
    setTimeout(() => new LazyLoader(), 700);
    
    // Initialize notification system
    window.notifications = new NotificationSystem();
});
