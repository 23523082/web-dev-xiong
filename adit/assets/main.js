// 1. TYPING EFFECT
const words = ["Software Engineer", "IT Solution Enabler", "Developer"];
let i = 0;
let timer;

function typeWriter() {
  const element = document.querySelector('.typing-effect');
  if(!element) return; // Guard clause
  
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
document.addEventListener('DOMContentLoaded', typeWriter);

// 2. MOBILE NAV TOGGLE
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navbar = document.querySelector('#navbar');

if(mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        navbar.classList.toggle('navbar-mobile');
        this.classList.toggle('bx-menu');
        this.classList.toggle('bx-x');
    });
}

// 3. SMOOTH SCROLL & ACTIVE LINK STATE
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // -80 offset untuk kompensasi tinggi navbar
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});