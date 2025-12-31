// Stardev Landing Page - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 15, 26, 0.8)';
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }

    // Intersection Observer for animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.problem-card, .solution-item, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // Form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const process = document.getElementById('process').value;
            
            // Format WhatsApp message
            const message = `Olá! Meu nome é ${name}.\n\nProcesso que quero automatizar:\n${process}`;
            const whatsappLink = `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;
            
            // Show success feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓ Redirecionando...</span>';
            btn.style.background = '#22c55e';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                // window.open(whatsappLink, '_blank');
                alert('Formulário enviado com sucesso! Em breve entraremos em contato.');
                form.reset();
            }, 1500);
        });
    }

    // WhatsApp mask
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) value = value.slice(0, 3) + ') ' + value.slice(3);
                if (value.length > 10) value = value.slice(0, 10) + '-' + value.slice(10);
            }
            e.target.value = value;
        });
    }

    // Typing effect for code block
    const codeBlock = document.querySelector('.code-body code');
    if (codeBlock) {
        const originalHTML = codeBlock.innerHTML;
        codeBlock.innerHTML = '';
        let i = 0;
        const type = () => {
            if (i < originalHTML.length) {
                codeBlock.innerHTML = originalHTML.slice(0, i + 1);
                i++;
                setTimeout(type, 10);
            }
        };
        const codeObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                codeObserver.disconnect();
            }
        });
        codeObserver.observe(codeBlock);
    }
});
