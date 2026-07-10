document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let currentLang = localStorage.getItem('lang') === 'en' ? 'en' : 'es';

  // --- CUSTOM CURSOR (dot + trailing ring) ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && finePointer && !prefersReducedMotion) {
    document.body.classList.add('has-cursor');
    let mx = 0, my = 0, rx = 0, ry = 0;
    let cursorVisible = false;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!cursorVisible) {
        cursorVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        rx = mx; ry = my;
      }
      cursorDot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    });

    const ringLoop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const half = cursorRing.offsetWidth / 2;
      cursorRing.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);

    // Grow ring over interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .glass-card, input, textarea, label')) {
        cursorRing.classList.add('is-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .glass-card, input, textarea, label')) {
        cursorRing.classList.remove('is-hover');
      }
    });
  }

  // --- MAGNETIC BUTTONS ---
  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll('.btn').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.22;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // --- MOBILE NAVIGATION MENU ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- STICKY HEADER + SCROLL PROGRESS + BACK TO TOP ---
  const header = document.querySelector('.header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // --- STAGGERED REVEAL DELAYS ---
  document.querySelectorAll('.pillars-grid, .projects-grid, .skills-grid, .timeline').forEach(grid => {
    grid.querySelectorAll(':scope > .reveal-up, :scope > * > .reveal-up').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.08, 0.4)}s`;
    });
  });

  // --- INTERSECTION OBSERVER FOR REVEALS ---
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('active');
        observer.unobserve(el);
        // Once revealed, drop the reveal transition so card hovers stay snappy
        setTimeout(() => {
          el.classList.remove('reveal-up');
          el.style.transitionDelay = '';
        }, 1400);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- ANIMATED COUNTERS ---
  const animateCount = (el, target, duration = 1500, suffix = '') => {
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Hero stats counters
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(el => {
    animateCount(el, parseInt(el.getAttribute('data-target'), 10) || 0, 1800);
  });

  // --- SKILLS PROGRESS BARS + VALUE COUNTERS ---
  const skillsSection = document.getElementById('habilidades');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent;
            const item = bar.closest('.skill-item');
            const valueEl = item ? item.querySelector('.skill-value') : null;
            if (valueEl) {
              animateCount(valueEl, parseInt(percent, 10) || 0, 1500, '%');
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // --- TYPEWRITER EFFECT (HERO TAGLINE) ---
  const typewriterEl = document.getElementById('typewriter-text');
  const roles = {
    es: ['Ciberseguridad y Pentesting', 'Agentes de IA y LLMs', 'QA y Automatización', 'Desarrollo Full-Stack'],
    en: ['Cybersecurity & Pentesting', 'AI Agents & LLMs', 'QA & Automation', 'Full-Stack Development']
  };

  if (typewriterEl) {
    if (prefersReducedMotion) {
      typewriterEl.textContent = roles[currentLang][0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const list = roles[currentLang];
        const word = list[roleIndex % list.length];

        if (!deleting) {
          charIndex++;
          typewriterEl.textContent = word.slice(0, charIndex);
          if (charIndex >= word.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
          }
          setTimeout(type, 55);
        } else {
          charIndex--;
          typewriterEl.textContent = word.slice(0, Math.max(charIndex, 0));
          if (charIndex <= 0) {
            deleting = false;
            roleIndex++;
            setTimeout(type, 400);
            return;
          }
          setTimeout(type, 28);
        }
      };

      typewriterEl.textContent = '';
      setTimeout(type, 600);
    }
  }

  // --- CARD SPOTLIGHT + 3D TILT ---
  const glassCards = document.querySelectorAll('.glass-card');
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    glassCards.forEach(card => {
      const isProject = card.classList.contains('project-card');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);

        if (isProject) {
          const rotateY = ((x / rect.width) - 0.5) * 10;
          const rotateX = -((y / rect.height) - 0.5) * 10;
          card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (isProject) card.style.transform = '';
      });
    });
  }

  // --- PORTFOLIO PROJECT FILTERS ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
        } else {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // --- SCROLLSPY ACTIVE NAV LINKS ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --- CANVAS PARTICLE BACKGROUND MATRIX ---
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId;

    // Canvas size adjustment
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    // Mouse tracking object
    const mouse = {
      x: null,
      y: null,
      radius: 100
    };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Color definitions
    const colors = [
      'rgba(168, 85, 247, 0.45)', // AI Purple
      'rgba(16, 185, 129, 0.45)', // Cyber Green
      'rgba(249, 115, 22, 0.45)'  // QA Orange
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on boundary limits
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // Interactive mouse repel
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            // Strong push away from mouse
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 75);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    initParticles();

    // Connect particles with lines (line color adapts to theme)
    const connectParticles = () => {
      let maxDistance = 120;
      const lineRGB = document.body.classList.contains('light-theme') ? '71, 85, 105' : '148, 163, 184';
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            let opacity = (1 - (distance / maxDistance)) * 0.15;
            ctx.strokeStyle = `rgba(${lineRGB}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Re-initialize particles on layout resize to prevent boundary issues
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      resizeCanvas();
      initParticles();
      animate();
    });
  }

  // --- CONTACT FORM HANDLING ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('btn-submit-form');

  const formTexts = {
    es: {
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Me pondré en contacto contigo a la brevedad.',
      error: 'No se pudo enviar. Escríbeme directo a dorianjfb01@gmail.com'
    },
    en: {
      sending: 'Sending...',
      success: 'Message sent successfully! I will get back to you shortly.',
      error: 'Could not send. Email me directly at dorianjfb01@gmail.com'
    }
  };

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.textContent;
      submitBtn.textContent = formTexts[currentLang].sending;
      submitBtn.disabled = true;
      formStatus.classList.remove('error', 'success');

      const restore = () => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      };

      const showSuccess = () => {
        restore();
        formStatus.classList.remove('error');
        formStatus.classList.add('success');
        formStatus.textContent = formTexts[currentLang].success;
        contactForm.reset();
        setTimeout(() => formStatus.classList.remove('success'), 6000);
      };

      const showError = () => {
        restore();
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
        formStatus.textContent = formTexts[currentLang].error;
      };

      // Send to Netlify Forms (works once deployed on Netlify).
      // Encodes all fields, including the hidden "form-name".
      const body = new URLSearchParams(new FormData(contactForm)).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
        .then((res) => { res.ok ? showSuccess() : showError(); })
        .catch(showError);
    });
  }

  // --- LANGUAGE SWITCH (with persistence) ---
  const langBtn = document.getElementById('lang-switch-btn');

  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    if (langBtn) {
      langBtn.classList.toggle('en', lang === 'en');
      langBtn.querySelectorAll('.lang-opt').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
      });
    }

    // Swap all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
      // Store Spanish original text on first switch
      if (!el.getAttribute('data-es')) {
        el.setAttribute('data-es', el.innerHTML.trim());
      }
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });

    // Handle placeholder switching for form fields
    document.querySelectorAll('[data-en-placeholder]').forEach(input => {
      if (!input.getAttribute('data-es-placeholder')) {
        input.setAttribute('data-es-placeholder', input.placeholder);
      }
      input.placeholder = lang === 'en'
        ? input.getAttribute('data-en-placeholder')
        : input.getAttribute('data-es-placeholder');
    });
  };

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'es' ? 'en' : 'es');
    });
  }

  // Restore saved language on load
  if (currentLang === 'en') {
    applyLanguage('en');
  }

  // --- THEME SWITCH (LIGHT/DARK MODE) ---
  const themeBtn = document.getElementById('theme-switch-btn');
  if (themeBtn) {
    // Check local storage for preference
    const savedTheme = localStorage.getItem('theme');
    document.body.classList.toggle('light-theme', savedTheme === 'light');

    themeBtn.addEventListener('click', () => {
      // Animate color swap smoothly, then clean up the helper class
      document.documentElement.classList.add('theme-transition');
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 550);
    });
  }
});
