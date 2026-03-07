<<<<<<< HEAD
// ========================================
// ELITE PORTFOLIO - JAVASCRIPT
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initAnimations();
  initCounters();
  initRotatingText();
  initFormHandling();
  initResumeButton();
  initTechStackAnimations();
  initSmoothAnimations();
});


// ========================================
// PARTICLES BACKGROUND
// ========================================
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(0, 217, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10%, 90% {
        opacity: 1;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========================================
// THEME TOGGLE
// ========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('i');
  
  if (!themeToggle) return;
  
  // Check for saved theme, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate skill bars
        if (entry.target.classList.contains('skill-card')) {
          const levelBar = entry.target.querySelector('.level-bar');
          if (levelBar) {
            levelBar.style.width = levelBar.style.getPropertyValue('--level');
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  document.querySelectorAll('section, .skill-card, .expertise-card, .project-card-modern, .cert-card-elite').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Start animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// ========================================
// ROTATING TEXT
// ========================================
function initRotatingText() {
  const rotatingText = document.getElementById('rotatingText');
  if (!rotatingText) return;
  
  const words = ['The Future', 'Innovation', 'Solutions', 'Excellence'];
  let currentIndex = 0;
  
  setInterval(() => {
    rotatingText.style.opacity = '0';
    rotatingText.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      rotatingText.textContent = words[currentIndex];
      rotatingText.style.opacity = '1';
      rotatingText.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
  
  // Add transition styles
  rotatingText.style.transition = 'all 0.3s ease';
}

// ========================================
// FORM HANDLING
// ========================================
function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:arnavjain711@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})

${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
    button.style.background = 'linear-gradient(135deg, #06dba8 0%, #059669 100%)';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
      contactForm.reset();
    }, 3000);
  });
  
  // Add focus effects to form inputs
  const formInputs = document.querySelectorAll('.form-group-modern input, .form-group-modern textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// ========================================
// RESUME BUTTON HANDLER
// ========================================
function initResumeButton() {
  const resumeBtns = document.querySelectorAll('#resumeBtn, #heroResumeBtn');
  
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create a simple resume download
      // Replace with your actual resume URL
      const resumeLink = 'resume.pdf';
      
      // Show feedback
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
        
        // For now, show an alert
        alert('Resume download feature coming soon! Please update the resume.pdf file in the portfolio folder.');
        
        // Once you have a resume.pdf file, uncomment this:
        // const link = document.createElement('a');
        // link.href = resumeLink;
        // link.download = 'Arnav_Jain_Resume.pdf';
        // link.click();
      }, 200);
    });
  });
}

// ========================================
// TECH STACK ANIMATIONS
// ========================================
function initTechStackAnimations() {
  const techFills = document.querySelectorAll('.tech-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.style.width;
        fill.style.setProperty('--fill-width', width);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  
  techFills.forEach(fill => observer.observe(fill));
}

// ========================================
// SMOOTH SCROLL ANIMATIONS ON SCROLL
// ========================================
function initSmoothAnimations() {
  // Add staggered animations to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.style.opacity = '1';
  });
  
  // Animate testimonial cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.testimonial-card, .tech-category').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Parallax for floating cards
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    const speed = 0.5 + (index * 0.2);
    card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });
  
  // Parallax for hero section
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 800);
  }
  
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 - scrolled * 0.0002})`;
  }
});

// ========================================
// HOVER EFFECTS FOR SKILLS
// ========================================
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================================
// PROJECT CARD HOVER EFFECTS
// ========================================
document.querySelectorAll('.project-card-modern').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    const header = this.querySelector('.project-card-header');
    if (header) {
      header.style.transform = 'scale(1.1)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    const header = this.querySelector('.project-card-header');
    if (header) {
      header.style.transform = 'scale(1)';
    }
  });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

console.log('🚀 Elite Portfolio Loaded Successfully!');
=======
// ========================================
// ELITE PORTFOLIO - JAVASCRIPT
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // initCustomCursor(); <--- REMOVED
  initParticles();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initAnimations();
  initCounters();
  initRotatingText();
  initFormHandling();
});


// ========================================
// PARTICLES BACKGROUND
// ========================================
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10%, 90% {
        opacity: 1;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========================================
// THEME TOGGLE
// ========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('i');
  
  if (!themeToggle) return;
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate skill bars
        if (entry.target.classList.contains('skill-card')) {
          const levelBar = entry.target.querySelector('.level-bar');
          if (levelBar) {
            levelBar.style.width = levelBar.style.getPropertyValue('--level');
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  document.querySelectorAll('section, .skill-card, .expertise-card, .project-card-modern, .cert-card-elite').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Start animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// ========================================
// ROTATING TEXT
// ========================================
function initRotatingText() {
  const rotatingText = document.getElementById('rotatingText');
  if (!rotatingText) return;
  
  const words = ['The Future', 'Innovation', 'Solutions', 'Excellence'];
  let currentIndex = 0;
  
  setInterval(() => {
    rotatingText.style.opacity = '0';
    rotatingText.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      rotatingText.textContent = words[currentIndex];
      rotatingText.style.opacity = '1';
      rotatingText.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
  
  // Add transition styles
  rotatingText.style.transition = 'all 0.3s ease';
}

// ========================================
// FORM HANDLING
// ========================================
function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:arnavjain711@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})

${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
    button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
      contactForm.reset();
    }, 3000);
  });
  
  // Add focus effects to form inputs
  const formInputs = document.querySelectorAll('.form-group-modern input, .form-group-modern textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Parallax for floating cards
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    const speed = 0.5 + (index * 0.2);
    card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });
  
  // Parallax for hero section
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 800);
  }
  
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 - scrolled * 0.0002})`;
  }
});

// ========================================
// HOVER EFFECTS FOR SKILLS
// ========================================
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================================
// PROJECT CARD HOVER EFFECTS
// ========================================
document.querySelectorAll('.project-card-modern').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    const header = this.querySelector('.project-card-header');
    if (header) {
      header.style.transform = 'scale(1.1)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    const header = this.querySelector('.project-card-header');
    if (header) {
      header.style.transform = 'scale(1)';
    }
  });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});


console.log('🚀 Elite Portfolio Loaded Successfully!');
>>>>>>> 99f300b01b021fe16190c19a4889e615068c732b
