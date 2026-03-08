// ========================================
// ELITE PORTFOLIO - JAVASCRIPT
// ========================================

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

function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.cssText = `position:absolute;width:${Math.random()*4+1}px;height:${Math.random()*4+1}px;background:rgba(0,217,255,${Math.random()*0.5+0.2});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:float ${Math.random()*10+10}s linear infinite;animation-delay:${Math.random()*5}s;`;
    c.appendChild(p);
  }
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  });
}

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const open = () => { hamburger.classList.add('active'); menu.classList.add('active'); document.body.style.overflow = 'hidden'; };
  const close = () => { hamburger.classList.remove('active'); menu.classList.remove('active'); document.body.style.overflow = ''; };

  hamburger.addEventListener('click', e => { e.stopPropagation(); menu.classList.contains('active') ? close() : open(); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved, icon);
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next, icon);
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function initAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        const bar = e.target.querySelector('.level-bar');
        if (bar) bar.style.width = bar.style.getPropertyValue('--level');
      }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -100px 0px'});
  document.querySelectorAll('section, .skill-card, .expertise-card, .project-card-modern').forEach(el => obs.observe(el));
}

function initCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          let cur = 0; const inc = target / (2000/16);
          const update = () => { cur += inc; if (cur < target) { counter.textContent = Math.floor(cur); requestAnimationFrame(update); } else counter.textContent = target; };
          update(); obs.unobserve(e.target);
        }
      });
    }, {threshold:0.5});
    obs.observe(counter);
  });
}

function initRotatingText() {
  const el = document.getElementById('rotatingText');
  if (!el) return;
  const words = ['The Future','Innovation','Solutions','Excellence'];
  let i = 0;
  el.style.transition = 'all 0.3s ease';
  setInterval(() => {
    el.style.opacity='0'; el.style.transform='translateY(-20px)';
    setTimeout(() => { i=(i+1)%words.length; el.textContent=words[i]; el.style.opacity='1'; el.style.transform='translateY(0)'; }, 300);
  }, 3000);
}

function initFormHandling() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
    const message = document.getElementById('message')?.value || '';
    window.location.href = `mailto:arnavjain711@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: '+name+' ('+email+')\n\n'+message)}`;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
    }
  });
  document.querySelectorAll('.form-group-modern input, .form-group-modern textarea').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => { if (!input.value) input.parentElement.classList.remove('focused'); });
  });
}

function initResumeButton() {
  document.querySelectorAll('#resumeBtn, #heroResumeBtn').forEach(btn => {
    if (btn) btn.addEventListener('click', e => { e.preventDefault(); alert('Resume coming soon!'); });
  });
}

function initTechStackAnimations() {}
function initSmoothAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
  }, {threshold:0.1});
  document.querySelectorAll('.tl-item, .cert-card, .project-card, .blog-card-home').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const hc = document.querySelector('.hero-content');
  const hv = document.querySelector('.hero-visual');
  if (hc && s < window.innerHeight) { hc.style.transform=`translateY(${s*0.3}px)`; hc.style.opacity=String(1-s/800); }
  if (hv && s < window.innerHeight) hv.style.transform=`translateY(${s*0.2}px)`;
});

console.log('🚀 Portfolio Loaded!');