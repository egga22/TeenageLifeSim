/* =============================================
   ACHIEVEMENTS — Achievement tracking system
   ============================================= */

const Achievements = {
    /* Achievement definitions */
    list: [
        { id: 'first_day', name: 'First Day', icon: '🏫', desc: 'Complete your first day of school.', hidden: false },
        { id: 'bookworm', name: 'Bookworm', icon: '📚', desc: 'Reach 80+ Academics.', hidden: false },
        { id: 'social_star', name: 'Social Star', icon: '🌟', desc: 'Reach 80+ Social.', hidden: false },
        { id: 'energizer', name: 'Energizer', icon: '⚡', desc: 'Reach 100 Energy.', hidden: false },
        { id: 'chill_out', name: 'Zen Master', icon: '🧘', desc: 'Get stress down to 0.', hidden: false },
        { id: 'joyful', name: 'Pure Joy', icon: '😄', desc: 'Reach 100 Happiness.', hidden: false },
        { id: 'famous', name: 'Famous', icon: '⭐', desc: 'Reach 90+ Reputation.', hidden: false },
        { id: 'rich', name: 'Money Bags', icon: '💰', desc: 'Have $100 or more.', hidden: false },
        { id: 'quiz_ace', name: 'Quiz Ace', icon: '🧠', desc: 'Get a perfect score on a quiz.', hidden: false },
        { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', desc: 'Complete a typing challenge with 90%+ accuracy.', hidden: false },
        { id: 'memory_master', name: 'Memory Master', icon: '🃏', desc: 'Complete memory match in under 30 seconds.', hidden: false },
        { id: 'first_friend', name: 'First Friend', icon: '🤝', desc: 'Make your first friend.', hidden: false },
        { id: 'club_member', name: 'Club Member', icon: '🏅', desc: 'Join a club.', hidden: false },
        { id: 'shopaholic', name: 'Shopaholic', icon: '🛍️', desc: 'Buy 5 items from the shop.', hidden: false },
        { id: 'survivor', name: 'Survivor', icon: '💪', desc: 'Survive with all stats above 25.', hidden: false },
        { id: 'perfectionist', name: 'Perfectionist', icon: '✨', desc: 'Have 3 stats at 80+.', hidden: false },
        { id: 'tutorial_complete', name: 'Student', icon: '📝', desc: 'Complete the tutorial.', hidden: false },
        { id: 'ending_valedictorian', name: 'Valedictorian', icon: '🎓', desc: 'Achieve the Valedictorian ending.', hidden: true },
        { id: 'ending_social', name: 'Butterfly Effect', icon: '🦋', desc: 'Achieve the Social Butterfly ending.', hidden: true },
        { id: 'ending_rebel', name: 'Rebel Yell', icon: '🎸', desc: 'Achieve the Rebel ending.', hidden: true },
        { id: 'ending_star', name: 'Superstar', icon: '⭐', desc: 'Achieve the Rising Star ending.', hidden: true },
        { id: 'ending_burnout', name: 'Lesson Learned', icon: '🔥', desc: 'Experience burnout ending.', hidden: true },
        { id: 'played_5', name: 'Dedicated', icon: '🔄', desc: 'Play the game 5 times.', hidden: false },
        { id: 'all_clubs', name: 'Overachiever', icon: '🏆', desc: 'Try all different clubs.', hidden: true },
        { id: 'sandbox_player', name: 'Free Spirit', icon: '🏖️', desc: 'Play Sandbox mode.', hidden: false },
        { id: 'speedrunner', name: 'Speedrunner', icon: '⏱️', desc: 'Complete Speed Run mode.', hidden: false },
        { id: 'random_warrior', name: 'Chaos Agent', icon: '🎲', desc: 'Complete Random Challenge mode.', hidden: false },
        { id: 'hard_mode', name: 'Hardcore', icon: '💀', desc: 'Complete the game on Hard difficulty.', hidden: false },
        { id: 'max_stat', name: 'Maxed Out', icon: '📊', desc: 'Get any stat to 100.', hidden: false },
        { id: 'reaction_fast', name: 'Lightning Reflexes', icon: '⚡', desc: 'Get under 250ms in reaction test.', hidden: false }
    ],

    /* Unlocked achievements (loaded from save) */
    unlocked: new Set(),

    /* Initialize from save */
    init() {
        const saved = Utils.load('tls_achievements');
        if (saved && Array.isArray(saved)) {
            this.unlocked = new Set(saved);
        }
    },

    /* Save achievements */
    save() {
        Utils.save('tls_achievements', [...this.unlocked]);
    },

    /* Unlock an achievement */
    unlock(id) {
        if (this.unlocked.has(id)) return false;
        const ach = this.list.find(a => a.id === id);
        if (!ach) return false;

        this.unlocked.add(id);
        this.save();

        // Show popup
        const popup = document.getElementById('achievement-popup');
        const nameEl = document.getElementById('achievement-popup-name');
        const iconEl = document.getElementById('achievement-popup-icon');
        if (popup && nameEl && iconEl) {
            iconEl.textContent = ach.icon;
            nameEl.textContent = ach.name;
            popup.style.display = 'block';
            setTimeout(() => { popup.style.display = 'none'; }, 3500);
        }

        Utils.toast(`🏆 Achievement: ${ach.name}`, 'success');
        return true;
    },

    /* Check stat-based achievements */
    checkStats(stats) {
        if (stats.academics >= 80) this.unlock('bookworm');
        if (stats.social >= 80) this.unlock('social_star');
        if (stats.energy >= 100) this.unlock('energizer');
        if (stats.stress <= 0) this.unlock('chill_out');
        if (stats.happiness >= 100) this.unlock('joyful');
        if (stats.reputation >= 90) this.unlock('famous');

        if (stats.academics >= 100 || stats.social >= 100 || stats.energy >= 100 ||
            stats.happiness >= 100 || stats.reputation >= 100) {
            this.unlock('max_stat');
        }

        const high = [stats.academics, stats.social, stats.energy, stats.happiness, stats.reputation]
            .filter(v => v >= 80).length;
        if (high >= 3) this.unlock('perfectionist');

        const allAbove25 = stats.academics >= 25 && stats.social >= 25 && stats.energy >= 25 &&
            stats.happiness >= 25 && stats.reputation >= 25 && stats.stress < 75;
        if (allAbove25) this.unlock('survivor');
    },

    /* Render achievements screen */
    render() {
        const list = document.getElementById('achievement-list');
        const statsEl = document.getElementById('achievement-stats');
        if (!list || !statsEl) return;

        const total = this.list.length;
        const unlocked = this.unlocked.size;
        statsEl.textContent = `${unlocked} / ${total} Achievements Unlocked (${Math.round(unlocked / total * 100)}%)`;

        list.innerHTML = '';
        this.list.forEach(ach => {
            const isUnlocked = this.unlocked.has(ach.id);
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            card.setAttribute('role', 'listitem');
            card.innerHTML = `
                <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
                <div class="ach-info">
                    <div class="ach-name">${ach.hidden && !isUnlocked ? '???' : Utils.escapeHtml(ach.name)}</div>
                    <div class="ach-desc">${ach.hidden && !isUnlocked ? 'Hidden achievement' : Utils.escapeHtml(ach.desc)}</div>
                </div>
            `;
            list.appendChild(card);
        });
    }
};
