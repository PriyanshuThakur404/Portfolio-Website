// ========== TYPING ANIMATION ==========
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

const texts = [
    'IoT & Embedded Systems Developer',
    'Cloud Computing Enthusiast',
    'Arduino & ESP32 Specialist',
    'Hardware-Software Integration Expert'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        typingText.textContent += currentText[charIndex];
        charIndex++;
        setTimeout(type, 80);
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, 40);
    } else if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

type();

// ========== SMOOTH SCROLL & ACTIVE NAV ==========
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        // Here you can add your form submission logic
        // For now, we'll show a success message
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #00cc99)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    } else {
        alert('Please fill in all fields!');
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items
const cards = document.querySelectorAll(
    '.project-card, .cert-card, .stat, .skill-category, .timeline-content'
);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== PARTICLE EFFECT (Optional - Mouse Follow) ==========
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ========== BUTTON RIPPLE EFFECT ==========
const buttons = document.querySelectorAll('.btn, .project-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== SCROLL TO TOP BUTTON ==========
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4ff, #0099cc);
    color: #0a0e27;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
});

// ========== STATS COUNTER ANIMATION ==========
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                animateNumber(stat);
            });
        }
    });
});

function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent.match(/\d+/)[0] + 
                                 element.textContent.match(/[^\d]/)[0];
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + 
                                 element.textContent.match(/[^\d]/)[0];
        }
    }, 30);
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========== DYNAMIC SKILL TAG ANIMATION ==========
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.animation = `slideInLeft 0.5s ease forwards`;
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ========== PROJECT CARD HOVER EFFECT ==========
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.perspective = '1000px';
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
});

// ========== JOURNEY SECTION SCROLL ANIMATIONS ==========
const journeyItems = document.querySelectorAll('.journey-item');

const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

journeyItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    journeyObserver.observe(item);
});

// ========== PARTICLE EFFECTS ==========
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    const colors = ['#00d4ff', '#ff006e', '#0099cc'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// ========== HERO SECTION ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroSocial = document.querySelector('.social-icons');
    const profileContainer = document.querySelector('.profile-container');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroGreeting) {
        heroGreeting.style.opacity = '0';
        heroGreeting.style.animation = 'fadeInUp 0.8s ease forwards';
        heroGreeting.style.animationDelay = '0.2s';
    }
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
        heroTitle.style.animationDelay = '0.4s';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.animation = 'fadeInUp 0.8s ease forwards';
        heroSubtitle.style.animationDelay = '0.6s';
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.animation = 'fadeInUp 0.8s ease forwards';
        heroDescription.style.animationDelay = '0.8s';
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.animation = 'fadeInUp 0.8s ease forwards';
        heroButtons.style.animationDelay = '1s';
    }
    
    if (heroSocial) {
        heroSocial.style.opacity = '0';
        heroSocial.style.animation = 'fadeIn 1s ease forwards';
        heroSocial.style.animationDelay = '1.2s';
    }
    
    if (profileContainer) {
        profileContainer.style.opacity = '0';
        profileContainer.style.animation = 'fadeIn 1s ease forwards';
        profileContainer.style.animationDelay = '0.5s';
    }
    
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = 'fadeIn 0.8s ease forwards';
        card.style.animationDelay = `${1 + index * 0.3}s`;
    });
});

// ========== SECTION TITLE ANIMATIONS ==========
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateX(-50%) translateY(20px)';
    title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    titleObserver.observe(title);
});

// ========== PARALLAX EFFECT FOR CIRCUIT BG ==========
const circuitBg = document.querySelector('.circuit-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (circuitBg) {
        circuitBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========== PROCESS CARDS ANIMATION ==========
const processCards = document.querySelectorAll('.process-card');

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, {
    threshold: 0.2
});

processCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
    processObserver.observe(card);
});

// ========== SKILL PROGRESS BARS ANIMATION ==========
const skillProgressBars = document.querySelectorAll('.skill-progress-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width;
        }
    });
}, {
    threshold: 0.5
});

skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ========== INITIALIZE ==========
console.log('🔥 Portfolio loaded successfully! Created by Priyanshu - Enhanced with animations!');
