// Main JavaScript file for AGI ePortfolio
// Handles all interactive features, animations, and user interactions

// Global variables
let particleSystem;
let skillsRadarChart;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroAnimations();
    initializeProjectFilters();
    initializeSkillsVisualization();
    initializeScrollAnimations();
    initializeParticleSystem();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation item on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-teal-600');
        link.classList.add('text-gray-700', 'hover:text-gray-900');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700', 'hover:text-gray-900');
            link.classList.add('text-teal-600');
        }
    });
}

// Hero section animations
function initializeHeroAnimations() {
    // Typewriter effect for hero text
    if (document.getElementById('typed-text')) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Applied Geoinformatics',
                'Geospatial Analysis',
                'Environmental Monitoring',
                'Data Visualization'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Animate hero elements on load
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-bg .content-overlay img',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800
    })
    .add({
        targets: '.hero-bg .content-overlay h1',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000
    }, '-=500')
    .add({
        targets: '.hero-bg .content-overlay p',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=800')
    .add({
        targets: '.hero-bg .content-overlay .flex',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
    }, '-=600');
}

// Project filtering system
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.9],
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Skills radar visualization
function initializeSkillsVisualization() {
    const chartContainer = document.getElementById('skills-radar');
    if (!chartContainer) return;

    const radarChart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: 'Technical Skills',
            left: 'center',
            textStyle: {
                color: '#374151',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'GIS Software', max: 100 },
                { name: 'Web Development', max: 100 },
                { name: 'Data Analysis', max: 100 },
                { name: 'R Programming', max: 100 },
                { name: 'Databases', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#6B7280',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#E5E7EB'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(44, 95, 93, 0.05)', 'rgba(143, 166, 142, 0.05)']
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [90, 85, 75, 80, 75, 70],
                name: 'Current Level',
                areaStyle: {
                    color: 'rgba(44, 95, 93, 0.3)'
                },
                lineStyle: {
                    color: '#2C5F5D',
                    width: 2
                },
                itemStyle: {
                    color: '#2C5F5D'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    radarChart.setOption(option);

    // Resize chart on window resize
    window.addEventListener('resize', () => {
        radarChart.resize();
    });

    skillsRadarChart = radarChart;
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .project-card, .course-card, .skill-item').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                anime({
                    targets: bar,
                    width: width,
                    duration: 1500,
                    easing: 'easeOutQuart',
                    delay: 200
                });
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
}

function animateElement(element) {
    if (element.classList.contains('timeline-item')) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: 200
        });
    } else if (element.classList.contains('project-card') || element.classList.contains('course-card')) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 600,
            easing: 'easeOutQuart'
        });
    } else if (element.classList.contains('skill-item')) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 500,
            easing: 'easeOutQuart',
            delay: anime.stagger(100)
        });
    }
}

// Particle system for hero background
function initializeParticleSystem() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    // p5.js sketch for particle system
    const sketch = (p) => {
        let particles = [];
        const numParticles = 50;

        p.setup = () => {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(p));
            }
        };

        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            drawConnections(p, particles);
        };

        p.windowResized = () => {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };

        class Particle {
            constructor(p) {
                this.p = p;
                this.x = p.random(p.width);
                this.y = p.random(p.height);
                this.vx = p.random(-0.5, 0.5);
                this.vy = p.random(-0.5, 0.5);
                this.size = p.random(2, 4);
                this.opacity = p.random(0.3, 0.8);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = this.p.width;
                if (this.x > this.p.width) this.x = 0;
                if (this.y < 0) this.y = this.p.height;
                if (this.y > this.p.height) this.y = 0;
            }

            draw() {
                this.p.fill(255, 255, 255, this.opacity * 255);
                this.p.noStroke();
                this.p.ellipse(this.x, this.y, this.size);
            }
        }

        function drawConnections(p, particles) {
            const maxDistance = 100;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const distance = p.dist(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    
                    if (distance < maxDistance) {
                        const alpha = p.map(distance, 0, maxDistance, 0.3, 0);
                        p.stroke(255, 255, 255, alpha * 255);
                        p.strokeWeight(1);
                        p.line(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                    }
                }
            }
        }
    };

    new p5(sketch);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
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

// Performance optimization
const debouncedResize = debounce(() => {
    if (skillsRadarChart) {
        skillsRadarChart.resize();
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
});

// Export functions for use in other scripts
window.Portfolio = {
    initializeNavigation,
    initializeHeroAnimations,
    initializeProjectFilters,
    initializeSkillsVisualization,
    initializeScrollAnimations,
    initializeParticleSystem,
    initializeMobileMenu
};