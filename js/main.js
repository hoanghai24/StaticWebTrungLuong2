document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initHeroSlider();
  initTabs();
  initCounters();
  initReveal();
  initContactForm();
  initSmoothScroll();
});

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const hero = document.getElementById('hero');

  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let autoplayTimer = null;
  const INTERVAL = 5000;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ảnh ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.hero-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn?.addEventListener('click', () => {
    prev();
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    startAutoplay();
  });

  hero?.addEventListener('mouseenter', stopAutoplay);
  hero?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

function initHeader() {
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');

  const updateHeader = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = menu.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    toggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    toggle.innerHTML = isOpen
      ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
      : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });
}

function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
      });

      const target = document.getElementById(`tab-${tabId}`);
      if (target) target.classList.add('active');
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('vi-VN');
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.stat-item');
  if (statsSection) observer.observe(statsSection.parentElement);
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);

    form.reset();
    successMsg.classList.remove('hidden');

    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 5000);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
