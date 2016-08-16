'use strict';

function hashIfNeeded(colorCode) {
    if (colorCode && (colorCode[0] !== '#')) {
        return `#${colorCode}`.toUpperCase();
    }

    return colorCode.toUpperCase();
}

function saveUserPreferences(preferences) {
    localStorage.setItem(
        'preferences',
        JSON.stringify(preferences)
    );
}

function loadUserPreferences() {
    const preferences = localStorage.getItem('preferences');

    if (preferences) {
        return JSON.parse(preferences);
    }

    return false;
}

function validateCode(code) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(code);
}

module.exports = {
    hashIfNeeded,
    loadUserPreferences,
    saveUserPreferences,
    validateCode
};
