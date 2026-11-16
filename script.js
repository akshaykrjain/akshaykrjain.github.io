// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

toggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Typing effect for the hero title
const titles = [
  'Platform Engineer',
  'DevOps & Cloud Engineer',
  'Site Reliability Engineer',
  'Infrastructure Builder'
];

const typedEl = document.querySelector('.typed-text');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function type() {
  if (!typedEl) return;

  const current = titles[titleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

setTimeout(type, 600);

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Subtle reveal on scroll for cards
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.skill-category, .timeline-item, .about-card, .stat-card, .cert-card, .education-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Animate stat numbers on scroll
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const finalValue = stat.textContent;
          const numericValue = parseInt(finalValue);
          if (!isNaN(numericValue)) {
            const suffix = finalValue.replace(/[0-9]/g, '');
            animateNumber(stat, 0, numericValue, 1500, suffix);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateNumber(element, start, end, duration, suffix) {
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

