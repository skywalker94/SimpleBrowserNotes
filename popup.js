// popup.js — adjusted autosave behavior
/* globals chrome */

const STORAGE_KEY = 'simple_notes_data_v2';

const noteEl = document.getElementById('note');
const countsEl = document.getElementById('counts');
const themeToggle = document.getElementById('themeToggle');
const paletteEl = document.getElementById('palette');
const saveHintEl = document.getElementById('saveHint');

const STICKY = ['#fff9b0','#ffd6a5','#ffd6f0','#d0f0c0','#cfefff','#d0d0ff','#f0d0ff','#f5f5f5'];

let autoSaveTimer = null;
const AUTO_SAVE_DEBOUNCE_MS = 3000; // save after 3s of inactivity

// ----------------- Palette -----------------
function initPalette(){
  if(!paletteEl) return;
  paletteEl.innerHTML = '';
  STICKY.forEach(c=>{
    const d = document.createElement('div');
    d.className = 'color';
    d.style.background = c;
    d.title = c;
    d.addEventListener('click', ()=> applyColor(c));
    paletteEl.appendChild(d);
  });
}
function applyColor(c){
  if(noteEl) noteEl.style.background = c;
  chrome.storage.local.set({ selected_color: c });
}

// ----------------- Counters -----------------
function updateCounts(){
  if(!countsEl || !noteEl) return;
  const text = noteEl.value || '';
  const chars = text.length;
  const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const rows = text.length ? text.split(/\r\n|\r|\n/).length : 0;
  countsEl.textContent = `${chars} chars • ${words} words • ${rows} rows`;
}

// ----------------- Save / Load -----------------
function saveNow(){
  if(!noteEl) return;
  const payload = {
    plaintext: noteEl.value || '',
    saved_at: Date.now()
  };
  chrome.storage.local.set({ [STORAGE_KEY]: payload }, () => {
    // after save completes, show the hint and keep it visible until next edit
    showSaveHint();
  });
}

function scheduleSave(){
  if(autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => { saveNow(); }, AUTO_SAVE_DEBOUNCE_MS);
}

function loadStored(){
  chrome.storage.local.get([STORAGE_KEY, 'selected_color', 'theme'], (items) => {
    if(items[STORAGE_KEY] && items[STORAGE_KEY].plaintext !== undefined){
      if(noteEl) noteEl.value = items[STORAGE_KEY].plaintext || '';
    }
    if(items.selected_color){
      applyColor(items.selected_color);
    }
    if(items.theme === 'dark'){
      document.body.classList.add('dark');
      if(themeToggle) themeToggle.checked = true;
    }
    updateCounts();
    // show Auto-saved on load (data already present or empty saved state)
    showSaveHint();
  });
}

// ----------------- Save hint display -----------------
function showSaveHint(){
  if(!saveHintEl) return;
  saveHintEl.textContent = 'Auto-saved ✅';
}
function hideSaveHint(){
  if(!saveHintEl) return;
  saveHintEl.textContent = '✍️';
}

// ----------------- Events -----------------
if(noteEl){
  noteEl.addEventListener('input', () => {
    // Immediately hide the saved hint as soon as user starts typing
    hideSaveHint();
    updateCounts();
    scheduleSave();
  });
}

// theme toggle handler
if(themeToggle){
  themeToggle.addEventListener('change', (ev) => {
    if(ev.target.checked) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    chrome.storage.local.set({ theme: ev.target.checked ? 'dark' : 'light' });
  });
}

// initial setup
initPalette();
loadStored();
updateCounts();

// save on popup close (best-effort)
window.addEventListener('beforeunload', () => {
  // flush pending save immediately (synchronous is not possible, but attempt)
  if(autoSaveTimer) {
    clearTimeout(autoSaveTimer);
    saveNow();
  } else {
    // still call saveNow to ensure latest content is persisted
    saveNow();
  }
});
