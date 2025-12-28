/* ===========================================
   UHUY TEAM - Main JavaScript
   Authors: Adit, Cindi, Etta
   
   FEATURES:
   1. Active Navigation Highlight
   2. Smooth Scroll Navigation
   3. Hero Image Slider
   4. Scroll Animations
   5. Quote Slider 
   =========================================== */


/* ===========================================
   1. ACTIVE NAVIGATION HIGHLIGHT
   Highlights current section in navbar
   =========================================== */
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

    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', setActiveNav);


/* ===========================================
   2. SMOOTH SCROLL NAVIGATION
   Smooth scrolling when clicking nav links
   =========================================== */
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


/* ===========================================
   3. HERO IMAGE SLIDER
   Auto-rotating carousel with indicators
   =========================================== */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    // Add active class to current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

/* ===========================================
   4. SCROLL ANIMATIONS
   Fade-in effect for About section cards
   =========================================== */
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

// Apply initial hidden state and observe cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    infoObserver.observe(card);
});

/* ===========================================
   5. QUOTE SLIDER
   Rotating inspirational quotes
   =========================================== */
const quoteSlides = document.querySelectorAll('.quote-slide');
const quoteDots = document.querySelectorAll('.quote-dot');
let currentQuote = 0;

function showQuote(index) {
    // Remove active class from all quotes
    quoteSlides.forEach(s => s.classList.remove('active'));
    quoteDots.forEach(d => d.classList.remove('active'));
    
    // Add active class to current quote
    quoteSlides[index].classList.add('active');
    quoteDots[index].classList.add('active');
    currentQuote = index;
}


/* ===========================================
   INITIALIZATION
   Setup all interactive elements on page load
   =========================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialize Hero Slider ---
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => showSlide(i));
    });
    
    // Auto-rotate slides every 3 seconds
    let slideInterval = setInterval(nextSlide, 3000);
    
    // Pause on hover
    document.querySelector('.slider-container').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });

    // --- Initialize Quote Slider ---
    if (quoteSlides.length > 0) {
        quoteDots.forEach((dot, i) => {
            dot.addEventListener('click', () => showQuote(i));
        });

        // Auto-rotate quotes every 5 seconds
        let quoteInterval = setInterval(() => {
            showQuote((currentQuote + 1) % quoteSlides.length);
        }, 5000);

        // Pause on hover
        document.querySelector('.quote-section')?.addEventListener('mouseenter', () => {
            clearInterval(quoteInterval);
        });
        document.querySelector('.quote-section')?.addEventListener('mouseleave', () => {
            quoteInterval = setInterval(() => {
                showQuote((currentQuote + 1) % quoteSlides.length);
            }, 5000);
        });
    }

    // --- Initialize Navigation ---
    setActiveNav(); // Set correct active state on page load
});