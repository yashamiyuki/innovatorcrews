/* ═══════════════════════════════════════════════════════
   INNOVATOR CREWS — main.js
   Client-facing Agency Site | 2026 Edition
═══════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────
     3. NAVBAR — scroll state + mobile menu
  ────────────────────────────────────── */
  const Navbar = (() => {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!navbar) return;

    // Scroll shadow
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
      });
      // Close on link click
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
        });
      });
    }

    // Active link on scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section[id], div[id]');
    const links    = document.querySelectorAll('.nav-link[data-section]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  })();


  /* ──────────────────────────────────────
     4. SCROLL ANIMATIONS ([data-aos])
  ────────────────────────────────────── */
  const ScrollAnim = (() => {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    // Apply data-aos-delay attribute if present; otherwise auto-stagger siblings
    els.forEach(el => {
      const delay = el.getAttribute('data-aos-delay');
      if (delay) {
        // handled entirely by CSS transition-delay rules
      } else {
        // Auto-stagger: find position among [data-aos] siblings of the same parent
        const siblings = Array.from(el.parentElement.querySelectorAll(':scope > [data-aos]'));
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = (idx * 90) + 'ms';
      }
      observer.observe(el);
    });

    // Immediately reveal elements already in viewport on load
    setTimeout(() => {
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('aos-visible');
          observer.unobserve(el);
        }
      });
    }, 100);
  })();


  /* ──────────────────────────────────────
     5. COUNTER ANIMATION (proof strip)
  ────────────────────────────────────── */
  const Counters = (() => {
    const nums = document.querySelectorAll('.proof-num[data-count]');
    if (!nums.length) return;

    const easeOutQuad = t => t * (2 - t);

    const animateCounter = el => {
      const target   = parseInt(el.dataset.count, 10);
      const suffix   = el.dataset.suffix || '';
      const duration = 1600;
      let start      = null;

      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = `${Math.floor(easeOutQuad(progress) * target)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = `${target}${suffix}`;
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    nums.forEach(n => observer.observe(n));
  })();


  /* ──────────────────────────────────────
     6. PORTFOLIO FILTER
  ────────────────────────────────────── */
  const PortfolioFilter = (() => {
    const btns  = document.querySelectorAll('.pf-btn');
    const cards = document.querySelectorAll('.port-card');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          if (match) {
            card.style.opacity   = '1';
            card.style.transform = 'scale(1)';
            card.style.display   = '';
          } else {
            card.style.opacity   = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              if (card.dataset.category !== filter && btn.dataset.filter !== 'all') {
                // keep in DOM but visually hidden is fine for simple layout
              }
            }, 300);
          }
        });
      });
    });
  })();


  /* ──────────────────────────────────────
     7. FAQ ACCORDION
  ────────────────────────────────────── */
  const FAQ = (() => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const btn = item.querySelector('.faq-q');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        items.forEach(i => {
          i.classList.remove('open');
          const q = i.querySelector('.faq-q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();


  /* ──────────────────────────────────────
     8. CONTACT FORM
  ────────────────────────────────────── */
  const ContactForm = (() => {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    const validate = () => {
      let valid = true;
      form.querySelectorAll('[required]').forEach(el => {
        const ok = el.value.trim() !== '' && (el.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        el.classList.toggle('error', !ok);
        if (!ok) valid = false;
      });
      return valid;
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate()) return;

      const btn = form.querySelector('[type="submit"]');
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span><i class="fa-solid fa-circle-notch fa-spin"></i>';
      btn.disabled = true;

      // Simulate async send (replace with actual endpoint)
      await new Promise(r => setTimeout(r, 1400));

      form.reset();
      btn.innerHTML = origHTML;
      btn.disabled  = false;
      if (success) { success.classList.add('visible'); setTimeout(() => success.classList.remove('visible'), 6000); }
    });

    // Live clear error on input
    form.querySelectorAll('[required]').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('error'));
    });
  })();


  /* ──────────────────────────────────────
     9. BACK TO TOP
  ────────────────────────────────────── */
  const BackToTop = (() => {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();


  /* ──────────────────────────────────────
     10. SMOOTH SCROLL for anchor links
  ────────────────────────────────────── */
  const SmoothScroll = (() => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id  = link.getAttribute('href').slice(1);
        const el  = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72', 10);
        const top    = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();


  /* ──────────────────────────────────────
     11. TILT EFFECT on cards (desktop)
  ────────────────────────────────────── */
  const TiltCards = (() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.svc-card, .price-card, .tm-card, .why-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();


  /* ──────────────────────────────────────
     12. HERO SCROLL ANIMATION (parallax orbs)
  ────────────────────────────────────── */
  const HeroParallax = (() => {
    const blobs = document.querySelectorAll('.hero-blob');
    if (!blobs.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          blobs.forEach((blob, i) => {
            const factor = 0.08 + i * 0.04;
            blob.style.transform = `translateY(${y * factor}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();


  /* ──────────────────────────────────────
     13. CTA PARALLAX BACKGROUND
  ────────────────────────────────────── */
  const CtaParallax = (() => {
    const bg = document.querySelector('.cta-parallax-bg');
    if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = bg.closest('.cta-section');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const offset = Math.max(Math.min(rect.top * -0.12, 36), -36);
          bg.style.transform = `scale(1.08) translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();


    /* ──────────────────────────────────────
      14. MARQUEE (if any horizontal strip)
  ────────────────────────────────────── */
  // No marquee strip in this version — placeholder for future use


    /* ──────────────────────────────────────
      15. ACCESSIBILITY — skip link
  ────────────────────────────────────── */
  const A11y = (() => {
    const skip = document.createElement('a');
    skip.href = '#home';
    skip.textContent = 'Skip to main content';
    skip.className = 'sr-only';
    skip.style.cssText = 'position:absolute;top:8px;left:8px;z-index:10001;background:#fff;color:var(--brand);padding:8px 14px;border-radius:6px;font-weight:700;opacity:0;transition:opacity 0.2s;pointer-events:none;';
    skip.addEventListener('focus', () => { skip.style.opacity = '1'; skip.style.pointerEvents = 'auto'; });
    skip.addEventListener('blur',  () => { skip.style.opacity = '0'; skip.style.pointerEvents = 'none'; });
    document.body.prepend(skip);
  })();

});
