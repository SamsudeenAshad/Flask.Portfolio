// Advanced Performance Monitor and Analytics
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            domContentLoadedTime: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0,
            firstInputDelay: 0,
            interactionCount: 0,
            scrollDepth: 0,
            timeOnPage: 0,
            deviceInfo: {},
            userActions: []
        };
        
        this.startTime = performance.now();
        this.isMonitoring = true;
        this.init();
    }

    init() {
        this.collectDeviceInfo();
        this.initPerformanceObserver();
        this.trackPageLoad();
        this.trackUserInteractions();
        this.trackScrollDepth();
        this.trackTimeOnPage();
        this.createPerformancePanel();
        this.bindEvents();
    }

    collectDeviceInfo() {
        this.metrics.deviceInfo = {
            userAgent: navigator.userAgent,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null,
            memory: navigator.deviceMemory || 'Unknown',
            cores: navigator.hardwareConcurrency || 'Unknown',
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onlineStatus: navigator.onLine
        };
    }

    initPerformanceObserver() {
        // Observe Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        this.metrics.cumulativeLayoutShift = clsValue;
                    }
                }
            }).observe({ entryTypes: ['layout-shift'] });

            // Navigation timing
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    this.metrics.pageLoadTime = entry.loadEventEnd - entry.loadEventStart;
                    this.metrics.domContentLoadedTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
                });
            }).observe({ entryTypes: ['navigation'] });

            // Paint timing
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                    }
                });
            }).observe({ entryTypes: ['paint'] });
        }
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            // Get navigation timing
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
                this.metrics.domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            }

            // Log performance metrics
            this.logMetrics('Page Load Complete');
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.logMetrics('DOM Content Loaded');
        });
    }

    trackUserInteractions() {
        const events = ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'];
        
        events.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.metrics.interactionCount++;
                
                // Track specific user actions
                if (eventType === 'click') {
                    const target = e.target.closest('[class*="btn"], [class*="link"], [class*="card"]');
                    if (target) {
                        this.trackUserAction('click', {
                            element: target.className,
                            position: { x: e.clientX, y: e.clientY },
                            timestamp: Date.now()
                        });
                    }
                }
            }, { passive: true });
        });
    }

    trackScrollDepth() {
        let maxScrollDepth = 0;
        
        const updateScrollDepth = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                this.metrics.scrollDepth = Math.round(maxScrollDepth);
            }
        };

        window.addEventListener('scroll', this.debounce(updateScrollDepth, 100), { passive: true });
    }

    trackTimeOnPage() {
        setInterval(() => {
            if (this.isMonitoring && !document.hidden) {
                this.metrics.timeOnPage = Math.round((performance.now() - this.startTime) / 1000);
            }
        }, 1000);

        // Pause tracking when page is hidden
        document.addEventListener('visibilitychange', () => {
            this.isMonitoring = !document.hidden;
        });
    }

    trackUserAction(action, data) {
        this.metrics.userActions.push({
            action,
            data,
            timestamp: Date.now(),
            timeFromStart: Math.round((performance.now() - this.startTime) / 1000)
        });

        // Keep only last 50 actions to prevent memory issues
        if (this.metrics.userActions.length > 50) {
            this.metrics.userActions = this.metrics.userActions.slice(-50);
        }
    }

    createPerformancePanel() {
        // Only show in development or when explicitly enabled
        if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
            const panel = document.createElement('div');
            panel.id = 'performance-panel';
            panel.innerHTML = `
                <div class="perf-header">
                    <span class="perf-title">
                        <i class="fas fa-tachometer-alt"></i>
                        Performance Monitor
                    </span>
                    <button class="perf-toggle" onclick="this.parentElement.parentElement.classList.toggle('minimized')">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="perf-content">
                    <div class="perf-metrics">
                        <div class="metric">
                            <label>Page Load Time:</label>
                            <span id="perf-load-time">--</span>
                        </div>
                        <div class="metric">
                            <label>DOM Ready:</label>
                            <span id="perf-dom-time">--</span>
                        </div>
                        <div class="metric">
                            <label>FCP:</label>
                            <span id="perf-fcp">--</span>
                        </div>
                        <div class="metric">
                            <label>LCP:</label>
                            <span id="perf-lcp">--</span>
                        </div>
                        <div class="metric">
                            <label>CLS:</label>
                            <span id="perf-cls">--</span>
                        </div>
                        <div class="metric">
                            <label>Interactions:</label>
                            <span id="perf-interactions">0</span>
                        </div>
                        <div class="metric">
                            <label>Scroll Depth:</label>
                            <span id="perf-scroll">0%</span>
                        </div>
                        <div class="metric">
                            <label>Time on Page:</label>
                            <span id="perf-time">0s</span>
                        </div>
                    </div>
                    <div class="perf-actions">
                        <button onclick="window.performanceMonitor.exportMetrics()" class="perf-export">
                            <i class="fas fa-download"></i> Export
                        </button>
                        <button onclick="window.performanceMonitor.clearMetrics()" class="perf-clear">
                            <i class="fas fa-trash"></i> Clear
                        </button>
                    </div>
                </div>
            `;

            this.addPanelStyles();
            document.body.appendChild(panel);
            
            // Update panel every second
            setInterval(() => this.updatePanel(), 1000);
        }
    }

    addPanelStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #performance-panel {
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 320px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid #333;
                border-radius: 8px;
                color: #fff;
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                z-index: 10000;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }

            #performance-panel.minimized .perf-content {
                display: none;
            }

            .perf-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: rgba(255, 255, 255, 0.1);
                border-bottom: 1px solid #333;
                border-radius: 8px 8px 0 0;
            }

            .perf-title {
                font-weight: bold;
                color: #00ffff;
            }

            .perf-toggle {
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                padding: 2px 5px;
                border-radius: 3px;
                transition: background 0.2s;
            }

            .perf-toggle:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .perf-content {
                padding: 15px;
            }

            .perf-metrics {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin-bottom: 15px;
            }

            .metric {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .metric label {
                color: #ccc;
            }

            .metric span {
                color: #00ffff;
                font-weight: bold;
            }

            .perf-actions {
                display: flex;
                gap: 10px;
            }

            .perf-export, .perf-clear {
                flex: 1;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                color: #fff;
                cursor: pointer;
                font-size: 11px;
                transition: all 0.2s;
            }

            .perf-export:hover {
                background: rgba(0, 255, 255, 0.2);
                border-color: #00ffff;
            }

            .perf-clear:hover {
                background: rgba(255, 0, 110, 0.2);
                border-color: #ff006e;
            }

            @media (max-width: 768px) {
                #performance-panel {
                    width: 280px;
                    bottom: 10px;
                    left: 10px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    updatePanel() {
        const updates = {
            'perf-load-time': this.formatTime(this.metrics.pageLoadTime),
            'perf-dom-time': this.formatTime(this.metrics.domContentLoadedTime),
            'perf-fcp': this.formatTime(this.metrics.firstContentfulPaint),
            'perf-lcp': this.formatTime(this.metrics.largestContentfulPaint),
            'perf-cls': this.metrics.cumulativeLayoutShift.toFixed(3),
            'perf-interactions': this.metrics.interactionCount,
            'perf-scroll': this.metrics.scrollDepth + '%',
            'perf-time': this.metrics.timeOnPage + 's'
        };

        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    formatTime(ms) {
        if (!ms || ms === 0) return '--';
        return ms < 1000 ? Math.round(ms) + 'ms' : (ms / 1000).toFixed(2) + 's';
    }

    exportMetrics() {
        const exportData = {
            ...this.metrics,
            exportTime: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-metrics-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    clearMetrics() {
        this.metrics.interactionCount = 0;
        this.metrics.userActions = [];
        this.logMetrics('Metrics Cleared');
    }

    logMetrics(event) {
        if (console.groupCollapsed) {
            console.groupCollapsed(`🚀 Performance: ${event}`);
            console.table(this.metrics);
            console.groupEnd();
        }
    }

    bindEvents() {
        // Log metrics on page unload
        window.addEventListener('beforeunload', () => {
            this.logMetrics('Page Unload');
        });

        // Track errors
        window.addEventListener('error', (e) => {
            this.trackUserAction('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
    }

    debounce(func, wait) {
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

    // Public API methods
    getMetrics() {
        return { ...this.metrics };
    }

    getWebVitals() {
        return {
            fcp: this.metrics.firstContentfulPaint,
            lcp: this.metrics.largestContentfulPaint,
            cls: this.metrics.cumulativeLayoutShift,
            fid: this.metrics.firstInputDelay
        };
    }

    getUserEngagement() {
        return {
            timeOnPage: this.metrics.timeOnPage,
            scrollDepth: this.metrics.scrollDepth,
            interactions: this.metrics.interactionCount,
            actions: this.metrics.userActions.length
        };
    }
}

// Initialize performance monitor
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
});

// Export for external use
window.PerformanceMonitor = PerformanceMonitor;
