# 📝 Simple Notes (Chrome Extension)

A **privacy-first Chrome extension** for quick note-taking.  
Features include **auto-save**, **sticky color palette**, **character/word/row counters**, and **light/dark themes** — all running locally and securely.

---

## 📸 Extension Image

![Simple Notes Logo](images/logo_128.png)

Multiple logo sizes included: 36px, 64px, 128px, 512px.

---

## ✨ Features

### 1. Minimal Note-Taking
- Single **textarea** for all notes.
- **Auto-saved** automatically in local storage.
- **Character, word, and row counters** for quick tracking.
- **Light/Dark mode toggle**.

### 2. Sticky Color Palette
- Top-bar palette with 8 sticky colors.
- Quickly change note background color.
- Color is persisted between sessions.

### 3. Auto-Save Indicator
- Footer displays **“Auto-saved”** when content is saved.
- Hides immediately on typing and reappears after save.
- Save triggers after **3 seconds of inactivity**.

### 4. Privacy & Security
- Fully offline, **no external scripts or network requests**.
- Uses **only local `storage` permission**.
- Notes remain **local and private**.
- Text color remains black for clarity in dark mode.

---

## ⚙️ Installation

1. Download or clone the extension folder.
2. Open Chrome → `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder.

### Updating
- Overwrite files in your folder and click **Reload** in `chrome://extensions/`.

---

## 🎨 Usage

1. Click the **extension icon**.
2. Type notes in the textarea.
3. Select a **sticky color** from the top palette.
4. Toggle **light/dark theme** if needed.
5. Notes auto-save silently after inactivity.

**Footer Auto-Save:**  
- Displays **“Auto-saved”** after saving.
- Hides instantly when typing resumes.

---

## 🧠 Persistence

- Notes are saved in `chrome.storage.local`.
- Last color and theme are also persisted.
- No syncing or network activity — fully local storage.

---

## 🛡️ Privacy & Security

- ✅ **No remote code, analytics, or network requests.**
- ✅ **Only `storage` permission** required.
- ✅ **Notes remain local**, never leaving your device.
- ✅ **No HTML injection** — text only.
- ✅ **Sandboxed**, safe, and minimal.

<details>
<summary>Why local storage?</summary>

Storing notes locally ensures **privacy, security, and reliability**.  
There is no cloud sync; everything stays on your device.
</details>

---

## ⧉ File Overview

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest and permissions. |
| `popup.html` | Popup UI with textarea and palette. |
| `popup.css` | Styling for layout, palette, counters, and themes. |
| `popup.js` | Handles notes, counters, autosave, palette, and theme toggle. |
| `images/logo_36.png` | 36px logo. |
| `images/logo_64.png` | 64px logo. |
| `images/logo_128.png` | 128px logo. |
| `images/logo_512.png` | 512px logo. |

---

## 💡 Tips & Best Practices

- Keep the popup open to reference notes; autosave runs silently.
- Expand popup for longer notes.
- Use sticky colors to visually differentiate notes.
- Avoid extremely large text blocks — designed for **quick notes**.

---

## 🧱 Technical Notes

- Autosave uses a **3-second debounce**.
- Sandbox ensures **safe, offline operation**.
- Notes text is always **black**, regardless of theme.
- Color inputs are validated and sanitized.

---

## 🧾 License

Distributed under the **MIT License**.  
Free to **use, modify, and distribute**.  

**Ethical request:**  
- Do not bundle with trackers or analytics.  
- Respect user privacy if redistributing.

---

### Author Note

Built with ❤️ for **secure, minimal, and sleek note-taking**.  
Enjoy your lightweight, offline quick-notes!  
— skysha
