/* =========================================================
   VIDEO BACKGROUND CONTROL
   ========================================================= */
const bgVideo = document.getElementById('bg-video');
let videoEnabled = true;

function toggleVideo() {
  if (!bgVideo) return;

  // Toggle video state
  if (videoEnabled) {
    bgVideo.pause();
  } else {
    bgVideo.play().catch(() => {});
  }
  
  // Update state
  videoEnabled = !videoEnabled;
  
  // Update button text
  const videoBtn = document.querySelector('.dropdown-btn[onclick*="toggleVideo"]');
  if (videoBtn) {
    if (videoEnabled) {
      videoBtn.innerHTML = '<span>🎬</span> Disable Video';
    } else {
      videoBtn.innerHTML = '<span>⏸️</span> Enable Video';
    }
  }
  
  // Play click sound
  playClickSound();
}

// Initialize button text on page load
document.addEventListener('DOMContentLoaded', () => {
  const videoBtn = document.querySelector('.dropdown-btn[onclick*="toggleVideo"]');
  if (videoBtn) {
    videoBtn.innerHTML = videoEnabled 
      ? '<span>🎬</span> Disable Video'
      : '<span>⏸️</span> Enable Video';
  }
}); 

/* =========================================================
   ABOUT ME MENU
   ========================================================= */
(() => {
  const menuItems = document.querySelectorAll('.about-me-menu li');
  const contentItems = document.querySelectorAll('.about-content-item');

  if (!menuItems.length || !contentItems.length) return;

  // Set initial active state
  contentItems.forEach((item, i) => {
    item.classList.toggle('active', i === 0);
  });

  menuItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      // Remove active from all tabs and content
      menuItems.forEach(tab => tab.classList.remove('active'));
      contentItems.forEach(content => content.classList.remove('active'));
      
      // Add active to clicked tab and corresponding content
      item.classList.add('active');
      if (contentItems[i]) contentItems[i].classList.add('active');
      
      playClickSound();
    });
  });
})();


/* =========================================================
   WECHAT POPUP MODAL
   ========================================================= */
function showWeChatPopup() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        playClickSound();
    }
}

function closeWeChatPopup() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        playClickSound();
    }
}

// Close modal when clicking outside the content
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeWeChatPopup();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('wechatModal');
            if (modal && modal.classList.contains('active')) {
                closeWeChatPopup();
            }
        }
    });
});
/* =========================================================
   SOUND CONTROL SYSTEM
   ========================================================= */

let soundEnabled = true;
let soundInitialized = false;

function initializeSoundSystem() {
    if (soundInitialized) return;
    
    // Load sound preference from localStorage
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        soundEnabled = JSON.parse(savedSound);
    }
    
    // Apply sound state to all audio elements
    updateAllAudioElements();
    
    // Update button text
    updateSoundButton();
    
    soundInitialized = true;
    console.log("Sound system initialized. Sound is:", soundEnabled ? "ON" : "OFF");
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    
    // Save to localStorage
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    
    // Apply to all audio elements
    updateAllAudioElements();
    
    // Update button text
    updateSoundButton();
    
    // If enabling sound, play a test click
    if (soundEnabled) {
        playClickSound();
    }
    
    console.log("Sound toggled. Now:", soundEnabled ? "ON" : "OFF");
}

function updateAllAudioElements() {
    // Get all audio elements including theme music
    const allAudioElements = document.querySelectorAll('audio');
    const allVideoElements = document.querySelectorAll('video');
    
    // Mute/unmute audio elements
    allAudioElements.forEach(audio => {
        audio.muted = !soundEnabled;
    });
    
    // Mute/unmute video elements (if any)
    allVideoElements.forEach(video => {
        video.muted = !soundEnabled;
    });
}

function updateSoundButton() {
    const soundBtn = document.querySelector('.dropdown-btn[onclick*="toggleSound"]');
    if (!soundBtn) return;
    
    if (soundEnabled) {
        soundBtn.innerHTML = '<span>🔊</span> Mute All Sounds';
    } else {
        soundBtn.innerHTML = '<span>🔇</span> Unmute All Sounds';
    }
}

function playClickSound() {
    if (!soundEnabled) return;
    
    const sound = document.getElementById('click-sound');
    if (!sound) return;

    try {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    } catch (_) {}
}

/* =========================================================
   THEME AUDIO (SEPARATE FROM UI SOUNDS)
   ========================================================= */
let themeAudio = document.getElementById('theme-music');
if (!themeAudio) {
  themeAudio = document.createElement('audio');
  themeAudio.id = 'theme-music';
  themeAudio.preload = 'auto';
  themeAudio.loop = true;
  themeAudio.volume = 0.55;
  themeAudio.muted = !soundEnabled; // Set initial mute state
  document.body.appendChild(themeAudio);
}

// Initialize sound system when page loads
document.addEventListener('DOMContentLoaded', initializeSoundSystem);

// Also initialize when theme system changes themes
window.applySiteTheme = function(key) {
    // ... your existing theme switching code ...
    
    // Ensure sound state is maintained
    if (themeAudio) {
        themeAudio.muted = !soundEnabled;
    }
};

/* =========================================================
   THEME SWITCHING (VIDEO + MUSIC + CSS VARIABLES)
   ========================================================= */
