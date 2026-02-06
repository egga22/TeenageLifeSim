/* =============================================
   STORY — Branching narrative engine
   ============================================= */

const Story = {

    /* ---- Main story nodes ---- */
    nodes: {

        /* ==================== DAY 1 ==================== */
        day1_wake: {
            text: "🌅 *BEEP BEEP BEEP*\n\nYour alarm blares at 6:30 AM. First day at Westbrook High School.\n\nYour stomach churns with a mix of excitement and dread. Today everything changes.",
            speaker: null,
            effects: {},
            choices: [
                { text: "🏃 Jump out of bed, ready to conquer the day!", effects: { energy: -5, happiness: 10 }, next: 'day1_breakfast', hint: '+Happiness, -Energy' },
                { text: "😴 Hit snooze... five more minutes won't hurt", effects: { energy: 10, stress: 5 }, next: 'day1_late', hint: '+Energy, but risky...' },
                { text: "📱 Check phone for messages first", effects: { social: 3 }, next: 'day1_phone', hint: '+Social' }
            ]
        },

        day1_breakfast: {
            text: "You bound downstairs with surprising enthusiasm. The smell of toast fills the kitchen.",
            speaker: 'parent',
            dialogue: "\"Well, look who's up early! Breakfast is ready. Nervous about your first day?\"",
            choices: [
                { text: "\"I'm excited! This is going to be great!\"", effects: { happiness: 5, energy: 5 }, next: 'day1_school_arrive', hint: '+Happiness' },
                { text: "\"A little nervous, honestly...\"", effects: { stress: -5 }, next: 'day1_school_arrive', hint: '-Stress (honesty helps!)' },
                { text: "\"Whatever. It's just school.\"", effects: { reputation: -3 }, next: 'day1_school_arrive', hint: '-Reputation' }
            ]
        },

        day1_late: {
            text: "You hit snooze THREE times. By the time you realize, it's already 7:15!\n\nYou throw on clothes, grab a granola bar, and sprint to the bus stop.\n\nYou BARELY make it — the bus driver gives you a look as you stumble aboard, breathing hard.",
            effects: { stress: 10, energy: -10 },
            choices: [
                { text: "Find a seat and try to catch your breath", effects: {}, next: 'day1_bus', hint: 'Play it cool' },
                { text: "Apologize to the bus driver", effects: { reputation: 3 }, next: 'day1_bus', hint: '+Reputation' }
            ]
        },

        day1_phone: {
            text: "You check your phone. A few notifications:\n\n📱 Alex Chen: \"yo!! first day!! u ready?? 😤🔥\"\n📱 Group chat — \"Westbrook Class of 2026\" (47 unread)\n📱 Mom: \"Don't forget your lunch money! Love you! 💕\"",
            choices: [
                { text: "Reply to Alex with enthusiasm", effects: { social: 5 }, next: 'day1_breakfast', hint: '+Social' },
                { text: "Browse the class group chat", effects: { social: 3, stress: 3 }, next: 'day1_breakfast', hint: '+Social, +Stress (comparison anxiety)' },
                { text: "Put phone away and get ready", effects: { energy: 5 }, next: 'day1_breakfast', hint: '+Energy (focused start)' }
            ]
        },

        day1_bus: {
            text: "On the bus, you spot a few familiar faces and a LOT of strangers. The noise is overwhelming — everyone's talking, laughing, shouting.\n\nYou see an empty seat next to a person with bright headphones, bobbing their head to music.",
            choices: [
                { text: "Sit next to headphones person and say hi", effects: { social: 8 }, next: 'day1_meet_riley', hint: '+Social (make a new friend!)' },
                { text: "Find a quiet seat in the back alone", effects: { energy: 5, stress: -5 }, next: 'day1_school_arrive', hint: '+Energy, -Stress' },
                { text: "Look for Alex", effects: { social: 5 }, next: 'day1_alex_bus', hint: '+Social' }
            ]
        },

        day1_meet_riley: {
            text: "You slide into the seat. The person pulls off their headphones and looks at you with a warm smile.",
            speaker: 'riley',
            dialogue: "\"Hey! I'm Riley. You look as lost as I feel. First day too?\"\n\nYou chat about music, art, and the terrifying prospect of high school. Riley is really cool.",
            effects: { social: 5 },
            choices: [
                { text: "\"Want to hang out at lunch?\"", effects: { social: 10 }, next: 'day1_school_arrive', hint: '+Social (friend made!)' },
                { text: "\"Nice meeting you! See you around\"", effects: { social: 3 }, next: 'day1_school_arrive', hint: '+Social' }
            ],
            onEnter: () => { Achievements.unlock('first_friend'); }
        },

        day1_alex_bus: {
            text: "You spot Alex in the middle of the bus, waving frantically.",
            speaker: 'alex',
            dialogue: "\"THERE you are! Dude, I saved you a seat! This is gonna be EPIC. I heard the science teacher does actual explosions!\"\n\nAlex's enthusiasm is infectious. Some things never change.",
            effects: { happiness: 5 },
            choices: [
                { text: "\"I heard the food here is awful though...\"", effects: { happiness: -3 }, next: 'day1_school_arrive', hint: 'Pessimistic' },
                { text: "\"Let's make this the best year ever!\"", effects: { happiness: 10 }, next: 'day1_school_arrive', hint: '+Happiness' }
            ]
        },

        day1_school_arrive: {
            text: "🏫 Westbrook High School towers before you. Students flood through the main entrance like a river of backpacks and anxiety.\n\nA banner reads: \"WELCOME NEW STUDENTS! 🎉\"\n\nThe hallways are a maze of lockers, classrooms, and social hierarchies you're about to learn the hard way.",
            effects: {},
            choices: [
                { text: "📋 Head straight to homeroom (responsible)", effects: { academics: 5, reputation: 3 }, next: 'day1_homeroom', hint: '+Academics, +Reputation' },
                { text: "👀 Explore the school first", effects: { stress: -3 }, next: 'day1_explore', hint: '-Stress (get your bearings)' },
                { text: "📱 Find the popular crowd and introduce yourself", effects: { social: 5, stress: 5 }, next: 'day1_meet_jordan', hint: '+Social, +Stress (intimidating!)' }
            ]
        },

        day1_explore: {
            text: "You wander the halls, taking it all in. You discover:\n\n🎭 The drama department — posters for auditions everywhere\n🔬 The science wing — something smells like chemicals\n🏋️ The gym — already echoing with bouncing basketballs\n📚 The library — quiet, cozy, and inviting\n🎨 The art room — splattered with paint in the best way\n\nA sign catches your eye: \"CLUB FAIR — FRIDAY! Find your people!\"",
            effects: { stress: -5 },
            choices: [
                { text: "Head to homeroom before you're late!", effects: { academics: 3 }, next: 'day1_homeroom' },
                { text: "Check out the library", effects: { academics: 5, energy: 5 }, next: 'day1_library' },
                { text: "Peek into the art room", effects: { happiness: 5 }, next: 'day1_artroom' }
            ]
        },

        day1_library: {
            text: "The library is a haven of calm in the chaos. Towering shelves of books, comfy reading chairs, and the gentle hum of quiet conversation.\n\nYou notice someone with thick glasses meticulously organizing flashcards at a table.",
            speaker: 'sam',
            dialogue: "\"Oh! Sorry, am I in your way? I'm Sam. I was just... pre-studying. Is that weird? That's probably weird.\"",
            effects: { academics: 3 },
            choices: [
                { text: "\"That's actually really smart. Mind if I study too?\"", effects: { academics: 10, social: 8 }, next: 'day1_homeroom', hint: '+Academics, +Social (study buddy!)' },
                { text: "\"Ha, nerd. Just kidding. I'm [name].\"", effects: { social: 3 }, next: 'day1_homeroom', hint: '+Social' },
                { text: "Smile politely and move on", effects: {}, next: 'day1_homeroom' }
            ]
        },

        day1_artroom: {
            text: "The art room is a wonderland of color. Paintings line the walls, sculptures sit on shelves, and the scent of acrylic paint fills the air.\n\nA student is already here, working on a large canvas. It's actually... really good.",
            speaker: 'riley',
            dialogue: "\"Oh hey! You again! Couldn't resist the art room either, huh? Wanna see what I'm working on?\"",
            effects: { happiness: 5 },
            choices: [
                { text: "\"Wow, you're really talented!\"", effects: { social: 10, happiness: 5 }, next: 'day1_homeroom', hint: '+Social, +Happiness' },
                { text: "\"Can you teach me sometime?\"", effects: { social: 8, happiness: 3 }, next: 'day1_homeroom', hint: '+Social, +Happiness' }
            ]
        },

        day1_meet_jordan: {
            text: "You spot a group of well-dressed students near the main entrance, laughing loudly. One of them — tall, confident, and impossibly cool — notices you.",
            speaker: 'jordan',
            dialogue: "\"Hey there, new face! I'm Jordan. Welcome to Westbrook.\"\n\nJordan extends a hand. The group watches you like predators assessing prey. No pressure.",
            effects: {},
            choices: [
                { text: "Shake hands confidently — \"Thanks! I'm [name].\"", effects: { social: 10, reputation: 8, stress: 5 }, next: 'day1_homeroom', hint: '+Social, +Reputation, +Stress' },
                { text: "Wave awkwardly and mumble your name", effects: { social: 3, stress: -3 }, next: 'day1_homeroom', hint: '+Social, -Stress' },
                { text: "\"Cool. Is homeroom this way?\" (Play it cool)", effects: { reputation: 5 }, next: 'day1_homeroom', hint: '+Reputation' }
            ]
        },

        day1_homeroom: {
            text: "🔔 The bell rings. You find your homeroom — Room 204.\n\nMs. Chen stands at the front, already radiating authority. The room buzzes with nervous energy.\n\nShe scans the room with sharp eyes.",
            speaker: 'teacher_ms_chen',
            dialogue: "\"Welcome to Westbrook High. I'm Ms. Chen, your English teacher and homeroom advisor. This year will challenge you, inspire you, and — if you let it — change you. Now, let's see who's actually paying attention...\"",
            effects: { stress: 5 },
            choices: [
                { text: "📝 Sit up straight and take notes", effects: { academics: 8, reputation: 5 }, next: 'day1_class_choice', hint: '+Academics, +Reputation' },
                { text: "💭 Daydream and look out the window", effects: { happiness: 3, academics: -5 }, next: 'day1_class_choice', hint: '+Happiness, -Academics' },
                { text: "📱 Sneak a peek at your phone under the desk", effects: { social: 3, academics: -3, reputation: -5 }, next: 'day1_caught_phone', hint: '+Social, -Academics, -Reputation (risky!)' }
            ]
        },

        day1_caught_phone: {
            text: "You try to be subtle, but Ms. Chen has eagle eyes.",
            speaker: 'teacher_ms_chen',
            dialogue: "\"I see we have someone who thinks their social life is more important than English literature. Would you like to share what's so fascinating on that screen?\"\n\nThe entire class turns to look at you. Your face burns.",
            effects: { reputation: -10, stress: 15, happiness: -10 },
            choices: [
                { text: "\"Sorry, Ms. Chen. It won't happen again.\"", effects: { reputation: 3 }, next: 'day1_class_choice', hint: 'Apologize (+Reputation)' },
                { text: "Try to laugh it off", effects: { social: 3, reputation: -3 }, next: 'day1_class_choice', hint: 'Risky...' }
            ]
        },

        day1_class_choice: {
            text: "After homeroom, you check your schedule. You have some choices for your elective period.",
            effects: {},
            choices: [
                { text: "🔬 Science Lab with Mr. Garcia", effects: { academics: 10 }, next: 'day1_science', hint: '+Academics', triggerMinigame: 'quiz' },
                { text: "🎨 Art Class", effects: { happiness: 10, social: 5 }, next: 'day1_lunch', hint: '+Happiness, +Social' },
                { text: "🏋️ Gym / P.E.", effects: { energy: -10, happiness: 5, stress: -5 }, next: 'day1_gym', hint: '-Energy, +Happiness, -Stress' }
            ]
        },

        day1_science: {
            text: "Mr. Garcia's science class is everything Alex promised and more.",
            speaker: 'teacher_mr_garcia',
            dialogue: "\"Welcome, future scientists! Today we're going to prove that learning can be EXPLOSIVE! But first — a little quiz to see what you already know. Don't worry, it's just for fun!\"\n\nHe winks. It's definitely not just for fun.",
            effects: {},
            choices: [
                { text: "Continue to lunch", effects: {}, next: 'day1_lunch' }
            ]
        },

        day1_gym: {
            text: "P.E. is exactly as intense as you feared. Coach Miller wastes no time.",
            speaker: 'morgan',
            dialogue: "\"Come on, push it! The name's Morgan — I'm captain of track. You've got decent form. Ever thought about joining a team?\"\n\nMorgan seems impressed, which feels... nice.",
            effects: { social: 5 },
            choices: [
                { text: "\"Maybe I will! When are tryouts?\"", effects: { social: 5, energy: -5 }, next: 'day1_lunch', hint: '+Social' },
                { text: "\"I'm more of an indoor person...\"", effects: { happiness: 3 }, next: 'day1_lunch' },
                { text: "\"I'll think about it\"", effects: {}, next: 'day1_lunch' }
            ]
        },

        day1_lunch: {
            text: "🍽️ LUNCH TIME.\n\nThe cafeteria is a battlefield of social dynamics. You grab your tray and scan the room.\n\nYou spot several open seats:\n• With Alex and some friendly-looking people\n• At Jordan's popular table (they wave you over!)\n• An empty table in the corner\n• With Sam, who's reading alone",
            effects: {},
            choices: [
                { text: "🤝 Sit with Alex (safe and comfortable)", effects: { happiness: 10, social: 5 }, next: 'day1_lunch_alex' },
                { text: "😎 Sit with Jordan's group (exciting but risky)", effects: { reputation: 10, social: 8, stress: 8 }, next: 'day1_lunch_jordan' },
                { text: "🐺 Sit alone (recharge)", effects: { energy: 10, stress: -10, social: -5 }, next: 'day1_afternoon' },
                { text: "📚 Sit with Sam (study buddy)", effects: { academics: 5, social: 5 }, next: 'day1_lunch_sam' }
            ]
        },

        day1_lunch_alex: {
            text: "You slide in next to Alex. Instantly comfortable.",
            speaker: 'alex',
            dialogue: "\"YES! Best seat in the house! Okay so I already heard gossip — apparently there's going to be a huge party this weekend. Jordan Rivera is hosting. EVERYONE is talking about it.\"\n\nAlex leans in conspiratorially.\n\n\"Should we try to go? It could be our big break socially!\"",
            effects: {},
            choices: [
                { text: "\"A party? On the first week? I'm in!\"", effects: { social: 5, stress: 5 }, next: 'day1_afternoon', hint: 'Sets up party event' },
                { text: "\"I don't know... we barely know anyone\"", effects: { stress: -3 }, next: 'day1_afternoon' },
                { text: "\"Let's focus on not failing first\"", effects: { academics: 3 }, next: 'day1_afternoon' }
            ]
        },

        day1_lunch_jordan: {
            text: "You walk over to the popular table. Conversations pause. All eyes on you.",
            speaker: 'jordan',
            dialogue: "\"Hey, you actually came over! Nice. Everyone, this is the new kid I was telling you about.\"\n\nJordan introduces you to the group. They seem... mostly welcoming. One person eyes you suspiciously.\n\n\"So, are you coming to my party this Saturday? It's going to be legendary.\"",
            effects: {},
            choices: [
                { text: "\"Wouldn't miss it for the world!\"", effects: { social: 10, reputation: 10, stress: 8 }, next: 'day1_afternoon' },
                { text: "\"Maybe, I'll see how the week goes\"", effects: { reputation: 5 }, next: 'day1_afternoon' },
                { text: "\"Parties aren't really my thing\"", effects: { reputation: -5, stress: -5 }, next: 'day1_afternoon' }
            ]
        },

        day1_lunch_sam: {
            text: "You sit across from Sam, who looks up from a massive textbook, surprised.",
            speaker: 'sam',
            dialogue: "\"Oh! Hi! Are you... sitting here? With me? That's— that's really nice. Nobody usually...\"\n\nSam smiles shyly.\n\n\"Do you want to study together sometime? I have notes for EVERY subject already. Is that weird? I feel like that's weird.\"",
            effects: { social: 3, academics: 5 },
            choices: [
                { text: "\"That's not weird, that's impressive! Let's study together\"", effects: { academics: 10, social: 8 }, next: 'day1_afternoon', hint: '+Academics, +Social' },
                { text: "\"Sure, sounds good!\"", effects: { academics: 5, social: 5 }, next: 'day1_afternoon' },
                { text: "\"Maybe. I need to figure out my schedule first.\"", effects: {}, next: 'day1_afternoon' }
            ]
        },

        day1_afternoon: {
            text: "🔔 The final bell rings. Day 1 is in the books!\n\nAs you gather your things, you feel... different. The school is starting to feel a little less foreign.\n\nYou have a few options for your after-school time:",
            effects: {},
            choices: [
                { text: "📚 Go home and study", effects: { academics: 10, energy: -5, stress: 5 }, next: 'day1_evening', hint: '+Academics' },
                { text: "🏃 Check out the sports fields", effects: { energy: -10, happiness: 5, social: 5 }, next: 'day1_evening', hint: '-Energy, +Happiness, +Social' },
                { text: "🎮 Go home and relax", effects: { happiness: 10, energy: 10, stress: -10 }, next: 'day1_evening', hint: '+Happiness, +Energy, -Stress' },
                { text: "🛍️ Visit the school store", effects: { money: -5 }, next: 'day1_shop', hint: 'Buy something useful?' }
            ]
        },

        day1_shop: {
            text: "📦 SCHOOL STORE\n\nYou browse the items available:",
            effects: {},
            choices: GameData.shopItems.slice(0, 4).map(item => ({
                text: `${item.name} ($${item.cost}) — ${item.desc}`,
                effects: { ...item.effect, money: -item.cost },
                next: 'day1_evening',
                hint: `Costs $${item.cost}`,
                requiresMoney: item.cost
            })).concat([{ text: "Never mind, head home", effects: {}, next: 'day1_evening' }])
        },

        day1_evening: {
            text: "🌙 Evening falls. You're in your room, thinking about the day.\n\nYour phone buzzes with new messages and friend requests. High school is... a lot.\n\nBut there's also this spark of possibility. Tomorrow is a new day, and you're starting to find your place.",
            speaker: 'parent',
            dialogue: "\"How was your first day, sweetheart?\"",
            effects: {},
            choices: [
                { text: "\"It was great! I think I'm going to like it here.\"", effects: { happiness: 5 }, next: 'day1_end' },
                { text: "\"It was okay. Overwhelming, honestly.\"", effects: { stress: -5 }, next: 'day1_end' },
                { text: "\"I don't want to talk about it.\"", effects: { stress: 3, social: -3 }, next: 'day1_end' }
            ],
            onEnter: () => { Achievements.unlock('first_day'); }
        },

        day1_end: {
            text: "You set your alarm for tomorrow and crawl into bed.\n\nDay 1 is complete. 📅\n\n💤 You drift off to sleep, dreaming of what tomorrow will bring...",
            effects: { energy: 30, stress: -10 },
            choices: [
                { text: "➡️ Continue to Day 2", effects: {}, next: 'day2_morning', advanceDay: true }
            ]
        },

        /* ==================== DAY 2 ==================== */
        day2_morning: {
            text: "🌅 Day 2 — Tuesday\n\nYou wake up to your alarm. Second day. The novelty has worn off slightly, replaced by the routine of real life.\n\nBut something is different today — there's a buzz in the air. You check your phone and see the school group chat exploding.",
            effects: { energy: -5 },
            randomEvent: true,
            choices: [
                { text: "📱 Read the group chat", effects: { social: 5, stress: 3 }, next: 'day2_drama' },
                { text: "🚿 Get ready and head out", effects: { energy: 5 }, next: 'day2_class' },
                { text: "📚 Review notes from yesterday before school", effects: { academics: 8 }, next: 'day2_class', triggerMinigame: 'typing' }
            ]
        },

        day2_drama: {
            text: "The group chat is ON FIRE:\n\n💬 \"OMG did you hear about the drama between Morgan and Jordan??\"\n💬 \"They were arguing in the parking lot!! 😱\"\n💬 \"Something about the party this weekend...\"\n💬 \"Pick a side... 👀\"\n\nSchool politics already? This could affect your social standing...",
            effects: { stress: 5 },
            choices: [
                { text: "🤝 Side with Jordan (the popular choice)", effects: { reputation: 10, social: 5 }, next: 'day2_class', hint: '+Reputation (but burns a bridge)' },
                { text: "🏃 Side with Morgan (the loyal choice)", effects: { social: 10 }, next: 'day2_class', hint: '+Social (respect earned)' },
                { text: "🙈 Stay out of it (the safe choice)", effects: { stress: -5 }, next: 'day2_class', hint: '-Stress (no enemies)' },
                { text: "🕊️ Try to mediate", effects: { social: 8, reputation: 8, stress: 8 }, next: 'day2_class', hint: '+Social, +Reputation, +Stress (risky but admirable)' }
            ]
        },

        day2_class: {
            text: "📝 Classes today feel more real. The teachers aren't going easy anymore.\n\nMs. Chen assigns a major essay due next week. Mr. Garcia announces a lab practical. And there's a math test on Thursday.\n\nThe workload is starting to pile up...",
            effects: { stress: 8, academics: 3 },
            choices: [
                { text: "📚 Buckle down and study hard", effects: { academics: 10, energy: -10, stress: 5 }, next: 'day2_lunch', triggerMinigame: 'quiz' },
                { text: "🧠 Study smart — make a plan", effects: { academics: 8, stress: -5 }, next: 'day2_lunch' },
                { text: "🤷 Meh, I'll deal with it later", effects: { happiness: 5, academics: -5 }, next: 'day2_lunch' }
            ]
        },

        day2_lunch: {
            text: "🍽️ Lunch again. The cafeteria dynamics are already evolving.\n\nYou notice Casey from drama club performing dramatically at their table. A crowd watches, half-amused, half-annoyed.",
            speaker: 'casey',
            dialogue: "\"And THEN she said — wait, hold on — \" Casey spots you. \"HEY! You! New kid! You've got a great face for drama! Auditions are THURSDAY! You HAVE to come!\"",
            effects: {},
            choices: [
                { text: "🎭 \"That sounds fun! I'll be there!\"", effects: { social: 8, happiness: 5, stress: 5 }, next: 'day2_afternoon' },
                { text: "😅 \"I'll... think about it\"", effects: { social: 3 }, next: 'day2_afternoon' },
                { text: "🙅 \"Not really my thing, sorry\"", effects: { social: -3 }, next: 'day2_afternoon' }
            ]
        },

        day2_afternoon: {
            text: "After school, you have some free time. The club fair is coming up on Friday, but there are also other things calling your attention.\n\nAlex messages you: \"Study session at my place? 📚\"\nJordan posts: \"Party prep squad needed! Who's in? 🎉\"\nThe library closes at 5 PM.",
            effects: {},
            choices: [
                { text: "📚 Study with Alex", effects: { academics: 10, social: 5, energy: -5 }, next: 'day2_evening', triggerMinigame: 'memory' },
                { text: "🎉 Help Jordan with party prep", effects: { social: 12, reputation: 8, academics: -5 }, next: 'day2_evening' },
                { text: "📖 Go to the library alone", effects: { academics: 8, energy: 5, stress: -5 }, next: 'day2_evening' },
                { text: "🎮 Go home and decompress", effects: { happiness: 10, energy: 10, stress: -10 }, next: 'day2_evening' }
            ]
        },

        day2_evening: {
            text: "🌙 Another evening. You're settling into a rhythm.\n\nYour parent checks in on you again. They look concerned about something.",
            speaker: 'parent',
            dialogue: "\"Honey, I noticed your grades tracker... you know we expect you to maintain at least a B average, right? I'm not trying to pressure you, but college applications are closer than you think.\"\n\nThat familiar knot of pressure tightens in your stomach.",
            effects: { stress: 8 },
            choices: [
                { text: "\"I know. I'll work harder, I promise.\"", effects: { academics: 5, stress: 5, happiness: -5 }, next: 'day2_end' },
                { text: "\"Can you just trust me? I've got this.\"", effects: { stress: -3 }, next: 'day2_end' },
                { text: "\"The pressure doesn't help, you know.\"", effects: { stress: -8 }, next: 'day2_end', hint: 'Honest conversation (-Stress)' }
            ]
        },

        day2_end: {
            text: "Another day done. Two down.\n\nAs you lie in bed, you think about the web of relationships forming around you. Every choice seems to ripple outward.\n\n💤 Sleep well...",
            effects: { energy: 25, stress: -5 },
            choices: [
                { text: "➡️ Continue to Day 3", effects: {}, next: 'day3_morning', advanceDay: true }
            ]
        },

        /* ==================== DAY 3 ==================== */
        day3_morning: {
            text: "🌅 Day 3 — Wednesday (Hump Day!)\n\nHalfway through the first week. You're starting to recognize faces, remember names, and navigate the halls without getting lost.\n\nBut Wednesday brings a surprise...",
            effects: { energy: -3 },
            randomEvent: true,
            choices: [
                { text: "What's the surprise?", effects: {}, next: 'day3_surprise' }
            ]
        },

        day3_surprise: {
            text: "📢 Principal Thompson's voice booms over the PA system:",
            speaker: 'principal',
            dialogue: "\"Good morning, Westbrook! I'm excited to announce our annual SPIRIT WEEK starts next Monday! We need volunteers to help organize. And remember — the Spring Talent Show auditions are also coming up!\n\nAlso, a reminder that academic integrity is paramount. We've had reports of cheating. Don't be that person.\"",
            effects: {},
            choices: [
                { text: "🎉 Volunteer for Spirit Week!", effects: { social: 10, reputation: 8, energy: -5 }, next: 'day3_class', hint: '+Social, +Reputation, -Energy' },
                { text: "🎤 Consider the talent show", effects: { happiness: 5 }, next: 'day3_class', hint: '+Happiness (potential)' },
                { text: "Focus on classes today", effects: { academics: 5 }, next: 'day3_class' }
            ]
        },

        day3_class: {
            text: "In class, Mr. Garcia announces something exciting:",
            speaker: 'teacher_mr_garcia',
            dialogue: "\"Alright everyone! Today we're doing a HANDS-ON experiment! Lab partners assigned randomly. Let's see... you're with Sam Taylor. Lucky you — Sam's brilliant!\"\n\nSam turns beet red but manages a shy wave.",
            effects: {},
            choices: [
                { text: "High-five Sam and get to work!", effects: { social: 8, academics: 8 }, next: 'day3_midday', triggerMinigame: 'quiz' },
                { text: "Do most of the work yourself", effects: { academics: 5, energy: -8 }, next: 'day3_midday' },
                { text: "Let Sam take the lead", effects: { academics: 3, energy: 5 }, next: 'day3_midday' }
            ]
        },

        day3_midday: {
            text: "Between classes, you notice something concerning in the hallway.\n\nA bigger student is cornering a younger kid near the lockers. Nobody else seems to be stepping in.",
            effects: {},
            choices: [
                { text: "🦸 Step in and confront the bully", effects: { reputation: 15, stress: 15, social: 5 }, next: 'day3_stood_up', hint: '+Reputation, +Stress (brave!)', isTimed: true },
                { text: "📱 Quietly tell a teacher", effects: { reputation: 5, academics: 3 }, next: 'day3_lunch', hint: 'Smart move (+Reputation)' },
                { text: "😞 Keep walking... not your problem", effects: { stress: 5, happiness: -5 }, next: 'day3_lunch', hint: 'Guilt lingers...' }
            ]
        },

        day3_stood_up: {
            text: "Your heart pounds as you step forward.\n\n\"Hey! Leave them alone.\"\n\nThe bully turns, surprised. For a tense moment, you think it might escalate. But then the bully laughs nervously, mutters \"whatever,\" and walks away.\n\nThe younger student looks at you with wide, grateful eyes.\n\n\"Thank you... nobody ever does that.\"\n\nWord spreads fast. By lunch, everyone knows what you did.",
            effects: { reputation: 10, happiness: 10, stress: -5 },
            choices: [
                { text: "Continue to lunch (feeling good)", effects: { happiness: 5 }, next: 'day3_lunch' }
            ]
        },

        day3_lunch: {
            text: "🍽️ Lunch. The cafeteria buzzes with mid-week energy.\n\nMultiple people wave you over today. You're becoming... known.",
            effects: {},
            choices: [
                { text: "Mix it up — sit with someone new", effects: { social: 8 }, next: 'day3_afternoon' },
                { text: "Stick with your usual group", effects: { happiness: 5, social: 3 }, next: 'day3_afternoon' },
                { text: "🛍️ Skip lunch and visit the school store", effects: { energy: -5, money: 0 }, next: 'day3_store' }
            ]
        },

        day3_store: {
            text: "📦 SCHOOL STORE\n\nToday's selection:",
            effects: {},
            choices: GameData.shopItems.slice(0, 6).map(item => ({
                text: `${item.name} ($${item.cost}) — ${item.desc}`,
                effects: { ...item.effect, money: -item.cost },
                next: 'day3_afternoon',
                hint: `Costs $${item.cost}`,
                requiresMoney: item.cost
            })).concat([{ text: "Just browsing, head back", effects: {}, next: 'day3_afternoon' }])
        },

        day3_afternoon: {
            text: "After school, the club fair posters are EVERYWHERE. Friday is going to be big.\n\nBut today, you have a DIFFICULT decision. Alex and Sam BOTH asked you to hang out, but at the same time. You can only choose one.",
            effects: {},
            choices: [
                { text: "🤝 Hang with Alex (loyalty to old friends)", effects: { social: 8, happiness: 5 }, next: 'day3_evening' },
                { text: "📚 Study with Sam (invest in new friendship)", effects: { academics: 10, social: 5 }, next: 'day3_evening' },
                { text: "⚡ Try to do both (stretch yourself thin)", effects: { social: 5, academics: 3, energy: -15, stress: 10 }, next: 'day3_evening', hint: 'Risky! -Energy, +Stress' },
                { text: "🏠 Go home alone (self-care)", effects: { energy: 10, stress: -10, happiness: 5 }, next: 'day3_evening' }
            ]
        },

        day3_evening: {
            text: "🌙 Wednesday evening. The week is flying by.\n\nYou think about who you're becoming at Westbrook. Every choice shapes you.\n\nThere's a math test tomorrow. Are you ready?",
            effects: {},
            choices: [
                { text: "📚 Study hard for the test!", effects: { academics: 12, energy: -10, stress: 5 }, next: 'day3_end', triggerMinigame: 'quiz' },
                { text: "📱 Scroll social media instead", effects: { happiness: 3, social: 3, academics: -5 }, next: 'day3_end' },
                { text: "💤 Get an early night (rest up)", effects: { energy: 15, stress: -5 }, next: 'day3_end' }
            ]
        },

        day3_end: {
            text: "Day 3 complete. The halfway point.\n\nYou can feel your high school identity taking shape. Who will you become?\n\n💤 Goodnight...",
            effects: { energy: 20, stress: -5 },
            choices: [
                { text: "➡️ Continue to Day 4", effects: {}, next: 'day4_morning', advanceDay: true }
            ]
        },

        /* ==================== DAY 4 ==================== */
        day4_morning: {
            text: "🌅 Day 4 — Thursday\n\nTwo more days until the weekend. The week has been a whirlwind.\n\nToday: MATH TEST. Plus, drama auditions if Casey convinced you.\n\nYour stress levels determine how you feel walking in...",
            effects: { energy: -3 },
            randomEvent: true,
            choices: [
                { text: "📝 Head to the math test (ready or not)", effects: { stress: 10 }, next: 'day4_test', triggerMinigame: 'quiz' },
                { text: "🤢 Consider faking sick to skip the test", effects: { stress: -10, academics: -15, reputation: -5 }, next: 'day4_skip', hint: '-Academics, -Reputation (consequences!)' }
            ]
        },

        day4_skip: {
            text: "You tell your parent you don't feel well. They look at you skeptically but let you stay home.\n\nYou spend the day in bed, but the guilt is real. You'll have to make up the test, and it'll be HARDER.\n\nSometimes avoiding problems only makes them worse.",
            effects: { happiness: -5, stress: 10, energy: 15 },
            choices: [
                { text: "Ugh... this was a mistake", effects: { stress: 5 }, next: 'day4_evening' },
                { text: "At least I got some rest", effects: { energy: 10 }, next: 'day4_evening' }
            ]
        },

        day4_test: {
            text: "📝 MATH TEST TIME.\n\nMs. Chen passes out the papers. Your palms are sweating. You open the test booklet and...\n\n...it's actually not as bad as you feared! The questions from the study session look familiar.",
            effects: {},
            choices: [
                { text: "Continue", effects: {}, next: 'day4_after_test' }
            ]
        },

        day4_after_test: {
            text: "The test is DONE. Relief washes over you like a wave.\n\nAs you leave the classroom, you overhear two students whispering about getting the answers beforehand. Cheating.\n\nThis is a moral crossroads. What do you do?",
            effects: { stress: -5 },
            choices: [
                { text: "🔔 Report them to the teacher", effects: { reputation: -5, academics: 5, stress: 5 }, next: 'day4_lunch', hint: 'Right thing, but social cost' },
                { text: "🤐 Mind your own business", effects: {}, next: 'day4_lunch' },
                { text: "💬 Confront them directly", effects: { reputation: 5, social: -3, stress: 8 }, next: 'day4_lunch', hint: 'Bold move' }
            ]
        },

        day4_lunch: {
            text: "🍽️ Lunch. Thursday means pizza day, and the cafeteria is actually decent for once.\n\nBig decision time: Jordan's party is Saturday. Confirmed attendees are growing. The FOMO is real.\n\nBut so is the essay due Monday.",
            effects: { happiness: 5 },
            choices: [
                { text: "🎉 Commit to the party! YOLO!", effects: { social: 10, happiness: 8, stress: 5 }, next: 'day4_afternoon' },
                { text: "📚 Skip the party, focus on the essay", effects: { academics: 10, social: -5, stress: -5 }, next: 'day4_afternoon' },
                { text: "🤔 Plan to do both — party first, essay Sunday", effects: { stress: 8 }, next: 'day4_afternoon', hint: 'Ambitious plan...' }
            ]
        },

        day4_afternoon: {
            text: "After school, the drama club auditions are happening in the auditorium. Even if you didn't plan to audition, you can watch.\n\nCasey is performing on stage — actually really talented. The drama teacher nods approvingly.",
            speaker: 'casey',
            dialogue: "Casey spots you in the audience. \"YOU CAME! Get up here! We need people for the ensemble! No experience necessary!\"",
            effects: {},
            choices: [
                { text: "🎭 Jump on stage! Why not?", effects: { social: 10, happiness: 10, stress: 8 }, next: 'day4_audition', hint: '+Social, +Happiness, +Stress' },
                { text: "👏 Stay in the audience and cheer", effects: { social: 3, happiness: 3 }, next: 'day4_evening' },
                { text: "🚶 Leave quietly", effects: {}, next: 'day4_evening' }
            ]
        },

        day4_audition: {
            text: "You step on stage. The lights are blinding. Your heart races.\n\nThe drama teacher hands you a script. \"Just read this monologue. Be yourself... but LOUDER.\"\n\nYou take a deep breath and begin...\n\nSurprisingly, you don't completely bomb it! Casey gives you a standing ovation (they give everyone standing ovations, but still).",
            effects: { happiness: 15, social: 8, reputation: 5 },
            choices: [
                { text: "That was actually... fun?", effects: { happiness: 5 }, next: 'day4_evening' }
            ]
        },

        day4_evening: {
            text: "🌙 Thursday evening. Tomorrow is the CLUB FAIR, and then the weekend.\n\nYou feel the weight of the week on your shoulders, but also a growing sense of belonging.\n\nYour phone lights up with group chat notifications, homework reminders, and memes. This is high school.",
            effects: {},
            choices: [
                { text: "📚 Work on the essay tonight", effects: { academics: 10, energy: -10, stress: 5 }, next: 'day4_end', triggerMinigame: 'typing' },
                { text: "💬 Catch up with friends online", effects: { social: 8, happiness: 5 }, next: 'day4_end' },
                { text: "💤 Early bed — big day tomorrow", effects: { energy: 15, stress: -8 }, next: 'day4_end' }
            ]
        },

        day4_end: {
            text: "One more school day to go! The first week is almost over.\n\nYou set your alarm, feeling like you've aged a year in four days.\n\n💤 Sweet dreams...",
            effects: { energy: 20, stress: -5 },
            choices: [
                { text: "➡️ Continue to Day 5 (Friday!)", effects: {}, next: 'day5_morning', advanceDay: true }
            ]
        },

        /* ==================== DAY 5 (FRIDAY) ==================== */
        day5_morning: {
            text: "🌅 Day 5 — FRIDAY! 🎉\n\nThe energy at school is completely different. It's Friday energy. Everyone's talking about the weekend, Jordan's party, and the CLUB FAIR happening today after school.\n\nEven the teachers seem more relaxed (slightly).",
            effects: { happiness: 10 },
            randomEvent: true,
            choices: [
                { text: "🎉 Ride the Friday vibes!", effects: { happiness: 5, social: 3 }, next: 'day5_classes' },
                { text: "📚 Stay focused — grades matter more than vibes", effects: { academics: 5 }, next: 'day5_classes' }
            ]
        },

        day5_classes: {
            text: "Classes feel shorter today. Maybe it's the Friday effect.\n\nMs. Chen reminds everyone about the essay due Monday. Mr. Garcia does a fun experiment. Everything feels... lighter.\n\nBut then you get called to the guidance counselor's office.",
            effects: { stress: 8 },
            choices: [
                { text: "😰 Go nervously (what did I do?!)", effects: { stress: 5 }, next: 'day5_counselor' },
                { text: "🤷 Go casually (probably nothing)", effects: {}, next: 'day5_counselor' }
            ]
        },

        day5_counselor: {
            text: "The guidance counselor, Mrs. Parker, is warm and friendly.\n\n\"Don't worry, you're not in trouble! I just like to check in with all new students during their first week.\n\nHow are you adjusting? Any concerns? Remember, my door is always open.\"",
            effects: { stress: -10 },
            choices: [
                { text: "\"Everything's great! I love it here.\"", effects: { happiness: 5 }, next: 'day5_clubfair' },
                { text: "\"It's been overwhelming, honestly.\"", effects: { stress: -10 }, next: 'day5_clubfair', hint: 'Opening up helps!' },
                { text: "\"I'm worried about balancing everything.\"", effects: { stress: -8, academics: 3 }, next: 'day5_clubfair', hint: 'Good self-awareness' }
            ]
        },

        day5_clubfair: {
            text: "🎪 THE CLUB FAIR!\n\nThe gymnasium is transformed into a carnival of extracurriculars. Booths everywhere, music playing, students recruiting.\n\nThis is YOUR moment to choose your path. Which club will define your high school experience?\n\n⚽ Sports Club — Morgan waves you over\n🎭 Drama Club — Casey is literally dragging people to their booth  \n🔬 Science Club — Sam has prepared a POSTER PRESENTATION\n🎵 Music Club — Instruments and jamming\n🎨 Art Club — Riley's displaying their work\n🎮 Gaming Club — Competitive gaming setup",
            effects: {},
            choices: [
                { text: "⚽ Join Sports Club", effects: { energy: -5, social: 8, happiness: 5 }, next: 'day5_joined_club', clubJoin: 'sports' },
                { text: "🎭 Join Drama Club", effects: { social: 10, happiness: 8 }, next: 'day5_joined_club', clubJoin: 'drama' },
                { text: "🔬 Join Science Club", effects: { academics: 10, social: 5 }, next: 'day5_joined_club', clubJoin: 'science' },
                { text: "🎵 Join Music Club", effects: { happiness: 10, social: 8 }, next: 'day5_joined_club', clubJoin: 'music' },
                { text: "🎨 Join Art Club", effects: { happiness: 8, social: 5 }, next: 'day5_joined_club', clubJoin: 'art' },
                { text: "🎮 Join Gaming Club", effects: { happiness: 8, stress: -5, social: 8 }, next: 'day5_joined_club', clubJoin: 'gaming' }
            ],
            onEnter: () => { Achievements.unlock('club_member'); }
        },

        day5_joined_club: {
            text: "🎉 You're officially in!\n\nSigning up feels like a commitment, but a good one. You're not just a face in the crowd anymore — you BELONG somewhere.\n\nThe club fair wraps up and reality sets in: Jordan's party is TOMORROW.",
            effects: { happiness: 10 },
            choices: [
                { text: "🎉 Get ready for the party weekend!", effects: { happiness: 5, social: 5, stress: 5 }, next: 'day5_evening' },
                { text: "📚 Head home to work on the essay", effects: { academics: 8, stress: 3 }, next: 'day5_evening' },
                { text: "😴 This week exhausted me — heading home to rest", effects: { energy: 10, stress: -8 }, next: 'day5_evening' }
            ]
        },

        day5_evening: {
            text: "🌙 Friday evening. Week 1 is DONE!\n\nAs you sit in your room, you realize how much has changed in just five days. New friends, new challenges, new identity.\n\nThe weekend stretches ahead full of possibilities... and consequences.\n\n📊 Let's see how your first week went!",
            effects: { energy: 20, stress: -5 },
            choices: [
                { text: "📊 View my final stats and ending", effects: {}, next: '_ENDING' }
            ]
        },

        /* ==================== SANDBOX NODES ==================== */
        sandbox_start: {
            text: "🏖️ SANDBOX MODE — Free Play!\n\nNo story constraints, no deadlines, no pressure. Explore all the options and see what happens.\n\nWhat would you like to do?",
            effects: {},
            choices: [
                { text: "📚 Study (Academics +15)", effects: { academics: 15, energy: -5 }, next: 'sandbox_start', triggerMinigame: 'quiz' },
                { text: "👥 Socialize (+15 Social)", effects: { social: 15, energy: -3 }, next: 'sandbox_start' },
                { text: "😴 Rest (+20 Energy, -10 Stress)", effects: { energy: 20, stress: -10 }, next: 'sandbox_start' },
                { text: "🎮 Play Minigame", effects: {}, next: 'sandbox_minigame' },
                { text: "🛍️ Shop", effects: {}, next: 'sandbox_shop' },
                { text: "📊 Check Stats & End", effects: {}, next: '_ENDING' }
            ]
        },

        sandbox_minigame: {
            text: "Choose a minigame to play:",
            effects: {},
            choices: [
                { text: "📝 Study Quiz", effects: {}, next: 'sandbox_start', triggerMinigame: 'quiz' },
                { text: "⌨️ Typing Challenge", effects: {}, next: 'sandbox_start', triggerMinigame: 'typing' },
                { text: "🧠 Memory Match", effects: {}, next: 'sandbox_start', triggerMinigame: 'memory' },
                { text: "⚡ Reaction Test", effects: {}, next: 'sandbox_start', triggerMinigame: 'reaction' },
                { text: "🧺 Catch Game", effects: {}, next: 'sandbox_start', triggerMinigame: 'catch' },
                { text: "🔙 Back", effects: {}, next: 'sandbox_start' }
            ]
        },

        sandbox_shop: {
            text: "📦 SHOP — Buy items to boost your stats!",
            effects: {},
            choices: GameData.shopItems.map(item => ({
                text: `${item.name} ($${item.cost}) — ${item.desc}`,
                effects: { ...item.effect, money: -item.cost },
                next: 'sandbox_start',
                requiresMoney: item.cost
            })).concat([{ text: "🔙 Back", effects: {}, next: 'sandbox_start' }])
        },

        /* ==================== SPEED RUN NODES ==================== */
        speedrun_start: {
            text: "⏱️ SPEED RUN MODE!\n\nComplete a full week as fast as possible. Choices are timed!\n\nReady?",
            effects: {},
            choices: [
                { text: "GO!", effects: {}, next: 'day1_wake', isTimed: true }
            ]
        },

        /* ==================== RANDOM CHALLENGE ==================== */
        random_start: {
            text: "🎲 RANDOM CHALLENGE!\n\nYour character, choices, and events are all randomized. Survive the chaos!\n\nRandomizing your stats...",
            effects: {},
            onEnter: () => {
                if (Game && Game.player && Game.player.stats) {
                    Game.player.stats.academics = Utils.randInt(10, 90);
                    Game.player.stats.social = Utils.randInt(10, 90);
                    Game.player.stats.energy = Utils.randInt(20, 100);
                    Game.player.stats.stress = Utils.randInt(0, 80);
                    Game.player.stats.happiness = Utils.randInt(20, 90);
                    Game.player.stats.reputation = Utils.randInt(10, 90);
                    Game.player.money = Utils.randInt(0, 50);
                    Game.updateStatsUI();
                }
            },
            choices: [
                { text: "Let chaos begin! 🎲", effects: {}, next: 'day1_wake' }
            ]
        },

        /* ==================== WHAT-IF MODE ==================== */
        whatif_start: {
            text: "📊 WHAT-IF SIMULATOR\n\nReplay key decision points and see how different choices affect your outcomes.\n\nChoose a scenario to explore:",
            effects: {},
            choices: [
                { text: "🤝 The Bully Encounter", effects: {}, next: 'day3_midday' },
                { text: "🍽️ The Lunch Table Decision", effects: {}, next: 'day1_lunch' },
                { text: "🎭 Drama Auditions", effects: {}, next: 'day4_afternoon' },
                { text: "🎪 Club Fair", effects: {}, next: 'day5_clubfair' },
                { text: "🔙 Back to Menu", effects: {}, next: '_TITLE' }
            ]
        }
    },

    /* Get a story node by ID */
    getNode(nodeId) {
        return this.nodes[nodeId] || null;
    },

    /* Get processed text (replace [name] with player name) */
    processText(text) {
        if (!Game || !Game.player) return text;
        return text
            .replace(/\[name\]/g, Utils.escapeHtml(Game.player.name))
            .replace(/\[they\]/g, Utils.pronoun('subject'))
            .replace(/\[them\]/g, Utils.pronoun('object'))
            .replace(/\[their\]/g, Utils.pronoun('possessive'))
            .replace(/\[themselves\]/g, Utils.pronoun('reflexive'));
    }
};
