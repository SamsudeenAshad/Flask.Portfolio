// Advanced Skills Showcase with Interactive Charts
class SkillsShowcase {
    constructor() {
        this.skills = {
            'Programming Languages': [
                { name: 'Python', level: 95, icon: 'fab fa-python', color: '#3776ab' },
                { name: 'JavaScript', level: 90, icon: 'fab fa-js-square', color: '#f7df1e' },
                { name: 'Java', level: 85, icon: 'fab fa-java', color: '#ed8b00' },
                { name: 'C++', level: 80, icon: 'fas fa-code', color: '#00599c' },
                { name: 'SQL', level: 88, icon: 'fas fa-database', color: '#336791' }
            ],
            'Frameworks & Libraries': [
                { name: 'React', level: 92, icon: 'fab fa-react', color: '#61dafb' },
                { name: 'Flask/Django', level: 90, icon: 'fas fa-server', color: '#092e20' },
                { name: 'TensorFlow', level: 87, icon: 'fas fa-brain', color: '#ff6f00' },
                { name: 'Node.js', level: 85, icon: 'fab fa-node-js', color: '#339933' },
                { name: 'Bootstrap', level: 88, icon: 'fab fa-bootstrap', color: '#7952b3' }
            ],
            'Tools & Technologies': [
                { name: 'Git/GitHub', level: 93, icon: 'fab fa-git-alt', color: '#f05032' },
                { name: 'Docker', level: 82, icon: 'fab fa-docker', color: '#2496ed' },
                { name: 'AWS', level: 80, icon: 'fab fa-aws', color: '#ff9900' },
                { name: 'MongoDB', level: 85, icon: 'fas fa-leaf', color: '#47a248' },
                { name: 'Redis', level: 78, icon: 'fas fa-memory', color: '#dc382d' }
            ]
        };
        this.init();
    }

    init() {
        this.createSkillsSection();
        this.bindEvents();
        this.initIntersectionObserver();
    }

    createSkillsSection() {
        const skillsContainer = document.querySelector('#skills .container');
        if (!skillsContainer) return;

        // Create enhanced skills grid
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'advanced-skills-grid';
        skillsGrid.innerHTML = this.generateSkillsHTML();

        // Add styles
        this.addSkillsStyles();

        // Insert after existing content
        skillsContainer.appendChild(skillsGrid);
    }

    generateSkillsHTML() {
        let html = '';
        
        Object.entries(this.skills).forEach(([category, skills], categoryIndex) => {
            html += `
                <div class="skill-category" data-category="${categoryIndex}">
                    <h3 class="skill-category-title">
                        <span class="category-icon">
                            <i class="fas fa-${this.getCategoryIcon(category)}"></i>
                        </span>
                        ${category}
                    </h3>
                    <div class="skills-list">
                        ${skills.map((skill, index) => this.generateSkillItem(skill, index)).join('')}
                    </div>
                </div>
            `;
        });

        return html;
    }

