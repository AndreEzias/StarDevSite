// Stardev Landing Page - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

        // Close menu when a link is clicked
        const menuLinks = document.querySelectorAll('.nav-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
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

    // EmailJS Configuration
    // ⚠️ IMPORTANTE: Substitua pelos seus valores do EmailJS
    const EMAILJS_PUBLIC_KEY = 'UmJYxVssCxeN-kJWN';
    const EMAILJS_SERVICE_ID = 'service_zpdb0pc';
    const EMAILJS_TEMPLATE_ID = 'template_qomyah9';

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Form handling with EmailJS
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<span>Enviando...</span>';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            const whatsappRaw = document.getElementById('whatsapp').value;
            const whatsappClean = whatsappRaw.replace(/\D/g, ''); // Remove tudo que não é número

            const templateParams = {
                from_name: document.getElementById('name').value,
                whatsapp: whatsappRaw,
                whatsapp_clean: whatsappClean, // Número limpo para o link
                process: document.getElementById('process').value,
                to_name: 'André Ezías'
            };

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

                // Success feedback
                btn.innerHTML = '<span>✓ Enviado com sucesso!</span>';
                btn.style.background = '#22c55e';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    form.reset();
                }, 3000);

            } catch (error) {
                console.error('EmailJS Error:', error);

                // Error feedback
                btn.innerHTML = '<span>✗ Erro ao enviar</span>';
                btn.style.background = '#ef4444';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 3000);

                alert('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
            }
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