(() => {
  const themeSelect = document.getElementById('theme-select');
  const videoEl = document.getElementById('bg-video');
  const audioEl = themeAudio;

  const themeConfig = {
    'wuthering-wave': {
      video: '../etta/mediaPage/Wuthering Waves/WUWA.mp4',
      audio: '../etta/mediaPage/Wuthering Waves/WUWA.mp3',
      vars: {
        '--accent': '#c77aff',
        '--panel-bg': 'rgba(0,0,0,0.35)',
        '--muted-panel': 'rgba(50,0,50,0.25)',
        '--text': '#d8bfff',
        '--btn-bg': 'rgba(199,122,255,0.35)',
        '--btn-bg-hover': 'rgba(199,122,255,0.55)',
        '--btn-border': 'rgba(199,122,255,0.5)',
        '--project-border': 'rgba(199,122,255,0.15)',
        '--project-info-border': 'rgba(199,122,255,0.12)',
        '--project-title': '#f3d8ff',
        '--project-desc': '#d8bfff'
      }
    },

    'punishing-gray-raven': {
      video: '../etta/mediaPage/PGR/PGR.mp4',
      audio: '../etta/mediaPage/PGR/PGR.mp3',
      vars: {
        '--accent': '#8fb6d6',
        '--panel-bg': 'rgba(6,10,18,0.6)',
        '--muted-panel': 'rgba(20,30,40,0.35)',
        '--text': '#dceefc',
        '--btn-bg': 'rgba(143,182,214,0.12)',
        '--btn-bg-hover': 'rgba(143,182,214,0.24)',
        '--btn-border': 'rgba(143,182,214,0.35)',
        '--project-border': 'rgba(143,182,214,0.08)',
        '--project-info-border': 'rgba(143,182,214,0.08)',
        '--project-title': '#bfe0f4',
        '--project-desc': '#dceefc'
      }
    },

    'honkai-star-rail': {
      video: '../etta/mediaPage/HSR/HSR.mp4',
      audio: '../etta/mediaPage/HSR/TTW.mp3',
      vars: {
        '--accent': '#ffd27a',
        '--panel-bg': 'rgba(8,6,18,0.55)',
        '--muted-panel': 'rgba(40,20,60,0.25)',
        '--text': '#fff3d9',
        '--btn-bg': 'rgba(255,210,122,0.14)',
        '--btn-bg-hover': 'rgba(255,210,122,0.30)',
        '--btn-border': 'rgba(255,210,122,0.28)',
        '--project-border': 'rgba(255,210,122,0.08)',
        '--project-info-border': 'rgba(255,210,122,0.08)',
        '--project-title': '#fff1c8',
        '--project-desc': '#fff3d9'
      }
    },

    'where-winds-meet': {
      video: '../etta/mediaPage/WWM/WWM.mp4',
      audio: '../etta/mediaPage/WWM/WWM.mp3',
      vars: {
        '--accent': '#3c8dff',
        '--panel-bg': 'rgba(5,15,35,0.55)',
        '--muted-panel': 'rgba(10,20,40,0.35)',
        '--text': '#d6e6ff',
        '--btn-bg': 'rgba(60,141,255,0.14)',
        '--btn-bg-hover': 'rgba(60,141,255,0.32)',
        '--btn-border': 'rgba(60,141,255,0.28)',
        '--project-border': 'rgba(60,141,255,0.08)',
        '--project-info-border': 'rgba(60,141,255,0.08)',
        '--project-title': '#e6f1ff',
        '--project-desc': '#d6e6ff'
      }
    }
  };

  function applyCSSVars(vars) {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }

  function changeVideo(src) {
    if (!videoEl) return;
    const source = videoEl.querySelector('source');
    if (source) source.src = src;
    videoEl.load();
    videoEl.play().catch(() => {});
  }

  function changeAudio(src) {
    if (!audioEl || audioEl.src.includes(src)) return;
    audioEl.pause();
    audioEl.src = src;
    audioEl.load();
    audioEl.play().catch(() => {});
  }

  function applyTheme(key) {
    const cfg = themeConfig[key];
    if (!cfg) return;

    applyCSSVars(cfg.vars);
    changeVideo(cfg.video);
    changeAudio(cfg.audio);

    try {
      localStorage.setItem('siteTheme', key);
    } catch (_) {}
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', e => applyTheme(e.target.value));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('siteTheme') || 'wuthering-wave';
    if (themeSelect) themeSelect.value = saved;
    applyTheme(saved);
  });

  window.applySiteTheme = applyTheme;
})();

/* =========================================================
   PROJECT DETAIL PANEL - INDEPENDENT FROM EDUCATION DETAIL
   ========================================================= */
let currentProject = null;
let currentEducation = null;

function showProjectDetail(card) {
  const panel = document.getElementById('project-detail');
  if (!panel || !card) return;

  // Toggle project detail only
  if (currentProject === card) {
    panel.classList.add('hidden');
    currentProject = null;
    return;
  }

  currentProject = card;

  // Set the title as clickable link to GitHub
  const titleLink = document.getElementById('detail-title-link');
  titleLink.href = card.dataset.github;
  
  document.getElementById('detail-title').textContent = card.dataset.title;
  document.getElementById('detail-description').textContent = card.dataset.description;
  
  const img = document.getElementById('detail-image');
  img.src = card.dataset.image;

  panel.classList.remove('hidden');
  playClickSound();
}
/* =========================================================
   EDUCATION DETAIL PANEL - INDEPENDENT FROM PROJECT DETAIL
   ========================================================= */
function showEducationDetail(card) {
  const eduPanel = document.getElementById('education-detail');
  if (!eduPanel || !card) return;

  // Toggle education detail only
  if (currentEducation === card) {
    eduPanel.classList.add('hidden');
    currentEducation = null;
    return;
  }

  currentEducation = card;

  // Set education details
  document.getElementById('edu-detail-title').textContent = card.dataset.title || '';
  document.getElementById('edu-detail-description').textContent = card.dataset.description || '';

  const img = document.getElementById('edu-detail-image');
  if (card.dataset.image) {
    img.src = card.dataset.image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  // Show education panel
  eduPanel.classList.remove('hidden');
  playClickSound();
}