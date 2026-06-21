// ========== NAV ACTIVE + SMOOTH SCROLL ==========
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
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
}

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]')?.value?.trim();
    const email = contactForm.querySelector('input[type="email"]')?.value?.trim();
    const message = contactForm.querySelector('textarea')?.value?.trim();

    if (name && email && message) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Send Message';

      if (submitBtn) {
        submitBtn.textContent = 'Message Sent! ✓';
      }

      contactForm.reset();

      setTimeout(() => {
        if (submitBtn) submitBtn.textContent = originalText;
      }, 3000);
    } else {
      alert('Please fill in all fields!');
    }
  });
}

// ========== OPTIONAL: Scroll to top button (no extra styling changes required) ==========
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';

// Add minimal styling inline so it works even if CSS class was removed.
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #22d3ee, #a78bfa);
  color: #070a16;
  cursor: pointer;
  display: none;
  z-index: 9999;
  font-size: 1.1rem;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'grid' : 'none';
  scrollToTopBtn.style.placeItems = 'center';
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

