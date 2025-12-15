/* =========================================================
   VIDEO BACKGROUND CONTROL
   ========================================================= */
const bgVideo = document.getElementById('bg-video');
let videoEnabled = true;

function toggleVideo() {
  if (!bgVideo) return;

  if (videoEnabled) {
    bgVideo.pause();
  } else {
    bgVideo.play().catch(() => {});
  }
  videoEnabled = !videoEnabled;
}

/* =========================================================
   UI CLICK SOUND
   ========================================================= */
function playClickSound() {
  const sound = document.getElementById('click-sound');
  if (!sound) return;

  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (_) {}
}

/* =========================================================
   ABOUT ME MENU
   ========================================================= */
(() => {
  const menuItems = document.querySelectorAll('.about-me-menu li');
  const contentItems = document.querySelectorAll('.about-content-item');

  if (!menuItems.length || !contentItems.length) return;

  contentItems.forEach((item, i) => {
    item.style.display = i === 0 ? 'block' : 'none';
  });

  menuItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      contentItems.forEach(c => (c.style.display = 'none'));
      if (contentItems[i]) contentItems[i].style.display = 'block';
      playClickSound();
    });
  });
})();

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
  document.body.appendChild(themeAudio);
}

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
   PROJECT DETAIL PANEL (NO AUTO SCROLL)
   ========================================================= */
let currentProject = null;

function showProjectDetail(card) {
  const panel = document.getElementById('project-detail');
  if (!panel || !card) return;

  if (currentProject === card) {
    panel.classList.add('hidden');
    currentProject = null;
    return;
  }

  currentProject = card;

  document.getElementById('detail-title').textContent =
    card.dataset.title || '';

  document.getElementById('detail-description').textContent =
    card.dataset.description || '';

  const img = document.getElementById('detail-image');
  if (card.dataset.image) {
    img.src = card.dataset.image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  panel.classList.remove('hidden');
}
