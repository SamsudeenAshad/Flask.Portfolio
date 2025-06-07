// Interactive Background Effects System
class InteractiveBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.connectionDistance = 150;
        this.particleCount = 100;
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'interactive-bg';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(99, 102, 241, ',
            'rgba(139, 92, 246, ',
            'rgba(6, 182, 212, ',
            'rgba(16, 185, 129, ',
            'rgba(245, 158, 11, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.02;
                particle.y -= dy * force * 0.02;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    const opacity = (this.connectionDistance - distance) / this.connectionDistance * 0.5;
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 3D Card Tilt Effect
class TiltEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mouseenter', () => this.handleMouseEnter(element));
            element.addEventListener('mousemove', (e) => this.handleMouseMove(element, e));
            element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
        });
    }

    handleMouseEnter(element) {
        element.style.transition = 'none';
    }

    handleMouseMove(element, e) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const rotateX = deltaY / rect.height * -30;
        const rotateY = deltaX / rect.width * 30;
        
        element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;
    }

    handleMouseLeave(element) {
        element.style.transition = 'transform 0.5s ease';
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// Parallax Scroll Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateParallax());
        this.updateParallax();
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Morphing Shapes Animation
class MorphingShapes {
    constructor() {
        this.shapes = [];
        this.init();
    }

    init() {
        this.createShapes();
        this.animate();
    }

    createShapes() {
        const container = document.createElement('div');
        container.className = 'morphing-shapes-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '-2';
        
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.position = 'absolute';
            shape.style.borderRadius = '50%';
            shape.style.background = `linear-gradient(45deg, 
                hsl(${Math.random() * 360}, 70%, 60%), 
                hsl(${Math.random() * 360}, 70%, 60%))`;
            shape.style.opacity = '0.1';
            shape.style.width = Math.random() * 200 + 100 + 'px';
            shape.style.height = shape.style.width;
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animation = `morphFloat ${15 + Math.random() * 10}s infinite ease-in-out`;
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(shape);
            this.shapes.push(shape);
        }
        
        document.body.appendChild(container);
    }

    animate() {
        this.shapes.forEach(shape => {
            const randomScale = 0.8 + Math.random() * 0.4;
            const randomRotate = Math.random() * 360;
            
            shape.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
        });
        
        setTimeout(() => this.animate(), 5000);
    }
}

// Text Reveal Animation
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-text-reveal]').forEach(element => {
            this.prepareText(element);
            observer.observe(element);
        });
    }

    prepareText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.transition = `all 0.5s ease ${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    revealText(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }
}

// Advanced Loading Animation
class AdvancedLoader {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'advanced-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-rings">
                    <div class="ring ring-1"></div>
                    <div class="ring ring-2"></div>
                    <div class="ring ring-3"></div>
                </div>
                <div class="loader-text">
                    <span>Loading</span>
                    <div class="dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            #advanced-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 1s ease;
            }
            
            .loader-content {
                text-align: center;
                color: white;
            }
            
            .loader-rings {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto 30px;
            }
            
            .ring {
                position: absolute;
                border: 3px solid transparent;
                border-radius: 50%;
                animation: spin 2s linear infinite;
            }
            
            .ring-1 {
                width: 120px;
                height: 120px;
                border-top-color: #00ffff;
                animation-delay: 0s;
            }
            
            .ring-2 {
                width: 90px;
                height: 90px;
                top: 15px;
                left: 15px;
                border-right-color: #ff006e;
                animation-delay: -0.5s;
                animation-direction: reverse;
            }
            
            .ring-3 {
                width: 60px;
                height: 60px;
                top: 30px;
                left: 30px;
                border-bottom-color: #8338ec;
                animation-delay: -1s;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loader-text {
                font-size: 24px;
                font-weight: 300;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
            }
            
            .dots span {
                animation: blink 1.5s infinite;
            }
            
            .dots span:nth-child(2) {
                animation-delay: 0.5s;
            }
            
            .dots span:nth-child(3) {
                animation-delay: 1s;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Remove loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                    style.remove();
                }, 1000);
            }, 2000);
        });
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop for performance
    if (window.innerWidth > 768) {
        new InteractiveBackground();
        new TiltEffect('.morph-card');
        new MorphingShapes();
    }
    
    new ParallaxEffect();
    new TextReveal();
    new AdvancedLoader();
});

// Add morphing animation CSS
const morphCSS = `
@keyframes morphFloat {
    0%, 100% {
        transform: translateX(0) translateY(0) scale(1) rotate(0deg);
        border-radius: 50%;
    }
    25% {
        transform: translateX(20px) translateY(-20px) scale(1.1) rotate(90deg);
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    50% {
        transform: translateX(0) translateY(-40px) scale(0.9) rotate(180deg);
        border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
    }
    75% {
        transform: translateX(-20px) translateY(-20px) scale(1.05) rotate(270deg);
        border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = morphCSS;
document.head.appendChild(styleSheet);
