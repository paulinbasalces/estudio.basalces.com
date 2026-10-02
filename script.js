// ========================================
// ESTÚDIO BASALCES — SCRIPT PRINCIPAL
// Performance-first | A11Y | Zero dependências
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THEME TOGGLE (Dark Mode) ---
  // Respeita preferência do sistema + persistência via localStorage
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label',
        dark ? 'Alternar para tema claro' : 'Alternar para tema escuro'
      );
    }
  }

  // Inicializa: localStorage > system preference
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    applyTheme(true);
  } else if (stored === 'light') {
    applyTheme(false);
  } else {
    applyTheme(prefersDark.matches);
  }

  // Escuta mudanças no SO
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      applyTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  }

  // --- 2. HEADER FLUTUANTE ---
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mainHeader.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- 3. MOBILE MENU ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    if (!mobileMenuToggle || !mobileNav || !mobileOverlay) return;
    const isOpen = mobileNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Focus trap básico
    if (isOpen) {
      const firstLink = mobileNav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      toggleMenu();
      mobileMenuToggle.focus();
    }
  });

  // --- 4. BACK TO TOP ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    let btTicking = false;
    window.addEventListener('scroll', () => {
      if (!btTicking) {
        window.requestAnimationFrame(() => {
          backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
          btTicking = false;
        });
        btTicking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. SCROLL ANIMATIONS (Intersection Observer) ---
  // Respeita prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
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
    // Se o usuário prefere movimento reduzido, mostra tudo imediatamente
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }

  // --- 6. FAQ ACCORDION (A11Y completo) ---
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado se não estava ativo
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    // Suporte a teclado (Enter e Space já funcionam nativamente com <button>)
  });

  // --- 7. WHATSAPP DYNAMIC LINKS ---
  const whatsappNumber = '553198447001';
  const message = encodeURIComponent('Olá! Gostei da proposta do Estúdio Basalces e gostaria de saber mais detalhes.');
  document.querySelectorAll('a[href="#contato"]').forEach(link => {
    link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  });

  // --- 8. SHARE BUTTONS ---
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent('Conheci o Estúdio Basalces e achei incrível! Sites profissionais com suporte incluso. Dá uma olhada:');

  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.getAttribute('data-share');
      let shareUrl = '';

      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(currentUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(currentUrl)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
      }
    });
  });

});