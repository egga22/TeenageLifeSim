/* =============================================
   UTILS — Helper functions
   ============================================= */

const Utils = {
    /* Get a DOM element */
    $(selector) {
        return document.querySelector(selector);
    },

    /* Get all matching DOM elements */
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    /* Show a screen, hide all others */
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    },

    /* Show / hide overlay */
    showOverlay(overlayId) {
        const o = document.getElementById(overlayId);
        if (o) { o.classList.add('active'); o.setAttribute('aria-hidden', 'false'); }
    },

    hideOverlay(overlayId) {
        const o = document.getElementById(overlayId);
        if (o) { o.classList.remove('active'); o.setAttribute('aria-hidden', 'true'); }
    },

    /* Clamp a number between min and max */
    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    },

    /* Random integer between min and max inclusive */
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /* Random element from array */
    randFrom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    /* Shuffle array in place */
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    /* Deep clone */
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /* Simple debounce */
    debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },

    /* Toast notification */
    toast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /* Typewriter effect — supports early cancellation via element.dataset.skip */
    async typeText(element, text, speed = 30) {
        element.textContent = '';
        const effectiveSpeed = Game && Game.settings ? 
            { instant: 0, fast: 15, normal: 30, slow: 60 }[Game.settings.textSpeed] || speed : speed;
        
        if (effectiveSpeed === 0) {
            element.textContent = text;
            return;
        }
        
        for (let i = 0; i < text.length; i++) {
            // Check if parent wants to skip
            if (element.closest && element.closest('.story-area, #story-text, .minigame-area')?.dataset.skip === 'true') {
                element.textContent = text;
                return;
            }
            element.textContent += text[i];
            await new Promise(r => setTimeout(r, effectiveSpeed));
        }
    },

    /* Save to localStorage */
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.warn('Save failed:', e);
            return false;
        }
    },

    /* Load from localStorage */
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Load failed:', e);
            return null;
        }
    },

    /* Remove from localStorage */
    remove(key) {
        try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
    },

    /* Format pronouns */
    pronoun(type) {
        if (!Game || !Game.player) return 'they';
        const p = Game.player.pronouns;
        const map = {
            they: { subject: 'they', object: 'them', possessive: 'their', reflexive: 'themselves', verb: '' },
            he: { subject: 'he', object: 'him', possessive: 'his', reflexive: 'himself', verb: 's' },
            she: { subject: 'she', object: 'her', possessive: 'her', reflexive: 'herself', verb: 's' }
        };
        return (map[p] || map.they)[type] || 'they';
    },

    /* Wait ms */
    wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    },

    /* Sanitize HTML to prevent XSS */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
};
