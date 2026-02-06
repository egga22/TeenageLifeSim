/* =============================================
   MINIGAMES — Interactive minigame modules
   ============================================= */

const Minigames = {
    currentCallback: null,

    /* Launch a minigame */
    launch(type, callback) {
        this.currentCallback = callback;
        Utils.showScreen('screen-minigame');
        switch (type) {
            case 'quiz': this.startQuiz(); break;
            case 'typing': this.startTyping(); break;
            case 'memory': this.startMemory(); break;
            case 'reaction': this.startReaction(); break;
            case 'catch': this.startCatch(); break;
            default: this.startQuiz();
        }
    },

    /* Finish a minigame and return to game */
    finish(score, maxScore) {
        const pct = Math.round((score / maxScore) * 100);
        let grade, emoji;
        if (pct >= 90) { grade = 'A+'; emoji = '🌟'; }
        else if (pct >= 80) { grade = 'A'; emoji = '😄'; }
        else if (pct >= 70) { grade = 'B'; emoji = '😊'; }
        else if (pct >= 60) { grade = 'C'; emoji = '😐'; }
        else if (pct >= 50) { grade = 'D'; emoji = '😟'; }
        else { grade = 'F'; emoji = '😢'; }

        const area = document.getElementById('minigame-area');
        area.innerHTML = `
            <div class="minigame-results">
                <h3>Minigame Complete!</h3>
                <div class="result-grade">${emoji} ${grade}</div>
                <div class="result-detail">Score: ${score}/${maxScore} (${pct}%)</div>
                <button class="btn btn-primary btn-large" id="btn-minigame-done">Continue</button>
            </div>
        `;

        document.getElementById('btn-minigame-done').addEventListener('click', () => {
            Utils.showScreen('screen-game');
            if (this.currentCallback) {
                this.currentCallback(score, maxScore, pct);
            }
        });
    },

    /* ==================== QUIZ MINIGAME ==================== */
    startQuiz() {
        const title = document.getElementById('minigame-title');
        title.textContent = '📝 Study Quiz';

        const subjects = Object.keys(GameData.quizQuestions);
        const subject = Utils.randFrom(subjects);
        const questions = Utils.shuffle([...GameData.quizQuestions[subject]]).slice(0, 4);

        let currentQ = 0;
        let score = 0;
        const total = questions.length;

        const renderQuestion = () => {
            const q = questions[currentQ];
            const area = document.getElementById('minigame-area');
            const status = document.getElementById('minigame-status');
            status.textContent = `Question ${currentQ + 1} of ${total}`;

            area.innerHTML = `
                <div class="quiz-progress">Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)}</div>
                <div class="quiz-question">${Utils.escapeHtml(q.q)}</div>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}">${Utils.escapeHtml(opt)}</button>
                    `).join('')}
                </div>
            `;

            area.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    const correct = idx === q.answer;

                    // Disable all buttons
                    area.querySelectorAll('.quiz-option').forEach(b => {
                        b.disabled = true;
                        if (parseInt(b.dataset.index) === q.answer) b.classList.add('correct');
                        if (parseInt(b.dataset.index) === idx && !correct) b.classList.add('wrong');
                    });

                    if (correct) score++;

                    setTimeout(() => {
                        currentQ++;
                        if (currentQ < total) {
                            renderQuestion();
                        } else {
                            if (score === total) Achievements.unlock('quiz_ace');
                            this.finish(score, total);
                        }
                    }, 1200);
                });
            });
        };

        renderQuestion();
    },

    /* ==================== TYPING MINIGAME ==================== */
    startTyping() {
        const title = document.getElementById('minigame-title');
        title.textContent = '⌨️ Typing Challenge';

        const prompt = Utils.randFrom(GameData.typingPrompts);
        const area = document.getElementById('minigame-area');
        const status = document.getElementById('minigame-status');

        area.innerHTML = `
            <div class="typing-prompt" id="typing-display">${Utils.escapeHtml(prompt)}</div>
            <input type="text" class="typing-input" id="typing-input" placeholder="Start typing..." autocomplete="off" autocapitalize="off">
            <div class="typing-stats">
                <span id="typing-accuracy">Accuracy: 100%</span>
                <span id="typing-time">Time: 0s</span>
            </div>
        `;
        status.textContent = 'Type the text above as fast and accurately as you can!';

        const input = document.getElementById('typing-input');
        const display = document.getElementById('typing-display');
        const accEl = document.getElementById('typing-accuracy');
        const timeEl = document.getElementById('typing-time');

        let startTime = null;
        let timerInterval = null;

        input.focus();

        input.addEventListener('input', () => {
            if (!startTime) {
                startTime = Date.now();
                timerInterval = setInterval(() => {
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                    timeEl.textContent = `Time: ${elapsed}s`;
                }, 100);
            }

            const typed = input.value;
            let correct = 0;
            let html = '';

            for (let i = 0; i < prompt.length; i++) {
                if (i < typed.length) {
                    if (typed[i] === prompt[i]) {
                        html += `<span class="typed-correct">${Utils.escapeHtml(prompt[i])}</span>`;
                        correct++;
                    } else {
                        html += `<span class="typed-wrong">${Utils.escapeHtml(prompt[i])}</span>`;
                    }
                } else {
                    html += `<span class="typed-remaining">${Utils.escapeHtml(prompt[i])}</span>`;
                }
            }

            display.innerHTML = html;
            const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
            accEl.textContent = `Accuracy: ${accuracy}%`;

            if (typed.length >= prompt.length) {
                clearInterval(timerInterval);
                input.disabled = true;
                const finalAccuracy = Math.round((correct / prompt.length) * 100);
                if (finalAccuracy >= 90) Achievements.unlock('speed_demon');
                this.finish(finalAccuracy, 100);
            }
        });
    },

    /* ==================== MEMORY MATCH MINIGAME ==================== */
    startMemory() {
        const title = document.getElementById('minigame-title');
        title.textContent = '🧠 Memory Match';

        const pairs = 6;
        const emojis = Utils.shuffle([...GameData.memoryEmojis]).slice(0, pairs);
        const cards = Utils.shuffle([...emojis, ...emojis]);

        const area = document.getElementById('minigame-area');
        const status = document.getElementById('minigame-status');

        let flipped = [];
        let matched = 0;
        let moves = 0;
        const startTime = Date.now();

        area.innerHTML = `
            <div class="memory-grid memory-grid-4">
                ${cards.map((emoji, i) => `
                    <button class="memory-card" data-index="${i}" data-emoji="${emoji}" aria-label="Card ${i + 1}">${emoji}</button>
                `).join('')}
            </div>
        `;
        status.textContent = `Matches: 0/${pairs} | Moves: 0`;

        const cardEls = area.querySelectorAll('.memory-card');

        cardEls.forEach(card => {
            card.addEventListener('click', () => {
                if (flipped.length >= 2) return;
                if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

                card.classList.add('flipped');
                flipped.push(card);

                if (flipped.length === 2) {
                    moves++;
                    const [a, b] = flipped;
                    const match = a.dataset.emoji === b.dataset.emoji;

                    setTimeout(() => {
                        if (match) {
                            a.classList.add('matched');
                            b.classList.add('matched');
                            matched++;
                            status.textContent = `Matches: ${matched}/${pairs} | Moves: ${moves}`;

                            if (matched === pairs) {
                                const elapsed = (Date.now() - startTime) / 1000;
                                if (elapsed < 30) Achievements.unlock('memory_master');
                                const scoreVal = Math.max(0, 100 - (moves - pairs) * 5);
                                this.finish(Math.round(scoreVal), 100);
                            }
                        } else {
                            a.classList.remove('flipped');
                            b.classList.remove('flipped');
                        }
                        flipped = [];
                    }, 800);
                }
            });
        });
    },

    /* ==================== REACTION TIME MINIGAME ==================== */
    startReaction() {
        const title = document.getElementById('minigame-title');
        title.textContent = '⚡ Reaction Test';

        const area = document.getElementById('minigame-area');
        const status = document.getElementById('minigame-status');

        let round = 0;
        const maxRounds = 5;
        let times = [];
        let waitTimeout = null;
        let startTime = 0;

        const startRound = () => {
            round++;
            if (round > maxRounds) {
                const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
                if (avg < 250) Achievements.unlock('reaction_fast');
                const score = Math.max(0, Math.min(100, Math.round(100 - (avg - 150) / 5)));
                this.finish(score, 100);
                return;
            }

            status.textContent = `Round ${round} of ${maxRounds}`;

            area.innerHTML = `
                <div class="reaction-box waiting" id="reaction-box">Wait for GREEN...</div>
            `;

            const box = document.getElementById('reaction-box');
            let tooEarly = false;

            const delay = Utils.randInt(1500, 4000);
            waitTimeout = setTimeout(() => {
                if (tooEarly) return;
                box.className = 'reaction-box ready';
                box.textContent = 'CLICK NOW!';
                startTime = Date.now();
            }, delay);

            box.addEventListener('click', function handler() {
                box.removeEventListener('click', handler);

                if (box.classList.contains('waiting')) {
                    clearTimeout(waitTimeout);
                    tooEarly = true;
                    box.className = 'reaction-box result';
                    box.textContent = 'Too early! Click to retry';
                    box.addEventListener('click', () => {
                        round--;
                        startRound();
                    }, { once: true });
                } else {
                    const reactionTime = Date.now() - startTime;
                    times.push(reactionTime);
                    box.className = 'reaction-box result';
                    box.textContent = `${reactionTime}ms! Click for next`;
                    box.addEventListener('click', () => startRound(), { once: true });
                }
            });
        };

        startRound();
    },

    /* ==================== CATCH GAME MINIGAME ==================== */
    startCatch() {
        const title = document.getElementById('minigame-title');
        title.textContent = '🧺 Catch Game';

        const area = document.getElementById('minigame-area');
        const status = document.getElementById('minigame-status');

        const items = ['📚', '⭐', '💎', '🍎', '📝'];
        const badItems = ['💣', '🗑️'];
        let score = 0;
        let basketX = 50;
        const duration = 15000;
        let gameActive = true;

        area.innerHTML = `
            <div class="catch-area" id="catch-zone">
                <div class="catch-basket" id="catch-basket" style="left:calc(50% - 20px)">🧺</div>
            </div>
            <div class="catch-score">Score: <span id="catch-score">0</span></div>
        `;
        status.textContent = 'Move the basket to catch items! Avoid bombs!';

        const zone = document.getElementById('catch-zone');
        const basket = document.getElementById('catch-basket');
        const scoreEl = document.getElementById('catch-score');
        const zoneRect = () => zone.getBoundingClientRect();

        // Mouse/touch movement
        const moveBasket = (clientX) => {
            const rect = zoneRect();
            basketX = ((clientX - rect.left) / rect.width) * 100;
            basketX = Utils.clamp(basketX, 5, 95);
            basket.style.left = `calc(${basketX}% - 20px)`;
        };

        zone.addEventListener('mousemove', e => moveBasket(e.clientX));
        zone.addEventListener('touchmove', e => {
            e.preventDefault();
            moveBasket(e.touches[0].clientX);
        }, { passive: false });

        // Spawn items
        const spawnItem = () => {
            if (!gameActive) return;
            const isBad = Math.random() < 0.2;
            const emoji = isBad ? Utils.randFrom(badItems) : Utils.randFrom(items);
            const el = document.createElement('div');
            el.className = 'catch-item';
            el.textContent = emoji;
            el.dataset.bad = isBad ? '1' : '0';
            el.style.left = Utils.randInt(5, 90) + '%';
            el.style.top = '-30px';
            zone.appendChild(el);

            let y = -30;
            const speed = Utils.randInt(2, 5);
            const fall = setInterval(() => {
                if (!gameActive) { clearInterval(fall); el.remove(); return; }
                y += speed;
                el.style.top = y + 'px';

                // Check collision with basket
                const rect = zoneRect();
                const basketPos = basketX;
                const itemPos = parseFloat(el.style.left);
                const yPct = y / rect.height * 100;

                if (yPct > 80 && yPct < 95 && Math.abs(basketPos - itemPos) < 12) {
                    clearInterval(fall);
                    el.remove();
                    if (isBad) {
                        score = Math.max(0, score - 3);
                        Utils.toast('💥 Caught a bomb! -3', 'danger', 1000);
                    } else {
                        score++;
                    }
                    scoreEl.textContent = score;
                }

                if (y > rect.height) {
                    clearInterval(fall);
                    el.remove();
                }
            }, 30);
        };

        const spawnInterval = setInterval(() => {
            if (!gameActive) { clearInterval(spawnInterval); return; }
            spawnItem();
        }, 800);

        // Game timer
        setTimeout(() => {
            gameActive = false;
            clearInterval(spawnInterval);
            this.finish(Math.min(score, 20), 20);
        }, duration);
    }
};
