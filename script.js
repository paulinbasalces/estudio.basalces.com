// ========================================
// ESTÚDIO BASALCES - SCRIPT PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Theme Toggle (Dark Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    });
  }

  // --- 2. Header Flutuante com Glassmorphism ---
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
          } else {
            mainHeader.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- 3. Mobile Menu ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    if (mobileMenuToggle && mobileNav && mobileOverlay) {
      const isOpen = mobileNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active', isOpen);
      mobileOverlay.classList.toggle('active', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      toggleMenu();
      mobileMenuToggle.focus();
    }
  });

  // --- 4. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    let btTicking = false;
    window.addEventListener('scroll', () => {
      if (!btTicking) {
        window.requestAnimationFrame(() => {
          if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
          btTicking = false;
        });
        btTicking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. Scroll Animations (Intersection Observer) ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }

  // --- 6. FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      const answerId = question.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 7. WhatsApp Dynamic Link ---
  const whatsappNumber = "553198447001";
  const message = encodeURIComponent("Olá! Gostei da proposta do Estúdio Basalces e gostaria de saber mais detalhes.");
  document.querySelectorAll('a[href="#contato"]').forEach(link => {
    link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  });

  // --- 8. Share Buttons ---
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent("Conheci o Estúdio Basalces e achei incrível! Sites profissionais com suporte incluso. Dá uma olhada:");
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.getAttribute('data-share');
      let shareUrl = '';
      switch(platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(currentUrl)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
          break;
      }
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
      }
    });
  });

});