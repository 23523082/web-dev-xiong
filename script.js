let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
function prevSlide() { showSlide((currentSlide - 1 + slides.length) % slides.length); }

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => showSlide(i));
    });
    
    let interval = setInterval(nextSlide, 5000);
    document.querySelector('.slider-container').addEventListener('mouseenter', () => clearInterval(interval));
    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });

    /* Scroll animations for info section */
    const infoObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const infoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, infoObserverOptions);

    // Observe info CARDS (not the whole item) for animation
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        infoObserver.observe(card);
    });

    // Quote Slider
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDots = document.querySelectorAll('.quote-dot');
    let currentQuote = 0;

    function showQuote(index) {
        quoteSlides.forEach(s => s.classList.remove('active'));
        quoteDots.forEach(d => d.classList.remove('active'));
        quoteSlides[index].classList.add('active');
        quoteDots[index].classList.add('active');
        currentQuote = index;
    }

    if (quoteSlides.length > 0) {
        quoteDots.forEach((dot, i) => {
            dot.addEventListener('click', () => showQuote(i));
        });

        let quoteInterval = setInterval(() => {
            showQuote((currentQuote + 1) % quoteSlides.length);
        }, 5000);

        document.querySelector('.quote-section')?.addEventListener('mouseenter', () => clearInterval(quoteInterval));
        document.querySelector('.quote-section')?.addEventListener('mouseleave', () => {
            quoteInterval = setInterval(() => {
                showQuote((currentQuote + 1) % quoteSlides.length);
            }, 5000);
        });
    }

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    function setActiveNav() {
        let current = '';
        const navHeight = navbar.offsetHeight;

        // Add scrolled class for enhanced navbar style
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Run once on load

    // Smooth scroll with offset for sticky navbar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});