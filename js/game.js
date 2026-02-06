/* =============================================
   GAME — Main game controller
   ============================================= */

const Game = {
    /* ---- State ---- */
    player: null,
    currentNode: null,
    day: 1,
    period: 0,
    mode: 'story',        // 'story', 'sandbox', 'speedrun', 'random', 'whatif', 'tutorial'
    timedChoiceTimer: null,
    speedrunStart: 0,
    itemsBought: 0,
    clubsJoined: new Set(),
    playCount: 0,

    settings: {
        difficulty: 'normal',
        autosave: true,
        textSpeed: 'normal',
        fontSize: 'medium',
        contrast: 'normal',
        theme: 'default',
        dyslexia: false,
        reduceMotion: false,
        screenReader: false
    },

    /* ---- Initialize ---- */
    init() {
        this.loadSettings();
        this.applySettings();
        Achievements.init();

        // Check for saved game
        const saved = Utils.load('tls_save');
        if (saved) {
            document.getElementById('btn-continue').style.display = 'block';
        }

        // Load play count
        this.playCount = Utils.load('tls_playcount') || 0;

        this.bindEvents();
        Utils.showScreen('screen-title');
    },

    /* ---- Event Bindings ---- */
    bindEvents() {
        // Title screen
        document.getElementById('btn-new-game').addEventListener('click', () => this.startCharacterCreation());
        document.getElementById('btn-continue').addEventListener('click', () => this.loadGame());
        document.getElementById('btn-tutorial').addEventListener('click', () => this.startTutorial());
        document.getElementById('btn-side-modes').addEventListener('click', () => Utils.showScreen('screen-sidemodes'));
        document.getElementById('btn-achievements-title').addEventListener('click', () => {
            Achievements.render();
            Utils.showScreen('screen-achievements');
        });
        document.getElementById('btn-settings-title').addEventListener('click', () => {
            this.previousScreen = 'screen-title';
            Utils.showScreen('screen-settings');
        });

        // Character creation
        document.getElementById('btn-back-title').addEventListener('click', () => Utils.showScreen('screen-title'));
        document.getElementById('btn-start-game').addEventListener('click', () => this.startNewGame());

        // Character preview updates
        document.getElementById('char-name').addEventListener('input', (e) => {
            document.getElementById('preview-name').textContent = e.target.value || 'Student';
        });

        document.getElementById('avatar-picker').addEventListener('click', (e) => {
            const btn = e.target.closest('.avatar-option');
            if (!btn) return;
            document.querySelectorAll('.avatar-option').forEach(b => {
                b.classList.remove('selected');
                b.setAttribute('aria-checked', 'false');
            });
            btn.classList.add('selected');
            btn.setAttribute('aria-checked', 'true');
            document.getElementById('preview-avatar').textContent = btn.dataset.avatar;
        });

        // Game menu
        document.getElementById('btn-menu').addEventListener('click', () => Utils.showOverlay('overlay-menu'));
        document.getElementById('btn-resume').addEventListener('click', () => Utils.hideOverlay('overlay-menu'));
        document.getElementById('btn-save-game').addEventListener('click', () => {
            this.saveGame();
            Utils.toast('💾 Game saved!', 'success');
        });
        document.getElementById('btn-menu-settings').addEventListener('click', () => {
            Utils.hideOverlay('overlay-menu');
            this.previousScreen = 'screen-game';
            Utils.showScreen('screen-settings');
        });
        document.getElementById('btn-menu-achievements').addEventListener('click', () => {
            Utils.hideOverlay('overlay-menu');
            Achievements.render();
            this.previousScreen = 'screen-game';
            Utils.showScreen('screen-achievements');
        });
        document.getElementById('btn-quit').addEventListener('click', () => {
            if (this.settings.autosave) this.saveGame();
            Utils.hideOverlay('overlay-menu');
            Utils.showScreen('screen-title');
        });

        // Settings
        document.getElementById('btn-settings-back').addEventListener('click', () => {
            Utils.showScreen(this.previousScreen || 'screen-title');
        });

        this.bindSettingsControls();

        // Achievements
        document.getElementById('btn-achievements-back').addEventListener('click', () => {
            Utils.showScreen(this.previousScreen || 'screen-title');
        });

        // Side modes
        document.getElementById('btn-sidemodes-back').addEventListener('click', () => Utils.showScreen('screen-title'));
        document.getElementById('btn-sandbox').addEventListener('click', () => {
            Achievements.unlock('sandbox_player');
            this.startSideMode('sandbox');
        });
        document.getElementById('btn-speedrun').addEventListener('click', () => this.startSideMode('speedrun'));
        document.getElementById('btn-random-challenge').addEventListener('click', () => this.startSideMode('random'));
        document.getElementById('btn-whatif').addEventListener('click', () => this.startSideMode('whatif'));

        // Ending screen
        document.getElementById('btn-play-again').addEventListener('click', () => this.startCharacterCreation());
        document.getElementById('btn-ending-achievements').addEventListener('click', () => {
            Achievements.render();
            this.previousScreen = 'screen-ending';
            Utils.showScreen('screen-achievements');
        });
        document.getElementById('btn-ending-title').addEventListener('click', () => Utils.showScreen('screen-title'));

        // Save/Load data
        document.getElementById('btn-export-save').addEventListener('click', () => this.exportSave());
        document.getElementById('btn-import-save').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });
        document.getElementById('import-file-input').addEventListener('change', (e) => this.importSave(e));
        document.getElementById('btn-delete-save').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete ALL saves and achievements? This cannot be undone!')) {
                Utils.remove('tls_save');
                Utils.remove('tls_achievements');
                Utils.remove('tls_settings');
                Utils.remove('tls_playcount');
                Achievements.unlocked = new Set();
                this.playCount = 0;
                document.getElementById('btn-continue').style.display = 'none';
                Utils.toast('🗑️ All data deleted', 'danger');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const menu = document.getElementById('overlay-menu');
                if (menu.classList.contains('active')) {
                    Utils.hideOverlay('overlay-menu');
                }
            }
            // Number keys for choices
            if (e.key >= '1' && e.key <= '9') {
                const choices = document.querySelectorAll('.choice-btn:not(:disabled)');
                const idx = parseInt(e.key) - 1;
                if (idx < choices.length) {
                    choices[idx].click();
                }
            }
        });
    },

    /* ---- Settings Controls ---- */
    bindSettingsControls() {
        const settingsMap = {
            'setting-difficulty': (v) => {
                this.settings.difficulty = v;
                document.body.className = document.body.className.replace(/difficulty-\w+/, `difficulty-${v}`);
            },
            'setting-autosave': (v) => { this.settings.autosave = v; },
            'setting-textspeed': (v) => { this.settings.textSpeed = v; },
            'setting-fontsize': (v) => {
                this.settings.fontSize = v;
                document.body.className = document.body.className.replace(/font-\w+/, `font-${v}`);
            },
            'setting-contrast': (v) => {
                this.settings.contrast = v;
                document.body.className = document.body.className.replace(/contrast-\w+/, `contrast-${v}`);
            },
            'setting-theme': (v) => {
                this.settings.theme = v;
                document.body.className = document.body.className.replace(/theme-\w+/, `theme-${v}`);
            },
            'setting-dyslexia': (v) => {
                this.settings.dyslexia = v;
                document.body.classList.toggle('dyslexia-font', v);
            },
            'setting-reduce-motion': (v) => {
                this.settings.reduceMotion = v;
                document.body.classList.toggle('reduce-motion', v);
            },
            'setting-screenreader': (v) => {
                this.settings.screenReader = v;
                document.body.classList.toggle('screenreader-mode', v);
            }
        };

        Object.keys(settingsMap).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const isCheckbox = el.type === 'checkbox';
            el.addEventListener('change', () => {
                const value = isCheckbox ? el.checked : el.value;
                settingsMap[id](value);
                this.saveSettings();
            });
        });
    },

    /* ---- Save / Load Settings ---- */
    saveSettings() {
        Utils.save('tls_settings', this.settings);
    },

    loadSettings() {
        const saved = Utils.load('tls_settings');
        if (saved) {
            Object.assign(this.settings, saved);
        }
    },

    applySettings() {
        document.body.className = `theme-${this.settings.theme} difficulty-${this.settings.difficulty} font-${this.settings.fontSize} contrast-${this.settings.contrast}`;
        if (this.settings.dyslexia) document.body.classList.add('dyslexia-font');
        if (this.settings.reduceMotion) document.body.classList.add('reduce-motion');
        if (this.settings.screenReader) document.body.classList.add('screenreader-mode');

        // Sync form controls
        const controls = {
            'setting-difficulty': this.settings.difficulty,
            'setting-autosave': this.settings.autosave,
            'setting-textspeed': this.settings.textSpeed,
            'setting-fontsize': this.settings.fontSize,
            'setting-contrast': this.settings.contrast,
            'setting-theme': this.settings.theme,
            'setting-dyslexia': this.settings.dyslexia,
            'setting-reduce-motion': this.settings.reduceMotion,
            'setting-screenreader': this.settings.screenReader
        };

        Object.keys(controls).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.type === 'checkbox') {
                el.checked = controls[id];
            } else {
                el.value = controls[id];
            }
        });
    },

    /* ---- Character Creation ---- */
    startCharacterCreation() {
        document.getElementById('char-name').value = '';
        document.getElementById('preview-name').textContent = 'Student';
        document.getElementById('preview-avatar').textContent = '😀';
        Utils.showScreen('screen-character');
        document.getElementById('char-name').focus();
    },

    /* ---- Start New Game ---- */
    startNewGame() {
        const name = document.getElementById('char-name').value.trim() || 'Alex';
        const pronouns = document.getElementById('char-pronouns').value;
        const style = document.getElementById('char-style').value;
        const personality = document.getElementById('char-personality').value;
        const club = document.getElementById('char-club').value;
        const avatar = document.querySelector('.avatar-option.selected')?.dataset.avatar || '😀';

        // Initialize player
        this.player = {
            name: name,
            pronouns: pronouns,
            style: style,
            personality: personality,
            clubInterest: club,
            avatar: avatar,
            stats: {
                academics: 50,
                social: 50,
                energy: 80,
                stress: 20,
                happiness: 70,
                reputation: 50
            },
            money: 20,
            relationships: {},
            inventory: [],
            flags: {}
        };

        // Apply personality bonuses
        const pBonus = GameData.personalityBonuses[personality];
        if (pBonus) {
            Object.keys(pBonus).forEach(stat => {
                if (this.player.stats[stat] !== undefined) {
                    this.player.stats[stat] = Utils.clamp(this.player.stats[stat] + pBonus[stat], 0, 100);
                }
            });
        }

        // Apply style bonuses
        const sBonus = GameData.styleBonuses[style];
        if (sBonus) {
            Object.keys(sBonus).forEach(stat => {
                if (this.player.stats[stat] !== undefined) {
                    this.player.stats[stat] = Utils.clamp(this.player.stats[stat] + sBonus[stat], 0, 100);
                }
            });
        }

        this.day = 1;
        this.period = 0;
        this.mode = 'story';
        this.itemsBought = 0;
        this.clubsJoined = new Set();
        if (club !== 'none') this.clubsJoined.add(club);

        // Increment play count
        this.playCount++;
        Utils.save('tls_playcount', this.playCount);
        if (this.playCount >= 5) Achievements.unlock('played_5');

        this.updateStatsUI();
        Utils.showScreen('screen-game');
        this.goToNode('day1_wake');
    },

    /* ---- Side Modes ---- */
    startSideMode(mode) {
        this.mode = mode;
        // Quick character for side modes
        this.player = {
            name: 'Player',
            pronouns: 'they',
            style: 'casual',
            personality: 'outgoing',
            avatar: '😎',
            stats: { academics: 50, social: 50, energy: 80, stress: 20, happiness: 70, reputation: 50 },
            money: 50,
            relationships: {},
            inventory: [],
            flags: {}
        };
        this.day = 1;
        this.period = 0;
        this.itemsBought = 0;
        this.clubsJoined = new Set();

        this.updateStatsUI();
        Utils.showScreen('screen-game');

        switch (mode) {
            case 'sandbox':
                this.goToNode('sandbox_start');
                break;
            case 'speedrun':
                this.speedrunStart = Date.now();
                this.goToNode('day1_wake');
                break;
            case 'random':
                Achievements.unlock('random_warrior');
                this.goToNode('random_start');
                break;
            case 'whatif':
                this.goToNode('whatif_start');
                break;
        }
    },

    /* ---- Tutorial ---- */
    startTutorial() {
        this.mode = 'tutorial';
        this.player = {
            name: 'Tutorial Student',
            pronouns: 'they',
            style: 'casual',
            personality: 'outgoing',
            avatar: '📝',
            stats: { academics: 50, social: 50, energy: 80, stress: 20, happiness: 70, reputation: 50 },
            money: 20,
            relationships: {},
            inventory: [],
            flags: {}
        };
        this.day = 1;
        this.period = 0;

        this.updateStatsUI();
        Utils.showScreen('screen-game');
        this.showTutorialStep(0);
    },

    showTutorialStep(index) {
        if (index < 0 || index >= GameData.tutorialSteps.length) {
            // Tutorial complete
            Achievements.unlock('tutorial_complete');
            Utils.toast('🎓 Tutorial complete! You\'re ready to play!', 'success');
            Utils.showScreen('screen-title');
            return;
        }

        const step = GameData.tutorialSteps[index];
        const storyText = document.getElementById('story-text');
        const choicesArea = document.getElementById('choices-area');
        const speakerArea = document.getElementById('speaker-area');

        speakerArea.style.display = 'none';
        storyText.innerHTML = '';

        const titleEl = document.createElement('div');
        titleEl.className = 'story-segment action';
        titleEl.textContent = step.title;
        storyText.appendChild(titleEl);

        const textEl = document.createElement('div');
        textEl.className = 'story-segment narrator';
        storyText.appendChild(textEl);

        Utils.typeText(textEl, step.text).then(() => {
            choicesArea.innerHTML = '';
            step.choices.forEach((choice, i) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.setAttribute('data-index', i + 1);
                btn.textContent = choice.text;
                btn.addEventListener('click', () => {
                    if (choice.effects) this.applyEffects(choice.effects);
                    if (choice.triggerMinigame) {
                        Minigames.launch(choice.triggerMinigame, () => {
                            this.showTutorialStep(choice.next);
                        });
                    } else {
                        this.showTutorialStep(choice.next);
                    }
                });
                choicesArea.appendChild(btn);
            });
        });
    },

    /* ---- Navigate to Story Node ---- */
    goToNode(nodeId) {
        if (nodeId === '_ENDING') {
            this.showEnding();
            return;
        }
        if (nodeId === '_TITLE') {
            Utils.showScreen('screen-title');
            return;
        }

        const node = Story.getNode(nodeId);
        if (!node) {
            console.error('Node not found:', nodeId);
            Utils.toast('Story error — returning to menu', 'danger');
            Utils.showScreen('screen-title');
            return;
        }

        this.currentNode = nodeId;

        // Execute onEnter
        if (node.onEnter) {
            try { node.onEnter(); } catch (e) { console.error('onEnter error:', e); }
        }

        // Apply node effects
        if (node.effects) {
            this.applyEffects(node.effects);
        }

        // Handle random events
        if (node.randomEvent) {
            this.tryRandomEvent();
        }

        // Render the node
        this.renderNode(node);

        // Auto-save
        if (this.settings.autosave && this.mode === 'story') {
            this.saveGame();
        }
    },

    /* ---- Render a Story Node ---- */
    renderNode(node) {
        const storyText = document.getElementById('story-text');
        const choicesArea = document.getElementById('choices-area');
        const speakerArea = document.getElementById('speaker-area');

        // Clear choices
        choicesArea.innerHTML = '';

        // Handle speaker
        if (node.speaker) {
            const char = GameData.characters[node.speaker];
            if (char) {
                speakerArea.style.display = 'flex';
                document.getElementById('speaker-avatar').textContent = char.avatar;
                document.getElementById('speaker-name').textContent = char.name;
            }
        } else {
            speakerArea.style.display = 'none';
        }

        // Story text
        const processedText = Story.processText(node.text);
        const textEl = document.createElement('div');
        textEl.className = 'story-segment narrator';
        storyText.innerHTML = '';
        storyText.appendChild(textEl);

        // Click-to-skip text animation
        let skipText = false;
        const skipHandler = () => { skipText = true; };
        storyText.addEventListener('click', skipHandler, { once: true });

        // Dialogue
        const renderDialogue = () => {
            if (node.dialogue) {
                const diaEl = document.createElement('div');
                diaEl.className = 'story-segment dialogue';
                storyText.appendChild(diaEl);
                if (skipText) {
                    diaEl.textContent = Story.processText(node.dialogue);
                    return Promise.resolve();
                }
                return Utils.typeText(diaEl, Story.processText(node.dialogue));
            }
            return Promise.resolve();
        };

        const typePromise = skipText ? 
            Promise.resolve().then(() => { textEl.textContent = processedText; }) :
            Utils.typeText(textEl, processedText);
        
        typePromise.then(() => {
            if (skipText) textEl.textContent = processedText;
            return renderDialogue();
        }).then(() => {
            storyText.removeEventListener('click', skipHandler);
            this.renderChoices(node, choicesArea);
            // Scroll story area after all content rendered
            const storyArea = document.getElementById('story-area');
            storyArea.scrollTop = storyArea.scrollHeight;
        });
    },

    /* ---- Render Choices ---- */
    renderChoices(node, choicesArea) {
        const diffMod = GameData.difficultyModifiers[this.settings.difficulty];
        const anyTimed = node.choices.some(c => c.isTimed) || this.mode === 'speedrun';

        node.choices.forEach((choice, i) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.setAttribute('data-index', i + 1);

            // Check money requirement
            if (choice.requiresMoney && this.player.money < choice.requiresMoney) {
                btn.classList.add('choice-locked');
                btn.disabled = true;
            }

            let choiceHtml = Utils.escapeHtml(choice.text);
            // Show hints on Easy and Normal, hide on Hard
            if (choice.hint && this.settings.difficulty !== 'hard') {
                choiceHtml += `<span class="choice-hint">${Utils.escapeHtml(choice.hint)}</span>`;
            }

            btn.innerHTML = choiceHtml;

            // Timed choices
            if ((choice.isTimed || this.mode === 'speedrun') && this.settings.difficulty === 'hard') {
                btn.classList.add('choice-timed');
            }

            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                this.clearTimedChoice();
                this.makeChoice(choice);
            });

            choicesArea.appendChild(btn);
        });

        // Timed choice handler for hard mode
        if (anyTimed && this.settings.difficulty === 'hard') {
            this.timedChoiceTimer = setTimeout(() => {
                // Auto-select random choice on timeout
                const available = node.choices.filter(c => !c.requiresMoney || this.player.money >= c.requiresMoney);
                if (available.length > 0) {
                    const randomChoice = Utils.randFrom(available);
                    Utils.toast('⏰ Time\'s up! Random choice selected!', 'warning');
                    this.makeChoice(randomChoice);
                }
            }, diffMod.timedChoiceDuration);
        }

        // Focus first choice for accessibility
        const firstChoice = choicesArea.querySelector('.choice-btn:not(:disabled)');
        if (firstChoice) firstChoice.focus();
    },

    /* ---- Clear Timed Choice ---- */
    clearTimedChoice() {
        if (this.timedChoiceTimer) {
            clearTimeout(this.timedChoiceTimer);
            this.timedChoiceTimer = null;
        }
    },

    /* ---- Make a Choice ---- */
    makeChoice(choice) {
        // Apply effects with difficulty modifier
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }

        // Handle club joining
        if (choice.clubJoin) {
            this.clubsJoined.add(choice.clubJoin);
            const club = GameData.clubs[choice.clubJoin];
            if (club) {
                Utils.toast(`🏅 Joined ${club.name}!`, 'success');
            }
            if (this.clubsJoined.size >= 6) Achievements.unlock('all_clubs');
        }

        // Advance day if needed
        if (choice.advanceDay) {
            this.day++;
            this.period = 0;
            document.getElementById('game-day').textContent = `📅 Day ${this.day}`;
        }

        // Trigger minigame or next node
        if (choice.triggerMinigame) {
            Minigames.launch(choice.triggerMinigame, (score, max, pct) => {
                // Apply minigame results
                const bonus = Math.round((pct / 100) * 10);
                this.applyEffects({ academics: bonus });
                Utils.toast(`📊 Minigame bonus: +${bonus} Academics`, 'success');
                this.goToNode(choice.next);
            });
        } else {
            this.goToNode(choice.next);
        }
    },

    /* ---- Apply Effects to Stats ---- */
    applyEffects(effects) {
        if (!this.player || !effects) return;

        const diffMod = GameData.difficultyModifiers[this.settings.difficulty];

        Object.keys(effects).forEach(stat => {
            let value = effects[stat];

            if (stat === 'money') {
                this.player.money = Math.max(0, this.player.money + value);
                if (this.player.money >= 100) Achievements.unlock('rich');
                document.getElementById('game-money').textContent = `💰 $${this.player.money}`;
                if (value < 0 && Math.abs(value) > 0) {
                    this.itemsBought++;
                    if (this.itemsBought >= 5) Achievements.unlock('shopaholic');
                }
                return;
            }

            if (this.player.stats[stat] === undefined) return;

            // Apply difficulty multipliers
            if (stat === 'stress') {
                value = Math.round(value * diffMod.stressMultiplier);
            } else if (value > 0) {
                value = Math.round(value * diffMod.statGainMultiplier);
            } else if (value < 0) {
                value = Math.round(value * diffMod.statLossMultiplier);
            }

            const oldVal = this.player.stats[stat];
            this.player.stats[stat] = Utils.clamp(this.player.stats[stat] + value, 0, 100);
            const newVal = this.player.stats[stat];

            // Show change indicator
            if (value !== 0 && oldVal !== newVal) {
                const indicator = value > 0 ? `+${value}` : `${value}`;
                const type = (stat === 'stress' ? (value > 0 ? 'danger' : 'success') : (value > 0 ? 'success' : 'danger'));
                // Don't toast every small change, just significant ones
                if (Math.abs(value) >= 8) {
                    const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
                    Utils.toast(`${statName} ${indicator}`, type, 1500);
                }
            }
        });

        this.updateStatsUI();
        Achievements.checkStats(this.player.stats);
    },

    /* ---- Update Stats UI ---- */
    updateStatsUI() {
        if (!this.player) return;
        const stats = this.player.stats;

        const statMappings = [
            { key: 'academics', bar: 'bar-academics', val: 'val-academics' },
            { key: 'social', bar: 'bar-social', val: 'val-social' },
            { key: 'energy', bar: 'bar-energy', val: 'val-energy' },
            { key: 'stress', bar: 'bar-stress', val: 'val-stress' },
            { key: 'happiness', bar: 'bar-happiness', val: 'val-happiness' },
            { key: 'reputation', bar: 'bar-reputation', val: 'val-reputation' }
        ];

        statMappings.forEach(({ key, bar, val }) => {
            const barEl = document.getElementById(bar);
            const valEl = document.getElementById(val);
            if (barEl) {
                barEl.style.width = stats[key] + '%';
                barEl.setAttribute('aria-valuenow', stats[key]);
            }
            if (valEl) valEl.textContent = stats[key];
        });

        document.getElementById('game-day').textContent = `📅 Day ${this.day}`;
        document.getElementById('game-period').textContent = `🕐 ${GameData.periods[this.period] || 'Morning'}`;
        document.getElementById('game-money').textContent = `💰 $${this.player.money}`;
    },

    /* ---- Try Random Event ---- */
    tryRandomEvent() {
        const events = GameData.randomEvents;
        for (const event of events) {
            if (Math.random() < event.probability) {
                Utils.toast(`🎲 ${event.text}`, 'warning', 4000);
                if (event.effects) {
                    this.applyEffects(event.effects);
                }
                break; // Only one random event per check
            }
        }
    },

    /* ---- Show Ending ---- */
    showEnding() {
        const stats = this.player.stats;
        const endings = GameData.endings;

        // Find the best matching ending (priority order)
        const endingOrder = ['valedictorian', 'star', 'socialButterfly', 'rebel', 'burnout', 'loner', 'dropout', 'balanced', 'default'];
        let ending = endings.default;

        for (const key of endingOrder) {
            if (endings[key] && endings[key].condition(stats)) {
                ending = endings[key];
                break;
            }
        }

        // Unlock ending achievement
        const endingAchMap = {
            'valedictorian': 'ending_valedictorian',
            'socialButterfly': 'ending_social',
            'rebel': 'ending_rebel',
            'star': 'ending_star',
            'burnout': 'ending_burnout'
        };
        if (endingAchMap[ending.id]) {
            Achievements.unlock(endingAchMap[ending.id]);
        }

        // Hard mode achievement
        if (this.settings.difficulty === 'hard') {
            Achievements.unlock('hard_mode');
        }

        // Speed run achievement
        if (this.mode === 'speedrun') {
            Achievements.unlock('speedrunner');
        }

        // Render ending screen
        document.getElementById('ending-icon').textContent = ending.icon;
        document.getElementById('ending-title').textContent = ending.title;
        document.getElementById('ending-text').textContent = Story.processText(ending.text);

        const statsDiv = document.getElementById('ending-stats');
        statsDiv.innerHTML = `
            <div class="ending-stat"><div class="es-value">${stats.academics}</div><div class="es-label">📚 Academics</div></div>
            <div class="ending-stat"><div class="es-value">${stats.social}</div><div class="es-label">👥 Social</div></div>
            <div class="ending-stat"><div class="es-value">${stats.energy}</div><div class="es-label">⚡ Energy</div></div>
            <div class="ending-stat"><div class="es-value">${stats.stress}</div><div class="es-label">😰 Stress</div></div>
            <div class="ending-stat"><div class="es-value">${stats.happiness}</div><div class="es-label">😊 Happiness</div></div>
            <div class="ending-stat"><div class="es-value">${stats.reputation}</div><div class="es-label">⭐ Reputation</div></div>
            <div class="ending-stat"><div class="es-value">$${this.player.money}</div><div class="es-label">💰 Money</div></div>
            <div class="ending-stat"><div class="es-value">${this.day}</div><div class="es-label">📅 Days</div></div>
        `;

        if (this.mode === 'speedrun') {
            const elapsed = Math.round((Date.now() - this.speedrunStart) / 1000);
            statsDiv.innerHTML += `<div class="ending-stat"><div class="es-value">${elapsed}s</div><div class="es-label">⏱️ Speed Run Time</div></div>`;
        }

        Utils.showScreen('screen-ending');
    },

    /* ---- Save Game ---- */
    saveGame() {
        if (!this.player) return;
        const saveData = {
            player: this.player,
            currentNode: this.currentNode,
            day: this.day,
            period: this.period,
            mode: this.mode,
            itemsBought: this.itemsBought,
            clubsJoined: [...this.clubsJoined],
            settings: this.settings,
            timestamp: Date.now()
        };
        Utils.save('tls_save', saveData);
        document.getElementById('btn-continue').style.display = 'block';
    },

    /* ---- Load Game ---- */
    loadGame() {
        const saved = Utils.load('tls_save');
        if (!saved) {
            Utils.toast('No saved game found', 'warning');
            return;
        }

        this.player = saved.player;
        this.currentNode = saved.currentNode;
        this.day = saved.day || 1;
        this.period = saved.period || 0;
        this.mode = saved.mode || 'story';
        this.itemsBought = saved.itemsBought || 0;
        this.clubsJoined = new Set(saved.clubsJoined || []);

        if (saved.settings) {
            Object.assign(this.settings, saved.settings);
            this.applySettings();
        }

        this.updateStatsUI();
        Utils.showScreen('screen-game');
        this.goToNode(this.currentNode);
        Utils.toast('💾 Game loaded!', 'success');
    },

    /* ---- Export Save ---- */
    exportSave() {
        const data = Utils.load('tls_save');
        const achievements = Utils.load('tls_achievements');
        const exportData = { save: data, achievements: achievements, version: '1.0' };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `teenage-life-sim-save-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Utils.toast('📤 Save exported!', 'success');
    },

    /* ---- Import Save ---- */
    importSave(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (data.save) Utils.save('tls_save', data.save);
                if (data.achievements) {
                    Utils.save('tls_achievements', data.achievements);
                    Achievements.unlocked = new Set(data.achievements);
                }
                document.getElementById('btn-continue').style.display = 'block';
                Utils.toast('📥 Save imported!', 'success');
            } catch (err) {
                Utils.toast('❌ Invalid save file', 'danger');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }
};

/* ---- Initialize on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
