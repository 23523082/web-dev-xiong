// wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {

    /* toggle menu */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // toggle mobile menu when hamburger icon is clicked
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // close toggle menu when any navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* scroll animations */
    // intersection observer for fade-in animations when scrolling
    const observerOptions = {
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // trigger slightly before element enters viewport
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // add fade-in animation when element enters viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // observe timeline items for animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    /* tab switching functionality */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // get the data-tab attribute to know which content to show
            const targetTab = this.getAttribute('data-tab');

            // remove 'active' class from all buttons and content panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // add 'active' class to clicked button
            this.classList.add('active');

            // show the corresponding content panel
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    /* photo journey auto-scroll */
    function photoJourney() {
        // define scrolling speed (lower = faster)
        var speed = 30;  
        // get carousel element
        var carousel = document.getElementById("photoCarousel");
        if (!carousel) return; // exit if element not found 
        // duplicate content for seamless scrolling
        carousel.innerHTML += carousel.innerHTML; 
        // get spans
        var spans = carousel.getElementsByTagName("span");
        // start timer for scrolling
        var timer = window.setInterval(scroll, speed);
        // pause when mouse over
        carousel.onmouseover = function() {
            clearInterval(timer);
        };
        // resume when mouse out
        carousel.onmouseout = function() {
            timer = setInterval(scroll, speed);
        };
        // scrolling function
        function scroll() {
            // when first span is completely scrolled out
            if (carousel.scrollLeft >= spans[0].offsetWidth) {
                // reset to beginning
                carousel.scrollLeft = 0;
            } else {
                // otherwise, scroll left
                ++carousel.scrollLeft;
            }
        }
    }
    photoJourney();
});