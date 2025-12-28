/* ============================================
   PORTFOLIO - Main JavaScript
   Author: Raihan Aditito (韩子杰)
   
   FEATURES:
   1. Typing Effect Animation
   2. Mobile Navigation Toggle
   3. Smooth Scroll & Active Link
============================================ */


/* ============================================
   1. TYPING EFFECT ANIMATION
   Rotates through profession titles
============================================ */
const words = ["Software Engineer", "IT Solution Enabler", "Developer"];
let i = 0;
let timer;

function typeWriter() {
  const element = document.querySelector('.typing-effect');
  if (!element) return; // Guard clause
  
  const word = words[i];
  let charIndex = 0;
  let isDeleting = false;

  function loop() {
    element.innerHTML = word.substring(0, charIndex);
    
    if (!isDeleting && charIndex < word.length) {
      charIndex++;
      timer = setTimeout(loop, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      timer = setTimeout(loop, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        i = (i + 1) % words.length;
        setTimeout(typeWriter, 1000);
        return;
      }
      timer = setTimeout(loop, 1000);
    }
  }
  loop();
}

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', typeWriter);


/* ============================================
   2. MOBILE NAVIGATION TOGGLE
   Hamburger menu for mobile devices
============================================ */
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navbar = document.querySelector('#navbar');

if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', function() {
    navbar.classList.toggle('navbar-mobile');
    this.classList.toggle('bx-menu');
    this.classList.toggle('bx-x');
  });
}


/* ============================================
   3. SMOOTH SCROLL & ACTIVE LINK STATE
   Highlights current section in navbar
============================================ */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  // Determine which section is in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // -150 offset to compensate for navbar height
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  // Update active class on nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});