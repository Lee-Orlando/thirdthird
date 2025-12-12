// particles.js configuration
const particlesJSConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffd700"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffd700",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// 确保我们的粒子效果实现不会与外部库冲突
// 使用立即执行函数表达式(IIFE)包装我们的实现
(() => {
    // 检查全局命名空间，避免覆盖已存在的particlesJS
    if (typeof window.particlesJS === 'undefined') {
        window.particlesJS = function(id, config) {
            // 确保配置对象存在
            config = config || {
                particles: {
                    number: { value: 50 },
                    move: { speed: 1 },
                    size: { value: 3 },
                    color: { value: '#ffd700' },
                    opacity: { value: 0.5 },
                    line_linked: { distance: 150, color: '#ffd700', width: 1, opacity: 0.4 }
                }
            };
            
            const canvas = document.createElement('canvas');
            const container = document.getElementById(id);
            if (!container) return;
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            let particles = [];

            function resizeCanvas() {
                if (!container) return;
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * (config.particles.move?.speed || 1);
                    this.vy = (Math.random() - 0.5) * (config.particles.move?.speed || 1);
                    this.radius = Math.random() * (config.particles.size?.value || 3) + (config.particles.size?.value || 3) / 2;
                    this.color = config.particles.color?.value || '#ffd700';
                    this.opacity = Math.random() * (config.particles.opacity?.value || 0.5) + 0.1;
                }
                draw() {
                    if (!ctx) return;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.opacity;
                    ctx.fill();
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }
            }

            function init() {
                particles = [];
                const particleCount = config.particles.number?.value || 50;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            init();

            function connect() {
                if (!ctx) return;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        let dist = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
                        if (dist < (config.particles.line_linked?.distance || 150)) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = config.particles.line_linked?.color || '#ffd700';
                            ctx.lineWidth = config.particles.line_linked?.width || 1;
                            ctx.globalAlpha = (config.particles.line_linked?.opacity || 0.4) * (1 - dist / (config.particles.line_linked?.distance || 150));
                            ctx.stroke();
                        }
                    }
                }
            }
            
            function animate() {
                if (!ctx) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                connect();
                requestAnimationFrame(animate);
            }
            animate();
        };
    }
})();

// Initialize particles and other functionality
document.addEventListener('DOMContentLoaded', () => {
    // 检查页面中是否存在particles-js元素
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
        particlesJS('particles-js', particlesJSConfig);
    }

    // Header scroll effect
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile nav
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile nav on link click and handle smooth scrolling
    function handleLinkClick(event) {
        event.preventDefault();
        
        // Close mobile nav if open
        if (mainNav && mainNav.classList.contains('active')) {
           if (hamburger) {
               hamburger.classList.remove('active');
           }
           mainNav.classList.remove('active');
        }
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Smooth scroll to target section
        if (targetSection) {
            // 获取header的实际高度，而不是使用硬编码值
            const headerHeight = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // Apply to nav links
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
    
    // Apply to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleLinkClick);
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            // 使用header的实际高度来计算当前可见部分
            const headerHeight = header ? header.offsetHeight : 0;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - headerHeight - 20) {
                    const sectionId = section.getAttribute('id');
                    if (sectionId) {
                        current = sectionId;
                    }
                }
            });
        
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Fade in sections on scroll
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Set copyright year
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = new Date().getFullYear();
    }


});