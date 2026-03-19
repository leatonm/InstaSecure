/**
 * NovaLink Security Training Simulator
 * Scoring utility for phishing awareness training
 */

// XP thresholds for each rank
export const RANKS = {
    NOVICE: { minXP: 0, title: 'Novice', icon: '🌱' },
    APPRENTICE: { minXP: 50, title: 'Apprentice', icon: '🛡️' },
    ANALYST: { minXP: 150, title: 'Security Analyst', icon: '🔍' },
    EXPERT: { minXP: 300, title: 'Security Expert', icon: '⭐' },
    ELITE: { minXP: 500, title: 'Elite Security Analyst', icon: '🏆' }
};

// Scoring events
export const SCORING_EVENTS = {
    QUICK_PASSWORD: { xp: 0, message: 'You submitted credentials too quickly! In real attacks, attackers create urgency to make you act without thinking.' },
    PASSWORD_ENTERED: { xp: -10, message: 'You entered a password. In real scenarios, never enter credentials on unexpected pages!' },
    PHONE_ENTERED: { xp: -10, message: 'You shared a phone number. This could be used for further attacks like SIM swapping.' },
    HESITATED_5SEC: { xp: 10, message: 'Good! You took time to think before proceeding.' },
    HESITATED_10SEC: { xp: 25, message: 'Great job! Taking time to evaluate is a key security habit.' },
    CANCELLED_EARLY: { xp: 50, message: 'Excellent! You recognized suspicious behavior and stopped.' },
    IDENTIFIED_URGENCY: { xp: 30, message: 'You identified the urgency tactic!' },
    IDENTIFIED_DOMAIN: { xp: 30, message: 'You caught the suspicious domain!' },
    IDENTIFIED_GENERIC: { xp: 30, message: 'You noticed the generic language!' }
};

/**
 * Calculate the user's score based on their actions
 * @param {Object} params - Scoring parameters
 * @param {number} params.timeToLogin - Time in ms to reach login page
 * @param {boolean} params.enteredPassword - Whether user entered a password
 * @param {number} params.timeToVerify - Time in ms to reach verify page
 * @param {boolean} params.enteredPhone - Whether user entered phone number
 * @param {number} params.timeToResult - Time in ms to reach result page
 * @returns {Object} Score breakdown with total XP and messages
 */
export function calculateScore({
    timeToLogin = 0,
    enteredPassword = false,
    timeToVerify = 0,
    enteredPhone = false,
    timeToResult = 0
}) {
    let totalXP = 0;
    const messages = [];
    const badges = [];

    // Time-based scoring for reaching login page
    if (timeToLogin < 3000) {
        totalXP += SCORING_EVENTS.QUICK_PASSWORD.xp;
        messages.push(SCORING_EVENTS.QUICK_PASSWORD.message);
    } else if (timeToLogin < 5000) {
        totalXP += SCORING_EVENTS.HESITATED_5SEC.xp;
        messages.push(SCORING_EVENTS.HESITATED_5SEC.message);
    } else if (timeToLogin >= 5000) {
        totalXP += SCORING_EVENTS.HESITATED_10SEC.xp;
        messages.push(SCORING_EVENTS.HESITATED_10SEC.message);
        badges.push('🧠 Thinker');
    }

    // Password entry scoring
    if (enteredPassword) {
        totalXP += SCORING_EVENTS.PASSWORD_ENTERED.xp;
        messages.push(SCORING_EVENTS.PASSWORD_ENTERED.message);
    }

    // Time-based scoring for reaching verify page
    if (timeToVerify < 2000 && enteredPassword) {
        totalXP += SCORING_EVENTS.QUICK_PASSWORD.xp;
    }

    // Phone entry scoring
    if (enteredPhone) {
        totalXP += SCORING_EVENTS.PHONE_ENTERED.xp;
        messages.push(SCORING_EVENTS.PHONE_ENTERED.message);
    }

    // Base XP for completing the simulation
    totalXP += 10;

    // Determine rank based on total XP
    const rank = getRank(totalXP);

    return {
        totalXP: Math.max(totalXP, 0),
        messages,
        badges,
        rank,
        timeToLogin,
        enteredPassword,
        enteredPhone
    };
}

/**
 * Get the user's rank based on XP
 * @param {number} xp - Total XP
 * @returns {Object} Rank information
 */
export function getRank(xp) {
    if (xp >= RANKS.ELITE.minXP) return RANKS.ELITE;
    if (xp >= RANKS.EXPERT.minXP) return RANKS.EXPERT;
    if (xp >= RANKS.ANALYST.minXP) return RANKS.ANALYST;
    if (xp >= RANKS.APPRENTICE.minXP) return RANKS.APPRENTICE;
    return RANKS.NOVICE;
}

/**
 * Calculate progress to next rank
 * @param {number} xp - Current XP
 * @returns {number} Progress percentage
 */
export function getRankProgress(xp) {
    const ranks = Object.values(RANKS);
    let currentRankIndex = 0;

    for (let i = 0; i < ranks.length; i++) {
        if (xp >= ranks[i].minXP) {
            currentRankIndex = i;
        }
    }

    const currentRank = ranks[currentRankIndex];
    const nextRank = ranks[Math.min(currentRankIndex + 1, ranks.length - 1)];

    if (currentRankIndex === ranks.length - 1) return 100;

    const progress = ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100;
    return Math.min(Math.round(progress), 100);
}