    generateSkillItem(skill, index) {
        return `
            <div class="advanced-skill-item" data-skill="${skill.name}" data-level="${skill.level}" data-index="${index}">
                <div class="skill-header">
                    <div class="skill-icon" style="color: ${skill.color}">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">0%</span>
                    </div>
                </div>
                <div class="skill-progress-container">
                    <div class="skill-progress-bg">
                        <div class="skill-progress-fill" 
                             style="--progress-color: ${skill.color}; --target-width: ${skill.level}%">
                        </div>
                    </div>
                </div>
                <div class="skill-tooltip">
                    <div class="tooltip-content">
                        <strong>${skill.name}</strong>
                        <p>Proficiency: ${skill.level}%</p>
                        <div class="tooltip-stars">
                            ${this.generateStars(skill.level)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(level) {
        const stars = Math.round(level / 20);
        let html = '';
        for (let i = 0; i < 5; i++) {
            html += `<i class="fas fa-star ${i < stars ? 'filled' : ''}"></i>`;
        }
        return html;
    }

    getCategoryIcon(category) {
        const icons = {
            'Programming Languages': 'code',
            'Frameworks & Libraries': 'cube',
            'Tools & Technologies': 'tools'
        };
        return icons[category] || 'star';
    }

    addSkillsStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .advanced-skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 40px;
                margin-top: 50px;
                padding: 30px 0;
            }

            .skill-category {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 30px;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .skill-category::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: var(--gradient-holographic);
                opacity: 0;
                border-radius: 20px;
                z-index: -1;
                transition: opacity 0.4s ease;
            }

            .skill-category:hover::before {
                opacity: 0.3;
            }

            .skill-category:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-holographic);
            }

            .skill-category-title {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
                font-size: 1.4rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            .category-icon {
                width: 50px;
                height: 50px;
                background: var(--gradient-cyber);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: white;
                box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
            }

            .skills-list {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .advanced-skill-item {
                position: relative;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 15px;
                padding: 20px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }

            .advanced-skill-item:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(10px);
                border-color: var(--neon-blue);
            }

            .skill-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 15px;
            }

            .skill-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                transition: all 0.3s ease;
            }

            .advanced-skill-item:hover .skill-icon {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }

            .skill-info {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .skill-name {
                font-weight: 600;
                color: var(--text-primary);
                font-size: 1rem;
            }

            .skill-percentage {
                font-weight: 700;
                color: var(--neon-blue);
                font-size: 1.1rem;
                font-family: 'JetBrains Mono', monospace;
            }

            .skill-progress-container {
                position: relative;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
            }

            .skill-progress-bg {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .skill-progress-fill {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, var(--progress-color), rgba(255, 255, 255, 0.8));
                border-radius: 4px;
                position: relative;
                transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
            }

            .skill-progress-fill::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
                animation: skillShine 2s infinite;
            }

            .skill-progress-fill.animate {
                width: var(--target-width) !important;
            }

            .skill-tooltip {
                position: absolute;
                top: -120px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid var(--neon-blue);
                border-radius: 10px;
                padding: 15px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                min-width: 200px;
                text-align: center;
            }

            .skill-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 8px solid transparent;
                border-top-color: var(--neon-blue);
            }

            .advanced-skill-item:hover .skill-tooltip {
                opacity: 1;
                visibility: visible;
                top: -130px;
            }

            .tooltip-content strong {
                color: var(--neon-blue);
                font-size: 1.1rem;
                display: block;
                margin-bottom: 5px;
            }

            .tooltip-content p {
                color: var(--text-secondary);
                margin: 5px 0;
                font-size: 0.9rem;
            }

            .tooltip-stars {
                display: flex;
                justify-content: center;
                gap: 3px;
                margin-top: 8px;
            }

            .tooltip-stars .fa-star {
                color: #ddd;
                font-size: 0.8rem;
            }

            .tooltip-stars .fa-star.filled {
                color: #ffd700;
            }

            @keyframes skillShine {
                0% { left: -100%; }
                100% { left: 100%; }
            }

            @media (max-width: 768px) {
                .advanced-skills-grid {
                    grid-template-columns: 1fr;
                    gap: 25px;
                    margin-top: 30px;
                }

                .skill-category {
                    padding: 20px;
                }

                .skill-tooltip {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        `;

        document.head.appendChild(styles);
    }

    bindEvents() {
        // Add click events for skill items
        document.addEventListener('click', (e) => {
            const skillItem = e.target.closest('.advanced-skill-item');
            if (skillItem) {
                this.highlightSkill(skillItem);
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusedSkill = document.activeElement.closest('.advanced-skill-item');
                if (focusedSkill) {
                    e.preventDefault();
                    this.navigateSkills(e.shiftKey ? -1 : 1);
                }
            }
        });
    }

    highlightSkill(skillItem) {
        // Remove previous highlights
        document.querySelectorAll('.advanced-skill-item.highlighted').forEach(item => {
            item.classList.remove('highlighted');
        });

        // Add highlight to clicked skill
        skillItem.classList.add('highlighted');
        
        // Add temporary glow effect
        skillItem.style.boxShadow = '0 0 30px var(--neon-blue)';
        setTimeout(() => {
            skillItem.style.boxShadow = '';
        }, 1500);
    }

    navigateSkills(direction) {
        const skills = Array.from(document.querySelectorAll('.advanced-skill-item'));
        const currentIndex = skills.findIndex(skill => skill.classList.contains('highlighted'));
        const nextIndex = (currentIndex + direction + skills.length) % skills.length;
        
        this.highlightSkill(skills[nextIndex]);
        skills[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillCategory(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach(category => {
            observer.observe(category);
        });
    }

    animateSkillCategory(category) {
        const skills = category.querySelectorAll('.advanced-skill-item');
        
        skills.forEach((skill, index) => {
            setTimeout(() => {
                const progressBar = skill.querySelector('.skill-progress-fill');
                const percentage = skill.querySelector('.skill-percentage');
                const targetLevel = parseInt(skill.dataset.level);
                
                // Animate progress bar
                progressBar.classList.add('animate');
                
                // Animate percentage counter
                this.animateCounter(percentage, 0, targetLevel, 2000);
                
                // Add entrance animation
                skill.style.transform = 'translateX(-50px)';
                skill.style.opacity = '0';
                
                setTimeout(() => {
                    skill.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    skill.style.transform = 'translateX(0)';
                    skill.style.opacity = '1';
                }, 100);
                
            }, index * 200);
        });
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(start + (end - start) * this.easeOutQuart(progress));
            
            element.textContent = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Initialize skills showcase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        new SkillsShowcase();
    }, 500);
});

// Export for potential external use
window.SkillsShowcase = SkillsShowcase;
