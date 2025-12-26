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
});