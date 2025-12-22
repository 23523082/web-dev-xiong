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

    /* console log */
    console.log('Personal Website loaded successfully! ✨');
    console.log('Tab system initialized');
    console.log('Mobile menu ready');
    console.log('Scroll animations active');

});