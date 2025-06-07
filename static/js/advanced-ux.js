// Advanced UX Interactive Features
class AdvancedUX {
    constructor() {
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupMagneticButtons();
        this.setupScrollEffects();
        this.setupParticleSystem();
        this.setupGlitchText();
        this.setupMorphCards();
        this.setupFloatingActionButton();
        this.setupAdvancedLoader();
        this.setupHolographicNav();
        this.setupInteractiveBackground();
    }

    // Custom Cursor
    setupCustomCursor() {
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Interactive elements
            const interactiveElements = 'a, button, .magnetic-button, .morph-card';
            document.querySelectorAll(interactiveElements).forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }
    }

    // Magnetic Button Effects
    setupMagneticButtons() {
        document.querySelectorAll('.magnetic-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Advanced Scroll Effects
    setupScrollEffects() {
        // Scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Scroll dots navigation
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot';
            dot.dataset.section = section.id;
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            scrollIndicator.appendChild(dot);
        });
        
        document.body.appendChild(scrollIndicator);

        // Update progress and active dot on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            
            progressBar.style.transform = `scaleX(${progress / 100})`;

            // Update active dot
            const dots = document.querySelectorAll('.scroll-dot');
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[index]?.classList.add('active');
                }
            });
        });
    }

    // Enhanced Particle System
    setupParticleSystem() {
        const container = document.querySelector('.particle-container');
        if (!container) return;

        // Create floating shapes
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        
        for (let i = 0; i < 20; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 20 + 's';
            shape.style.animationDuration = (15 + Math.random() * 10) + 's';
            shapesContainer.appendChild(shape);
        }
        
        container.appendChild(shapesContainer);

        // Interactive mouse effect
        container.addEventListener('mousemove', (e) => {
            const shapes = container.querySelectorAll('.shape');
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            shapes.forEach((shape, index) => {
                const intensity = 0.1 + (index % 3) * 0.05;
                const xOffset = (x - 0.5) * intensity * 100;
                const yOffset = (y - 0.5) * intensity * 100;
                
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    // Glitch Text Effect
    setupGlitchText() {
        document.querySelectorAll('.glitch-text').forEach(element => {
            element.dataset.text = element.textContent;
            
            // Random glitch trigger
            setInterval(() => {
                if (Math.random() < 0.1) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = 'glitch 0.3s ease-in-out';
                    }, 50);
                }
            }, 3000);
        });
    }

    // Morphing Cards
    setupMorphCards() {
        document.querySelectorAll('.morph-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xRotation = ((y - rect.height / 2) / rect.height) * 20;
                const yRotation = ((x - rect.width / 2) / rect.width) * -20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${xRotation}deg)
                    rotateY(${yRotation}deg)
                    translateY(-20px)
                    scale(1.05)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }

    // Floating Action Button
    setupFloatingActionButton() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'fab-container';
        
        const fabMain = document.createElement('button');
        fabMain.className = 'fab-main';
        fabMain.innerHTML = '✨';
        
        fabMain.addEventListener('click', () => {
            this.triggerSpecialEffects();
        });
        
        fabContainer.appendChild(fabMain);
        document.body.appendChild(fabContainer);
    }

    // Special Effects Trigger
    triggerSpecialEffects() {
        // Rainbow background flash
        document.body.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a0ca3, #00ffff)';
        document.body.style.transition = 'background 0.5s ease';
        
        setTimeout(() => {
            document.body.style.background = '';
        }, 1000);

        // Confetti effect
        this.createConfetti();
        
        // Pulse all cards
        document.querySelectorAll('.morph-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.1)';
                card.style.boxShadow = '0 0 40px rgba(102, 102, 255, 0.6)';
                
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 300);
            }, index * 100);
        });
    }

    // Confetti Effect
    createConfetti() {
        const colors = ['#ff006e', '#8338ec', '#3a0ca3', '#00ffff', '#ff8500'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.top = '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Advanced Loader
    setupAdvancedLoader() {
        const loader = document.createElement('div');
        loader.className = 'ultra-loader';
        
        const cyberLoader = document.createElement('div');
        cyberLoader.className = 'cyber-loader';
        
        loader.appendChild(cyberLoader);
        document.body.appendChild(loader);
        
        // Remove loader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 1000);
            }, 2000);
        });
    }

    // Holographic Navigation
    setupHolographicNav() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.add('nav-holographic');
            
            // Add holographic effect on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.style.background = 'rgba(0, 0, 0, 0.8)';
                    nav.style.backdropFilter = 'blur(20px)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.1)';
                    nav.style.backdropFilter = 'blur(10px)';
                }
            });
        }
    }

    // Interactive Background
    setupInteractiveBackground() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                
                hero.style.background = `
                    radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(102, 102, 255, 0.1) 0%,
                        rgba(255, 0, 110, 0.05) 50%,
                        transparent 100%
                    )
                `;
            });
        }
    }
}

// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupTypewriterEffect();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animate;
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            switch (animationType) {
                case 'fade-in':
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                    break;

                case 'scale-in':
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.8)';
                    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    });
                    break;

                case 'slide-in':
                    const direction = element.dataset.direction || 'left';
                    const distance = direction === 'left' ? '-100px' : '100px';
                    element.style.opacity = '0';
                    element.style.transform = `translateX(${distance})`;
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    });
                    break;
            }
        }, delay);
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('[data-parallax]').forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCounterAnimations() {
        document.querySelectorAll('[data-counter]').forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(counter, target, duration);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    animateCounter(element, target, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    setupTypewriterEffect() {
        document.querySelectorAll('[data-typewriter]').forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 100;
            
            element.textContent = '';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typeWriter(element, text, speed);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Performance optimization: Debounce scroll events
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

// Intersection Observer for lazy loading and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize intersection observer for fade-in animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => fadeInObserver.observe(el));
}

// Performance-optimized scroll indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

// Optimized scroll handler with requestAnimationFrame
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateNavOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

// Update navigation on scroll
function updateNavOnScroll() {
    const navbar = document.querySelector('.nav-holographic');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Reduced motion support
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('motion-reduce');
        // Disable heavy animations
        document.querySelectorAll('.floating-shapes, .particle-container').forEach(el => {
            el.style.display = 'none';
        });
    } else {
        document.body.classList.add('motion-safe');
    }
}

// Mobile detection and optimization
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Initialize mobile optimizations
function initMobileOptimizations() {
    if (isMobile()) {
        document.body.classList.add('mobile-device');
        
        // Disable expensive effects on mobile
        document.querySelectorAll('.floating-shapes, .particle-container').forEach(el => {
            el.style.display = 'none';
        });
        
        // Simplify animations
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
}

// Error handling for failed animations
function handleAnimationError(element, fallback = 'opacity 0.3s ease') {
    try {
        if (element && element.style) {
            element.style.transition = fallback;
        }
    } catch (error) {
        console.warn('Animation error handled:', error);
    }
}

// Initialize all performance optimizations
function initPerformanceOptimizations() {
    // Check for reduced motion preference
    checkReducedMotion();
    
    // Initialize mobile optimizations
    initMobileOptimizations();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Optimized scroll event listener
    window.addEventListener('scroll', debounce(handleScroll, 10), { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        initMobileOptimizations();
    }, 250), { passive: true });
    
    // Handle visibility change for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.body.classList.add('tab-hidden');
        } else {
            document.body.classList.remove('tab-hidden');
        }
    });
}

// Lazy loading for images
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceOptimizations();
    initLazyLoading();
});

// Handle potential errors gracefully
window.addEventListener('error', (e) => {
    console.warn('JS Error handled:', e.error);
    // Fallback to basic styles if advanced features fail
    document.body.classList.add('fallback-mode');
});

// Dynamic Confetti Animation CSS
const confettiCSS = `
@keyframes confettiFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = confettiCSS;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedUX();
    new AnimationController();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdvancedUX, AnimationController };
}
