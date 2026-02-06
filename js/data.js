/* =============================================
   DATA — Game data, characters, events, items
   ============================================= */

const GameData = {

    /* ---- Characters / NPCs ---- */
    characters: {
        alex: {
            name: 'Alex Chen',
            avatar: '🧑‍🎓',
            role: 'Best Friend',
            personality: 'loyal',
            desc: 'Your childhood best friend. Always has your back.'
        },
        jordan: {
            name: 'Jordan Rivera',
            avatar: '😎',
            role: 'Cool Kid',
            personality: 'charming',
            desc: 'The most popular person in school. Mysterious and magnetic.'
        },
        sam: {
            name: 'Sam Taylor',
            avatar: '🤓',
            role: 'Study Partner',
            personality: 'nerdy',
            desc: 'Top of the class. A bit socially awkward but incredibly smart.'
        },
        riley: {
            name: 'Riley Park',
            avatar: '🎨',
            role: 'Creative Soul',
            personality: 'artistic',
            desc: 'The school artist. Sees beauty in everything.'
        },
        morgan: {
            name: 'Morgan Lee',
            avatar: '🏃',
            role: 'Star Athlete',
            personality: 'competitive',
            desc: 'Captain of the track team. Driven and focused.'
        },
        casey: {
            name: 'Casey Williams',
            avatar: '🎭',
            role: 'Drama Student',
            personality: 'dramatic',
            desc: 'Lives for the stage. Every moment is a performance.'
        },
        teacher_ms_chen: {
            name: 'Ms. Chen',
            avatar: '👩‍🏫',
            role: 'English Teacher',
            personality: 'strict',
            desc: 'Tough but fair. Pushes students to their best.'
        },
        teacher_mr_garcia: {
            name: 'Mr. Garcia',
            avatar: '👨‍🔬',
            role: 'Science Teacher',
            personality: 'enthusiastic',
            desc: 'Makes science exciting. Loves experiments.'
        },
        principal: {
            name: 'Principal Thompson',
            avatar: '🏫',
            role: 'Principal',
            personality: 'authoritative',
            desc: 'Runs a tight ship. Fair but firm.'
        },
        parent: {
            name: 'Parent',
            avatar: '🏠',
            role: 'Parent',
            personality: 'caring',
            desc: 'Wants the best for you. Sometimes overprotective.'
        }
    },

    /* ---- Relationship Levels ---- */
    relationshipLevels: [
        { min: 0, label: 'Stranger', emoji: '😐' },
        { min: 20, label: 'Acquaintance', emoji: '🙂' },
        { min: 40, label: 'Friend', emoji: '😊' },
        { min: 60, label: 'Good Friend', emoji: '😄' },
        { min: 80, label: 'Best Friend', emoji: '🤝' },
        { min: 95, label: 'Inseparable', emoji: '💕' }
    ],

    /* ---- Quiz Questions (for study minigame) ---- */
    quizQuestions: {
        english: [
            { q: "Who wrote 'Romeo and Juliet'?", options: ['Shakespeare', 'Dickens', 'Austen', 'Hemingway'], answer: 0 },
            { q: "What is a metaphor?", options: ['A comparison using like/as', 'A direct comparison', 'A type of poem', 'A literary device using sounds'], answer: 1 },
            { q: "What is the protagonist?", options: ['The villain', 'The main character', 'The narrator', 'The setting'], answer: 1 },
            { q: "Which is a synonym for 'happy'?", options: ['Morose', 'Elated', 'Sullen', 'Melancholy'], answer: 1 },
            { q: "What does 'foreshadowing' mean?", options: ['Looking backward', 'Hints about future events', 'A type of shadow', 'A flashback technique'], answer: 1 },
            { q: "What is an oxymoron?", options: ['A foolish person', 'Contradictory terms together', 'A type of simile', 'Exaggeration'], answer: 1 }
        ],
        math: [
            { q: "What is 15% of 200?", options: ['15', '20', '30', '35'], answer: 2 },
            { q: "Solve: 3x + 7 = 22. What is x?", options: ['3', '4', '5', '6'], answer: 2 },
            { q: "What is the area of a triangle with base 8 and height 6?", options: ['48', '24', '14', '36'], answer: 1 },
            { q: "What is √144?", options: ['10', '11', '12', '14'], answer: 2 },
            { q: "What is 2³?", options: ['6', '8', '9', '16'], answer: 1 },
            { q: "If a = 3, what is a² + 2a?", options: ['12', '15', '18', '21'], answer: 1 }
        ],
        science: [
            { q: "What is the chemical symbol for water?", options: ['O2', 'CO2', 'H2O', 'NaCl'], answer: 2 },
            { q: "What force keeps us on the ground?", options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], answer: 2 },
            { q: "What is the powerhouse of the cell?", options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], answer: 2 },
            { q: "What planet is closest to the Sun?", options: ['Venus', 'Mars', 'Mercury', 'Earth'], answer: 2 },
            { q: "What gas do plants absorb?", options: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Carbon Dioxide'], answer: 3 },
            { q: "What is the speed of light approximately?", options: ['300 km/s', '300,000 km/s', '30,000 km/s', '3,000 km/s'], answer: 1 }
        ],
        history: [
            { q: "In what year did World War II end?", options: ['1943', '1944', '1945', '1946'], answer: 2 },
            { q: "Who was the first President of the United States?", options: ['Jefferson', 'Adams', 'Washington', 'Lincoln'], answer: 2 },
            { q: "What was the Renaissance?", options: ['A war', 'A cultural rebirth', 'A plague', 'A religion'], answer: 1 },
            { q: "Ancient Egypt is famous for building what?", options: ['Colosseum', 'Pyramids', 'Great Wall', 'Stonehenge'], answer: 1 },
            { q: "What document begins with 'We the People'?", options: ['Magna Carta', 'Bill of Rights', 'US Constitution', 'Declaration of Independence'], answer: 2 },
            { q: "Who discovered America in 1492?", options: ['Magellan', 'Columbus', 'Cortez', 'Drake'], answer: 1 }
        ]
    },

    /* ---- Typing Prompts ---- */
    typingPrompts: [
        'The quick brown fox jumps over the lazy dog',
        'Education is the most powerful weapon',
        'To be or not to be that is the question',
        'All that glitters is not gold',
        'Knowledge is power and power is knowledge',
        'Practice makes perfect every single day',
        'The future belongs to those who believe',
        'Stay hungry stay foolish always',
        'Life is what happens while you plan',
        'Every champion was once a contender'
    ],

    /* ---- Memory Match Emoji Sets ---- */
    memoryEmojis: ['📚', '🎨', '⚽', '🎵', '🔬', '📝', '🎭', '💻'],

    /* ---- Random Events ---- */
    randomEvents: [
        {
            id: 'found_money',
            text: 'You find a $10 bill on the ground in the hallway!',
            effects: { money: 10, happiness: 5 },
            probability: 0.08
        },
        {
            id: 'pop_quiz',
            text: 'Surprise! The teacher announces a pop quiz!',
            effects: { stress: 15, energy: -10 },
            probability: 0.12,
            triggerMinigame: 'quiz'
        },
        {
            id: 'compliment',
            text: 'A classmate compliments your outfit today. Nice!',
            effects: { happiness: 10, social: 5 },
            probability: 0.1
        },
        {
            id: 'bad_lunch',
            text: 'The cafeteria food is especially terrible today...',
            effects: { happiness: -5, energy: -5 },
            probability: 0.08
        },
        {
            id: 'viral_moment',
            text: 'Someone posted a funny video of you. It\'s going viral!',
            effects: { social: 10, reputation: -5, stress: 10 },
            probability: 0.05
        },
        {
            id: 'extra_credit',
            text: 'The teacher offers an extra credit opportunity!',
            effects: { academics: 10, stress: 5 },
            probability: 0.08
        },
        {
            id: 'rain',
            text: 'It starts pouring rain and you forgot your umbrella.',
            effects: { happiness: -5 },
            probability: 0.1
        },
        {
            id: 'free_period',
            text: 'Your teacher is absent! Free period!',
            effects: { happiness: 10, energy: 10, stress: -5 },
            probability: 0.07
        },
        {
            id: 'lost_homework',
            text: 'Oh no! You can\'t find your homework assignment!',
            effects: { academics: -10, stress: 15 },
            probability: 0.06
        },
        {
            id: 'new_friend',
            text: 'A new student joins your class and seems really cool.',
            effects: { social: 5 },
            probability: 0.05
        },
        {
            id: 'great_weather',
            text: 'Beautiful weather today! Everyone\'s in a great mood.',
            effects: { happiness: 8, energy: 5, stress: -5 },
            probability: 0.1
        },
        {
            id: 'locker_jammed',
            text: 'Your locker is jammed! You\'re going to be late to class.',
            effects: { stress: 8, reputation: -3 },
            probability: 0.08
        }
    ],

    /* ---- Difficulty Modifiers ---- */
    difficultyModifiers: {
        easy: {
            statGainMultiplier: 1.5,
            statLossMultiplier: 0.5,
            stressMultiplier: 0.5,
            moneyMultiplier: 1.5,
            timedChoiceDuration: 25000,
            hintAvailable: true,
            label: '😊 Easy'
        },
        normal: {
            statGainMultiplier: 1.0,
            statLossMultiplier: 1.0,
            stressMultiplier: 1.0,
            moneyMultiplier: 1.0,
            timedChoiceDuration: 15000,
            hintAvailable: false,
            label: '😐 Normal'
        },
        hard: {
            statGainMultiplier: 0.7,
            statLossMultiplier: 1.5,
            stressMultiplier: 1.5,
            moneyMultiplier: 0.7,
            timedChoiceDuration: 8000,
            hintAvailable: false,
            label: '😤 Hard'
        }
    },

    /* ---- Items / Shop ---- */
    shopItems: [
        { id: 'coffee', name: '☕ Coffee', cost: 3, effect: { energy: 15 }, desc: 'A quick energy boost!' },
        { id: 'snack', name: '🍕 Snack', cost: 5, effect: { happiness: 10, energy: 5 }, desc: 'Tasty snack from the vending machine.' },
        { id: 'notebook', name: '📓 Notebook', cost: 8, effect: { academics: 5 }, desc: 'Better notes, better grades.' },
        { id: 'headphones', name: '🎧 Headphones', cost: 15, effect: { stress: -15, happiness: 10 }, desc: 'Tune out the noise.' },
        { id: 'gift', name: '🎁 Gift', cost: 10, effect: { social: 10 }, desc: 'A small gift for a friend.' },
        { id: 'energy_drink', name: '⚡ Energy Drink', cost: 4, effect: { energy: 25, stress: 5 }, desc: 'Maximum energy! Slight stress.' },
        { id: 'book', name: '📖 Novel', cost: 12, effect: { academics: 8, stress: -8 }, desc: 'Reading for fun and learning.' },
        { id: 'game', name: '🎮 Video Game', cost: 20, effect: { happiness: 20, stress: -10, academics: -5 }, desc: 'So fun! Might distract from studies.' }
    ],

    /* ---- Club Data ---- */
    clubs: {
        sports: { name: '⚽ Sports Club', statBonus: 'energy', socialBonus: 10, desc: 'Build fitness and teamwork.' },
        drama: { name: '🎭 Drama Club', statBonus: 'social', socialBonus: 15, desc: 'Express yourself on stage.' },
        science: { name: '🔬 Science Club', statBonus: 'academics', socialBonus: 5, desc: 'Explore the wonders of science.' },
        music: { name: '🎵 Music Club', statBonus: 'happiness', socialBonus: 10, desc: 'Make beautiful music together.' },
        art: { name: '🎨 Art Club', statBonus: 'happiness', socialBonus: 8, desc: 'Create and be inspired.' },
        gaming: { name: '🎮 Gaming Club', statBonus: 'stress', socialBonus: 12, desc: 'Compete and have fun. Reduces stress.' }
    },

    /* ---- Period Names ---- */
    periods: ['Morning', 'Class 1', 'Class 2', 'Lunch', 'Class 3', 'After School', 'Evening'],

    /* ---- Endings ---- */
    endings: {
        valedictorian: {
            id: 'valedictorian',
            title: '🎓 The Valedictorian',
            icon: '🏆',
            condition: (s) => s.academics >= 90 && s.stress < 60,
            text: 'Through dedication and hard work, you graduate at the top of your class! Your valedictorian speech moves everyone to tears. College scholarships pour in, and you\'re set for an amazing future. Your parents couldn\'t be prouder.',
            rarity: 'legendary'
        },
        socialButterfly: {
            id: 'socialButterfly',
            title: '🦋 Social Butterfly',
            icon: '🦋',
            condition: (s) => s.social >= 85 && s.reputation >= 80,
            text: 'You became the heart and soul of the school! Everyone knows your name, and you\'ve built friendships that will last a lifetime. Prom King/Queen? Obviously. You leave high school as a legend.',
            rarity: 'rare'
        },
        burnout: {
            id: 'burnout',
            title: '😵 Burned Out',
            icon: '🔥',
            condition: (s) => s.stress >= 90,
            text: 'The pressure became too much. Between classes, clubs, social drama, and trying to please everyone, you burned out hard. But hitting rock bottom taught you the most valuable lesson: it\'s okay to ask for help. You take a gap year and come back stronger.',
            rarity: 'common'
        },
        rebel: {
            id: 'rebel',
            title: '🎸 The Rebel',
            icon: '🎸',
            condition: (s) => s.reputation <= 30 && s.happiness >= 60,
            text: 'You never played by the rules, and you know what? It worked out. You started a band, built a following, and proved that success doesn\'t always look conventional. The principal was NOT happy at graduation... but the crowd loved it.',
            rarity: 'rare'
        },
        balanced: {
            id: 'balanced',
            title: '⚖️ Well Rounded',
            icon: '⚖️',
            condition: (s) => s.academics >= 50 && s.social >= 50 && s.happiness >= 50 && s.stress < 50,
            text: 'You did it all — good grades, great friends, fun memories, and manageable stress. Not the top at anything, but excellent at everything. You graduate with a smile, knowing you made the most of every moment.',
            rarity: 'common'
        },
        loner: {
            id: 'loner',
            title: '🐺 Lone Wolf',
            icon: '🐺',
            condition: (s) => s.social <= 25,
            text: 'You kept to yourself, and that was okay. While others worried about popularity, you focused on what mattered to you. You discovered your own path, and it turns out the quiet ones often have the most interesting stories.',
            rarity: 'uncommon'
        },
        dropout: {
            id: 'dropout',
            title: '📦 Taking a Different Path',
            icon: '📦',
            condition: (s) => s.academics <= 15 && s.happiness <= 25,
            text: 'School wasn\'t for you, and that became painfully clear. But dropping out isn\'t the end — it\'s a different beginning. You found your passion outside the classroom and eventually earned your GED. Life is a marathon, not a sprint.',
            rarity: 'uncommon'
        },
        star: {
            id: 'star',
            title: '⭐ Rising Star',
            icon: '⭐',
            condition: (s) => s.reputation >= 90,
            text: 'Your name echoes through the halls long after graduation. MVP, club president, prom royalty — you did it all. Scouts, recruiters, and talent agents are all calling. The world is your stage, and you\'re ready to shine.',
            rarity: 'legendary'
        },
        default: {
            id: 'default',
            title: '📖 A New Chapter',
            icon: '📖',
            condition: () => true,
            text: 'High school is over. It wasn\'t perfect, but it was yours. Every choice, every friendship, every late night studying — it all made you who you are. As you walk across that stage, you know the best is yet to come.',
            rarity: 'common'
        }
    },

    /* ---- Tutorial Steps ---- */
    tutorialSteps: [
        {
            title: "Welcome to Teenage Life Sim!",
            text: "This tutorial will teach you the basics. Let's start!\n\nYou'll navigate high school life by making choices that affect your stats and relationships.",
            choices: [{ text: "Let's go! 🎉", next: 1 }]
        },
        {
            title: "📊 Understanding Stats",
            text: "Look at the stat bars at the top. You have six key stats:\n\n📚 Academics — Your grades and learning\n👥 Social — Your friendships and connections\n⚡ Energy — How tired or rested you are\n😰 Stress — Keep this LOW!\n😊 Happiness — Your overall mood\n⭐ Reputation — How others see you\n\nEvery choice you make affects these stats!",
            choices: [{ text: "Got it! What's next?", next: 2 }]
        },
        {
            title: "🎯 Making Choices",
            text: "Throughout the game, you'll face choices. Some are easy, some are really tough!\n\nPay attention to the hints below each choice — they tell you what stats might change.\n\nSome choices are TIMED, especially on harder difficulties. Watch for the timer bar!",
            choices: [
                { text: "📚 Study for the test (+Academics, -Energy)", next: 3, effects: { academics: 5, energy: -3 } },
                { text: "🎉 Go to the party (+Social, +Stress)", next: 3, effects: { social: 5, stress: 3 } }
            ]
        },
        {
            title: "🎮 Minigames",
            text: "Sometimes you'll play minigames! These include:\n\n📝 Study Quiz — Answer academic questions\n⌨️ Typing Challenge — Type fast and accurately\n🧠 Memory Match — Find matching pairs\n⚡ Reaction Test — Test your reflexes\n\nDoing well in minigames gives you stat bonuses!",
            choices: [{ text: "Try a practice quiz!", next: 4, triggerMinigame: 'quiz' }]
        },
        {
            title: "💾 Saving & Settings",
            text: "Your game auto-saves regularly! You can also:\n\n• Save manually from the menu (☰)\n• Adjust difficulty, font size, and contrast\n• Export/import your save file\n• Change the color theme\n\nAccess settings from the menu or title screen.",
            choices: [{ text: "What about endings?", next: 5 }]
        },
        {
            title: "🏁 Multiple Endings",
            text: "The game has MANY different endings based on your stats and choices!\n\n🏆 Valedictorian — High academics, low stress\n🦋 Social Butterfly — High social and reputation\n🎸 The Rebel — Low reputation but happy\n⭐ Rising Star — Maximum reputation\n...and more!\n\nEvery playthrough can be different!",
            choices: [{ text: "I'm ready to play! 🚀", next: -1 }]
        }
    ],

    /* ---- Personality Starting Bonuses ---- */
    personalityBonuses: {
        outgoing: { social: 10, happiness: 5, energy: 5 },
        shy: { academics: 10, stress: -5, social: -5 },
        ambitious: { academics: 10, reputation: 5, stress: 5 },
        creative: { happiness: 10, social: 5, reputation: 5 },
        rebel: { reputation: -10, happiness: 10, stress: -5, social: 5 }
    },

    /* ---- Style Bonuses ---- */
    styleBonuses: {
        casual: { happiness: 3 },
        preppy: { academics: 3, reputation: 5 },
        punk: { reputation: -5, happiness: 5, social: 3 },
        athletic: { energy: 10 },
        artistic: { happiness: 5, social: 3 }
    }
};
