/* ============================================
   TBARBA Portfolio - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            workCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Pricing Toggle ---
    const pricingToggles = document.querySelectorAll('.pricing-toggle-btn');
    const perVideoPricing = document.getElementById('per-video-pricing');
    const monthlyPricing = document.getElementById('monthly-pricing');

    pricingToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            pricingToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');

            const pricingType = toggle.dataset.pricing;

            if (pricingType === 'per-video') {
                perVideoPricing.classList.remove('pricing-hidden');
                perVideoPricing.style.display = '';
                monthlyPricing.classList.add('pricing-hidden');
                monthlyPricing.style.display = 'none';
            } else {
                monthlyPricing.classList.remove('pricing-hidden');
                monthlyPricing.style.display = '';
                perVideoPricing.classList.add('pricing-hidden');
                perVideoPricing.style.display = 'none';
            }
        });
    });

    // --- Scroll Fade-In Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in to elements
    const animateElements = document.querySelectorAll(
        '.section-header, .work-card, .service-card, .pricing-card, ' +
        '.about-content, .about-visual, .contact-info, .contact-form-wrapper, ' +
        '.testimonials-placeholder, .hero-stats'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Lazy Load YouTube Videos ---
    // Replace iframes with thumbnails that load on click for faster page speed
    const iframes = document.querySelectorAll('.video-wrapper iframe');

    iframes.forEach(iframe => {
        const src = iframe.src;
        const videoId = src.match(/embed\/([^?]+)/)?.[1];

        if (videoId) {
            const placeholder = document.createElement('div');
            placeholder.className = 'video-placeholder';
            placeholder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg') center/cover no-repeat;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            // Play button overlay
            const playBtn = document.createElement('div');
            playBtn.style.cssText = `
                width: 64px;
                height: 64px;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease, background 0.3s ease;
            `;
            playBtn.innerHTML = `
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;

            placeholder.appendChild(playBtn);

            placeholder.addEventListener('mouseenter', () => {
                playBtn.style.transform = 'scale(1.1)';
                playBtn.style.background = 'rgba(124, 92, 255, 0.9)';
            });

            placeholder.addEventListener('mouseleave', () => {
                playBtn.style.transform = 'scale(1)';
                playBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            });

            placeholder.addEventListener('click', () => {
                placeholder.remove();
                iframe.style.display = '';
                iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
            });

            iframe.style.display = 'none';
            iframe.parentElement.appendChild(placeholder);
        }
    });

    // --- Contact Form Feedback ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';
        });
    }

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
