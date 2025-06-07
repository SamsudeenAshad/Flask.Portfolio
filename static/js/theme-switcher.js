// Theme Switcher with Advanced Animations
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.themes = {
            dark: {
                '--bg-primary': '#0a0a0a',
                '--bg-secondary': '#1a1a1a',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b0b0b0',
                '--accent-color': '#00ffff',
                '--card-bg': 'rgba(255, 255, 255, 0.05)',
                '--border-color': 'rgba(255, 255, 255, 0.1)'
            },
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f8f9fa',
                '--text-primary': '#2d3748',
                '--text-secondary': '#718096',
                '--accent-color': '#3182ce',
                '--card-bg': 'rgba(0, 0, 0, 0.05)',
                '--border-color': 'rgba(0, 0, 0, 0.1)'
            },
            neon: {
                '--bg-primary': '#000814',
                '--bg-secondary': '#001d3d',
                '--text-primary': '#00ffff',
                '--text-secondary': '#ff006e',
                '--accent-color': '#ffbe0b',
                '--card-bg': 'rgba(0, 255, 255, 0.1)',
                '--border-color': 'rgba(255, 0, 110, 0.3)'
            },
            sunset: {
                '--bg-primary': '#2d1b69',
                '--bg-secondary': '#11055b',
                '--text-primary': '#f72585',
                '--text-secondary': '#b5179e',
                '--accent-color': '#f72585',
                '--card-bg': 'rgba(247, 37, 133, 0.1)',
                '--border-color': 'rgba(181, 23, 158, 0.3)'
            }
        };
        this.init();
    }

    init() {
        this.createThemeSwitcher();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    createThemeSwitcher() {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <div class="theme-toggle">
                <button class="theme-btn" data-theme="dark" title="Dark Theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="theme-btn" data-theme="light" title="Light Theme">
                    <i class="fas fa-sun"></i>
                </button>
                <button class="theme-btn" data-theme="neon" title="Neon Theme">
                    <i class="fas fa-bolt"></i>
                </button>
                <button class="theme-btn" data-theme="sunset" title="Sunset Theme">
                    <i class="fas fa-palette"></i>
                </button>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-switcher {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                z-index: 1000;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border-radius: 25px;
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }
            
            .theme-switcher:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-50%) scale(1.05);
            }
            
            .theme-toggle {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .theme-btn {
                width: 45px;
                height: 45px;
                border: none;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            
            .theme-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                transition: left 0.6s ease;
            }
            
            .theme-btn:hover::before {
                left: 100%;
            }
            
            .theme-btn:hover {
                transform: scale(1.1);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .theme-btn.active {
                background: var(--accent-color);
                color: white;
                box-shadow: 0 0 20px var(--accent-color);
            }
            
            @media (max-width: 768px) {
                .theme-switcher {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    top: auto;
                    transform: none;
                    flex-direction: row;
                }
                
                .theme-toggle {
                    flex-direction: row;
                }
                
                .theme-btn {
                    width: 40px;
                    height: 40px;
                    font-size: 14px;
                }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(themeSwitcher);
    }

    bindEvents() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.switchTheme(theme);
            });
        });
    }

    switchTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            this.applyTheme(themeName);
            localStorage.setItem('portfolio-theme', themeName);
            
            // Add transition effect
            this.addTransitionEffect();
            
            // Update active button
            this.updateActiveButton(themeName);
            
            // Trigger special effects
            this.triggerThemeChangeEffect();
        }
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
        
        document.body.dataset.theme = themeName;
    }

    updateActiveButton(themeName) {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-theme="${themeName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    addTransitionEffect() {
        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    triggerThemeChangeEffect() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'theme-change-ripple';
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-color), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: themeRipple 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 9999;
        `;
        
        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            @keyframes themeRipple {
                to {
                    transform: translate(-50%, -50%) scale(100);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(rippleStyles);
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            document.body.removeChild(ripple);
            document.head.removeChild(rippleStyles);
        }, 800);
    }
}

// Initialize theme switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});

// Export for potential external use
window.ThemeSwitcher = ThemeSwitcher;
