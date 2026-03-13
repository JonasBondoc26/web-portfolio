// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initStatCounters();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
});

// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================
function initThemeToggle() {
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
        themeToggle.innerHTML = `
            <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg class="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
        document.body.appendChild(themeToggle);
    }
    
    // Theme toggle click handler
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth color changes
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update logo images
        updateLogos(newTheme);
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
        
        // Optional: Add a subtle rotation animation
        toggleBtn.style.transform = 'scale(1.1) rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 300);
    });
    
    // Initialize logos based on current theme
    updateLogos(currentTheme);
}

// Update logo sources based on theme
function updateLogos(theme) {
    const darkLogos = document.querySelectorAll('.logo-dark');
    const lightLogos = document.querySelectorAll('.logo-light');
    
    if (theme === 'light') {
        darkLogos.forEach(logo => logo.style.display = 'none');
        lightLogos.forEach(logo => logo.style.display = 'block');
    } else {
        darkLogos.forEach(logo => logo.style.display = 'block');
        lightLogos.forEach(logo => logo.style.display = 'none');
    }
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const nav = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS (AOS)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// STAT COUNTERS
// ===================================
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    let animated = false;
    
    const animateCounters = () => {
        if (animated) return;
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                }
            };
            
            updateCounter();
        });
        
        animated = true;
    };
    
    // Trigger when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// ===================================
// SKILL BARS ANIMATION
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    const animateSkills = () => {
        if (skillsAnimated) return;
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'fillBar 1.5s ease-out forwards';
            }, index * 100);
        });
        
        skillsAnimated = true;
    };
    
    // Trigger when skills section is visible
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// ===================================
// CONTACT FORM WITH EMAILJS
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showMessage('Please fill in all fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        try {
            const response = await emailjs.send(
                'service_b8sqidt',      // service ID
                'template_95ypvs2',     // Template ID
                {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    to_email: 'jjbondoc07@gmail.com'
                }
            );
            
            console.log('Email sent successfully:', response);
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            showMessage('Sorry, something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.trim().length < 2) return false;
        if (!data.email || !emailRegex.test(data.email)) return false;
        if (!data.subject || data.subject.trim().length < 3) return false;
        if (!data.message || data.message.trim().length < 10) return false;
        
        return true;
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}
// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// PROJECT CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// CURSOR TRAIL EFFECT (F1 Racing Theme)
// ===================================
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Create trail element
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.8;
        transform: translate(-50%, -50%);
        animation: fadeTrail 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    // Remove old trails
    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    // Add animation
    if (!document.querySelector('style#cursor-trail-animation')) {
        const style = document.createElement('style');
        style.id = 'cursor-trail-animation';
        style.textContent = `
            @keyframes fadeTrail {
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after animation
    setTimeout(() => trail.remove(), 500);
});

// ===================================
// PARALLAX EFFECT FOR HERO IMAGE
// ===================================
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.scrollY;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// DYNAMIC GREETING BASED ON TIME
// ===================================
function setDynamicGreeting() {
    const heroDescription = document.querySelector('.hero-description');
    if (!heroDescription) return;
    
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good morning! ';
    } else if (hour < 18) {
        greeting = 'Good afternoon! ';
    } else {
        greeting = 'Good evening! ';
    }
    
    const originalText = heroDescription.textContent;
    heroDescription.textContent = greeting + originalText;
}

// Call on load (optional)
// setDynamicGreeting();

// ===================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c🏎️ Welcome to Jonas Bondoc\'s Portfolio!', 'color: #E10600; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s build something amazing together!', 'color: #FFD700; font-size: 14px;');
console.log('%c📧 Contact: jjbondoc07@gmail.com', 'color: var(--color-text); font-size: 12px;');

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 1000);
    }
});


// ===================================
// SCROLL PROGRESS BAR 
// ===================================
function initScrollProgress() {
    // Create the progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    // Update progress function
    function updateProgress() {
        // Get total scrollable height
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Calculate scroll percentage
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        // Clamp between 0 and 100
        const progress = Math.min(Math.max(scrolled, 0), 100);
        
        // Update progress bar width
        progressBar.style.width = progress + '%';
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });
    
    // Initial call
    updateProgress();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});