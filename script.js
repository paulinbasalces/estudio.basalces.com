// ========================================
// ESTÚDIO BASALCES - SCRIPT PRINCIPAL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle (Dark Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // --- 2. Mobile Menu ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenuToggle && mobileNav && mobileOverlay) {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            // Evita rolagem do fundo quando o menu está aberto
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- 3. Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Scroll Animations (Intersection Observer) ---
    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 5. FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            // Abre o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 6. WhatsApp Dynamic Link (Botão do Pricing) ---
    const whatsappNumber = "553198447001"; 
    const message = encodeURIComponent("Olá! Gostei da proposta do Estúdio Basalces e gostaria de saber mais detalhes.");
    document.querySelectorAll('a[href="#contato"]').forEach(link => {
        link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
    });

    // --- 7. Share Buttons ---
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
                // Abre em uma janela popup centralizada
                window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
            }
        });
    });
});