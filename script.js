document.addEventListener('DOMContentLoaded', () => {

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

  // --- STICKY HEADER ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- INTERSECTION OBSERVER FOR REVEALS ---
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- SKILLS PROGRESS BARS ANIMATION ---
  const skillsSection = document.getElementById('habilidades');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
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
      const sectionHeight = section.clientHeight;
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
  });

  // --- CANVAS PARTICLE BACKGROUND MATRIX ---
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId;

    // Canvas size adjustment
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
      'rgba(249, 115, 22, 0.45)'   // QA Orange
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

    // Connect particles with lines
    const connectParticles = () => {
      let maxDistance = 120;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            let opacity = (1 - (distance / maxDistance)) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
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
      initParticles();
      animate();
    });
  }

  // --- CONTACT FORM HANDLING ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('btn-submit-form');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      // Simulate API post response
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        formStatus.classList.remove('error', 'success');
        formStatus.classList.add('success');
        formStatus.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo a la brevedad.';
        
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // --- LANGUAGE SWITCH ---
  const langBtn = document.getElementById('lang-switch-btn');
  let currentLang = 'es';

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
      
      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', currentLang);

      // Select all elements with data-en attribute
      const translatableElements = document.querySelectorAll('[data-en]');
      translatableElements.forEach(el => {
        // Store Spanish original text on first switch
        if (!el.getAttribute('data-es')) {
          el.setAttribute('data-es', el.innerHTML.trim());
        }

        // Swap text content/HTML
        if (currentLang === 'en') {
          el.innerHTML = el.getAttribute('data-en');
        } else {
          el.innerHTML = el.getAttribute('data-es');
        }
      });

      // Handle placeholder switching for form fields
      const translatablePlaceholders = document.querySelectorAll('[data-en-placeholder]');
      translatablePlaceholders.forEach(input => {
        if (!input.getAttribute('data-es-placeholder')) {
          input.setAttribute('data-es-placeholder', input.placeholder);
        }

        if (currentLang === 'en') {
          input.placeholder = input.getAttribute('data-en-placeholder');
        } else {
          input.placeholder = input.getAttribute('data-es-placeholder');
        }
      });
    });
  }

  // --- THEME SWITCH (LIGHT/DARK MODE) ---
  const themeBtn = document.getElementById('theme-switch-btn');
  if (themeBtn) {
    // Check local storage for preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeBtn.textContent = '☾';
    } else {
      document.body.classList.remove('light-theme');
      themeBtn.textContent = '☼';
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeBtn.textContent = isLight ? '☾' : '☼';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
});
