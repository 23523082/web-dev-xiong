// ====== DISABLE/ENABLE VIDEO ======
const bgVideo = document.getElementById('bg-video');
let videoEnabled = true;

function toggleVideo() {
    if (!bgVideo) return;
    if (videoEnabled) {
        bgVideo.pause();
        videoEnabled = false;
    } else {
        bgVideo.play().catch(()=>{}); // ignore autoplay errors
        videoEnabled = true;
    }
}

// ====== CLICK SOUND (UI) ======
// Uses existing audio element with id="click-sound" for UI clicks.
// Ensure your HTML contains: <audio id="click-sound" src="../etta/mediaPage/background.mp3" preload="auto"></audio>
function playClickSound() {
    const sound = document.getElementById('click-sound');
    if (!sound) return;
    try {
        sound.currentTime = 0;
        sound.play().catch(()=>{ /* user gesture required */ });
    } catch (e) { /* ignore */ }
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
        if (contentItems[idx]) contentItems[idx].style.display = 'block';
        
        // play UI click sound (this uses the click-sound element only)
        playClickSound();
    });
});

// ====== THEME MUSIC: separate audio element ======
// We'll either find an existing <audio id="theme-music"> or create one dynamically.
// This keeps theme music isolated from UI sound effects.
let themeAudio = document.getElementById('theme-music');
if (!themeAudio) {
    themeAudio = document.createElement('audio');
    themeAudio.id = 'theme-music';
    themeAudio.preload = 'auto';
    themeAudio.loop = true;
    themeAudio.volume = 0.55;
    // don't append children <source> here; we'll set .src directly when applying theme
    document.body.appendChild(themeAudio);
}

// Theme switching for video / audio / color scheme
(() => {
  const themeSelect = document.getElementById('theme-select');
  const videoEl = document.getElementById('bg-video');
  // Use the newly created/selected themeAudio for background music
  const audioEl = themeAudio;

  // Map themes -> media paths + CSS variables
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
      '--select-bg': 'rgba(50,0,50,0.35)',
      '--select-text': '#e0c8ff',
      '--about-p-color': '#d8bfff',
      '--project-box-bg': 'rgba(0,0,0,0.35)',
      '--project-info-border': 'rgba(199,122,255,0.12)',
      '--project-border': 'rgba(199,122,255,0.15)',
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
      '--select-bg': 'rgba(20,30,40,0.35)',
      '--select-text': '#dceefc',
      '--about-p-color': '#dceefc',
      '--project-box-bg': 'rgba(6,10,18,0.5)',
      '--project-info-border': 'rgba(143,182,214,0.08)',
      '--project-border': 'rgba(143,182,214,0.08)',
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
      '--select-bg': 'rgba(40,20,60,0.28)',
      '--select-text': '#fff3d9',
      '--about-p-color': '#fff3d9',
      '--project-box-bg': 'rgba(8,6,18,0.45)',
      '--project-info-border': 'rgba(255,210,122,0.08)',
      '--project-border': 'rgba(255,210,122,0.08)',
      '--project-title': '#fff1c8',
      '--project-desc': '#fff3d9'
    }
  }
};

  // Helper: set CSS variables
  function applyCSSVars(vars = {}) {
    const root = document.documentElement;
    Object.keys(vars).forEach(k => {
      root.style.setProperty(k, vars[k]);
    });
  }

  // Helper: change video source and restart
  function changeVideo(src) {
    if (!videoEl) return;
    const firstSource = videoEl.querySelector('source');
    if (firstSource) {
      firstSource.src = src;
      videoEl.pause();
      videoEl.load();
      videoEl.play().catch(()=>{ /* autoplay blocked */ });
    } else {
      videoEl.pause();
      videoEl.src = src;
      videoEl.load();
      videoEl.play().catch(()=>{});
    }
  }

  // Helper: change theme music source (uses themeAudio element)
  function changeAudio(src) {
    if (!audioEl) return;
    // If the same src is already playing, don't reset (avoids jumps)
    if (audioEl.src && audioEl.src.includes(src)) {
      // If it's paused, try to play; otherwise leave it running
      if (audioEl.paused) {
        audioEl.play().catch(()=>{ /* user gesture may be required */ });
      }
      return;
    }

    audioEl.pause();
    audioEl.src = src;
    audioEl.load();
    audioEl.loop = true;
    audioEl.volume = 0.55;
    audioEl.play().catch(() => {
      // Autoplay likely blocked. The audio element will be ready to play on user gesture.
      console.info('Autoplay blocked for theme audio — user interaction required to play.');
    });
  }

  // Apply a theme by key
  function applyTheme(key) {
    const cfg = themeConfig[key];
    if (!cfg) return;
    // 1) update CSS variables
    applyCSSVars(cfg.vars);
    // 2) update video
    if (cfg.video) changeVideo(cfg.video);
    // 3) update theme music (separate element)
    if (cfg.audio) changeAudio(cfg.audio);

    // update select UI if necessary
    if (themeSelect && themeSelect.value !== key) themeSelect.value = key;
    // Save preference to localStorage so reload keeps theme
    try { localStorage.setItem('siteTheme', key); } catch (e) {}
  }

  // Event listener for the select element
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  }

  // Initialize on DOM loaded: default to wuthering-wave unless saved in localStorage
  document.addEventListener('DOMContentLoaded', () => {
    const saved = (function() {
      try { return localStorage.getItem('siteTheme'); } catch (e) { return null; }
    })();
    const start = saved || 'wuthering-wave';
    if (themeSelect) themeSelect.value = start;
    applyTheme(start);
  });

  // Expose function globally if you need to call it elsewhere:
  window.applySiteTheme = applyTheme;
})();
