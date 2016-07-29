'use strict';

(function() {
    loadUserPreferences();

    $e('#colorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var colorName;
        var lessPrefix = '@';
        var sassPrefix = '$';
        var format = $e('[name="format"]:checked') ? $e('[name="format"]:checked').value : null;
        var hexaCode = $e('#hexa-code') ? $e('#hexa-code').value : null;
        var customCode = $e('#custom-code') ? $e('#custom-code').value : null;

        saveUserPreferences({
            format: format
        });

        var colorCode = hashIfNeeded(hexaCode ? hexaCode : customCode);

        if(colorCode && validateCode(colorCode)) {
            colorName = getColorName(colorCode);

            if(format) {
                if(format === 'less'){
                    colorName = lessPrefix + colorName + '-color: ' + colorCode + ';';
                } else if(format === 'sass') {
                    colorName = sassPrefix + colorName + '-color: ' + colorCode + ';';
                }
            }

            $e('#colorName').innerHTML = colorName;

            showSuccessMessage();

            document.execCommand('copy');
        } else {
            showErrorMessage();
        }

    });

    document.addEventListener('copy', function(e){
        var colorName = $e('#colorName').innerHTML;
        e.clipboardData.setData('text/plain', colorName);
        e.preventDefault();
    });

    function hashIfNeeded(colorCode) {
        if(colorCode && (colorCode[0] !== '#')){
            colorCode = '#' + colorCode;
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
        var preferences = localStorage.getItem('preferences');
        if(preferences) {
            preferences = JSON.parse(preferences);
            loadUserPreferencesInView(preferences);
        }
    }

    function loadUserPreferencesInView(preferences) {
        // Check format
        $e('input[value="' + preferences.format + '"]').checked = true;
    }

    function validateCode(code) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(code);
    }

    function getColorName(code) {
        var ntcResponse = ntc.name(code);

        var color = {
            rgb: ntcResponse[0],
            name: ntcResponse[1],
            exactmatch: ntcResponse[2]
        }

        return color.name.replace(' ', '-').toLowerCase();
    }

    function $e(selector) {
        return document.querySelector(selector);
    }

    function showErrorMessage() {
        $e('#error').style.display = 'block';
        $e('#success').style.display = 'none';
    }

    function showSuccessMessage() {
        $e('#success').style.display = 'block';
        $e('#error').style.display = 'none';
    }

})();