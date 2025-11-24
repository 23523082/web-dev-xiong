// ====== DISABLE/ENABLE VIDEO ======
const bgVideo = document.getElementById('bg-video');
let videoEnabled = true;

function toggleVideo() {
    if (videoEnabled) {
        bgVideo.pause();
        videoEnabled = false;
    } else {
        bgVideo.play();
        videoEnabled = true;
    }
}

// ====== CLICK SOUND ======
function playClickSound() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0;
    sound.play();
}

// ====== ABOUT ME MENU ======
const menuItems = document.querySelectorAll('.about-me-menu li');
const contentItems = document.querySelectorAll('.about-content-item');

// Initialize: show first item, hide others
contentItems.forEach((item, idx) => {
    item.style.display = idx === 0 ? 'block' : 'none';
});
menuItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        // Hide all content
        contentItems.forEach(c => c.style.display = 'none');
        // Show selected content
        contentItems[idx].style.display = 'block';
        
        // Optional: play click sound when menu item clicked
        playClickSound();
    });
});
