// Advanced Animations JavaScript - Portfolio Animation Effects

// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.animatedElements = new Set();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParticleEffects();
        this.setupMorphingShapes();
    }

    setupIntersectionObservers() {
        // Fade in animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerFadeAnimation(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Scale animations
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScaleAnimation(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Slide animations
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerSlideAnimation(entry.target);
                }
            });
        }, { threshold: 0.15 });

        this.observers.set('fade', fadeObserver);
        this.observers.set('scale', scaleObserver);
        this.observers.set('slide', slideObserver);

        // Observe elements
        this.observeElements();
    }

    observeElements() {
        // Fade animations
        document.querySelectorAll('[data-animate="fade"]').forEach(el => {
            this.observers.get('fade').observe(el);
        });

        // Scale animations
        document.querySelectorAll('[data-animate="scale"]').forEach(el => {
            this.observers.get('scale').observe(el);
        });

        // Slide animations
        document.querySelectorAll('[data-animate="slide"]').forEach(el => {
            this.observers.get('slide').observe(el);
        });
    }

    triggerFadeAnimation(element) {
        if (this.animatedElements.has(element)) return;
        
        const direction = element.dataset.direction || 'up';
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(direction);
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
            });
        }, delay);
        
        this.animatedElements.add(element);
    }

    triggerScaleAnimation(element) {
        if (this.animatedElements.has(element)) return;
        
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0';
            element.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease';
            
            requestAnimationFrame(() => {
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            });
        }, delay);
        
        this.animatedElements.add(element);
    }

    triggerSlideAnimation(element) {
        if (this.animatedElements.has(element)) return;
        
        const direction = element.dataset.direction || 'left';
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
            element.style.transform = this.getSlideTransform(direction);
            element.style.opacity = '0';
            element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease';
            
            requestAnimationFrame(() => {
                element.style.transform = 'translateX(0) translateY(0)';
                element.style.opacity = '1';
            });
        }, delay);
        
        this.animatedElements.add(element);
    }

    getInitialTransform(direction) {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)',
            'scale-up': 'scale(0.8)',
            'scale-down': 'scale(1.2)',
            'rotate-left': 'rotate(-15deg)',
            'rotate-right': 'rotate(15deg)'
        };
        return transforms[direction] || transforms.up;
    }

    getSlideTransform(direction) {
        const transforms = {
            left: 'translateX(-100px)',
            right: 'translateX(100px)',
            up: 'translateY(-100px)',
            down: 'translateY(100px)'
        };
        return transforms[direction] || transforms.left;
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            this.updateParallaxElements();
            this.updateScrollProgress();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (!scrollProgress) return;

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        scrollProgress.style.width = scrolled + '%';
    }

    setupHoverEffects() {
        // Magnetic effect
        this.setupMagneticEffect();
        
        // Tilt effect
        this.setupTiltEffect();
        
        // Glow effect
        this.setupGlowEffect();
    }

    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-effect');

        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupGlowEffect() {
        const glowElements = document.querySelectorAll('.glow-effect');

        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.6)';
                element.style.transition = 'box-shadow 0.3s ease';
            });

            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }

    setupParticleEffects() {
        const particleContainers = document.querySelectorAll('.particle-container');

        particleContainers.forEach(container => {
            this.createParticles(container);
        });
    }

    createParticles(container) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            container.appendChild(particle);
        }
    }

    setupMorphingShapes() {
        const morphingShapes = document.querySelectorAll('.morphing-shape');

        morphingShapes.forEach(shape => {
            this.animateMorphing(shape);
        });
    }

    animateMorphing(element) {
        const morphStates = [
            '50%',
            '60% 40% 30% 70%',
            '40% 60% 70% 30%',
            '80% 20% 20% 80%',
            '50%'
        ];

        let currentState = 0;

        setInterval(() => {
            currentState = (currentState + 1) % morphStates.length;
            element.style.borderRadius = morphStates[currentState];
        }, 2000);
    }
}

// Text Animation Effects
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupTextReveal();
        this.setupGlitchText();
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');

        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            
            element.textContent = '';
            this.typeText(element, text, speed);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    setupTextReveal() {
        const revealElements = document.querySelectorAll('.text-reveal');

        revealElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
                element.appendChild(span);
            });

            // Trigger animation
            setTimeout(() => {
                element.querySelectorAll('span').forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }, 100);
        });
    }

    setupGlitchText() {
        const glitchElements = document.querySelectorAll('.glitch-text');

        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
            
            element.addEventListener('mouseenter', () => {
                this.startGlitch(element);
            });

            element.addEventListener('mouseleave', () => {
                this.stopGlitch(element);
            });
        });
    }

    startGlitch(element) {
        element.classList.add('glitching');
    }

    stopGlitch(element) {
        element.classList.remove('glitching');
    }
}

// Advanced CSS Animations via JavaScript
class CSSAnimationEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceButtons();
        this.enhanceCards();
        this.enhanceImages();
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn, button');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = diameter + 'px';
        circle.style.left = event.clientX - rect.left - radius + 'px';
        circle.style.top = event.clientY - rect.top - radius + 'px';
        circle.classList.add('ripple');

        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        element.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    enhanceCards() {
        const cards = document.querySelectorAll('.project-card, .skill-item, .cv-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    enhanceImages() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }
}

// Performance optimization for animations
class AnimationPerformance {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            this.disableAnimations();
        }

        this.optimizeScrollAnimations();
        this.setupVisibilityOptimization();
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, ::before, ::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeScrollAnimations() {
        let ticking = false;

        const optimizedScrollHandler = () => {
            // Only update animations that are visible
            this.updateVisibleAnimations();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(optimizedScrollHandler);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    updateVisibleAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        const viewportHeight = window.innerHeight;

        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < viewportHeight && rect.bottom > 0;

            if (isVisible) {
                element.classList.add('in-viewport');
            } else {
                element.classList.remove('in-viewport');
            }
        });
    }

    setupVisibilityOptimization() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause expensive animations when tab is not visible
                document.body.classList.add('paused-animations');
            } else {
                document.body.classList.remove('paused-animations');
            }
        });
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load
    setTimeout(() => {
        new AnimationController();
        new TextAnimations();
        new CSSAnimationEnhancer();
        new AnimationPerformance();
    }, 100);
});

// Add CSS for animations created by JavaScript
const animationStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.particle {
    position: absolute;
    background: rgba(99, 102, 241, 0.7);
    border-radius: 50%;
    pointer-events: none;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

.glitching::before,
.glitching::after {
    animation: glitch-effect 0.3s infinite;
}

@keyframes glitch-effect {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}

.paused-animations * {
    animation-play-state: paused !important;
}

.in-viewport {
    animation-play-state: running;
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
