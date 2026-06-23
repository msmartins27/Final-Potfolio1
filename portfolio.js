/* =====================================================
   portfolio.js  –  Alina Martin Interactive Portfolio
   JavaScript concepts used:
     1. DOM Manipulation & Events (dark mode, navbar, back-to-top)
     2. Timers & String Methods (typing effect)
     3. IntersectionObserver API (scroll-reveal + skill bars)
     4. Async/Await & Fetch API (contact form)
     5. localStorage (persist dark-mode preference)
   ===================================================== */

/* --------------------------------------------------
   1. DARK MODE TOGGLE
   -------------------------------------------------- */
(function initDarkMode() {
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    btn.textContent = '☀️';
    btn.setAttribute('aria-label', 'Switch to light mode');
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('darkMode', isDark);
  });
})();


/* --------------------------------------------------
   2. TYPING EFFECT
   -------------------------------------------------- */
(function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Computer Science Student',
    'IT Technician',
    'Entrepreneur',
    'Web Developer',
    'Problem Solver',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 90);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 50);
    }
  }

  tick();
})();


/* --------------------------------------------------
   3. SCROLL-REVEAL ANIMATIONS
   Adds "js-ready" to body first so CSS hides .reveal
   elements only when JS is running. Then immediately
   marks anything already on screen as visible — this
   fixes the blank page when opening via File Explorer.
   -------------------------------------------------- */
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // Only hide elements once we know JS is active
  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* --------------------------------------------------
   4. ANIMATED SKILL BARS
   -------------------------------------------------- */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress');
  if (!bars.length) return;

  const section = document.querySelector('.skills-content') || document.querySelector('.skills-grid');
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bars.forEach((bar) => {
            bar.style.width = bar.getAttribute('data-width') || '0%';
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
})();


/* --------------------------------------------------
   5. CONTACT FORM VALIDATION + ASYNC SUBMIT
   -------------------------------------------------- */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function setError(input, message) {
    const group = input.closest('.form-group') || input.parentElement;
    let errEl = group.querySelector('.field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      errEl.setAttribute('role', 'alert');
      group.appendChild(errEl);
    }
    errEl.textContent = message;
    input.classList.toggle('input-error', !!message);
    input.classList.toggle('input-ok', !message);
  }

  function validateField(input) {
    const val = input.value.trim();
    if (input.required && !val) {
      setError(input, 'This field is required.');
      return false;
    }
    if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError(input, 'Please enter a valid email address.');
      return false;
    }
    if (input.name === 'message' && val.length > 0 && val.length < 10) {
      setError(input, 'Message must be at least 10 characters.');
      return false;
    }
    setError(input, '');
    return true;
  }

  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('input-error')) validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    const allValid = fields.every((f) => validateField(f));
    if (!allValid) return;

    const btn = form.querySelector('button[type="submit"]');
    const banner = document.getElementById('formBanner');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        fields.forEach((f) => f.classList.remove('input-ok', 'input-error'));
        showBanner(banner, "✅ Message sent! I'll get back to you soon.", 'success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      showBanner(banner, '❌ Something went wrong. Please email me directly.', 'error');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  function showBanner(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-banner form-banner--' + type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 6000);
  }
})();


/* --------------------------------------------------
   6. HAMBURGER MENU
   -------------------------------------------------- */
(function initHamburger() {
  const toggle = document.getElementById('navToggle');
  const menu = document.querySelector('.nav-links');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.classList.toggle('open');
    menu.classList.toggle('nav-open');
  });

  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('nav-open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* --------------------------------------------------
   7. NAVBAR SCROLL SHRINK
   -------------------------------------------------- */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();


/* --------------------------------------------------
   8. BACK-TO-TOP BUTTON
   -------------------------------------------------- */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
