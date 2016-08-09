require('./App.scss');

const React = require('react');
const { Component } = require('react');
const ntc = require('../../vendor/ntc/ntc');

const $ = document.querySelector;

class App extends Component {

    constructor(props) {
        super(props);

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    addHandleOnCopy() {
        document.addEventListener('copy', function(e){
            const colorName = $('#colorName').innerHTML;
            e.clipboardData.setData('text/plain', colorName);
            e.preventDefault();
        });
    }

    hashIfNeeded(colorCode) {
        if(colorCode && (colorCode[0] !== '#')){
            colorCode = '#' + colorCode;
        }
        return colorCode.toUpperCase();
    }

    saveUserPreferences(preferences) {
        localStorage.setItem(
            'preferences',
            JSON.stringify(preferences)
        );
    }

    loadUserPreferences() {
        var preferences = localStorage.getItem('preferences');
        if(preferences) {
            preferences = JSON.parse(preferences);
            loadUserPreferencesInView(preferences);
        }
    }

    showErrorMessage() {
        $('#error').style.display = 'block';
        $('#success').style.display = 'none';
    }

    showSuccessMessage() {
        $('#success').style.display = 'block';
        $('#error').style.display = 'none';
    }

    loadUserPreferencesInView(preferences) {
        $('input[value="' + preferences.format + '"]').checked = true;
    }

    validateCode(code) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(code);
    }

    getColorName(code) {
        const ntcResponse = ntc.name(code);
        const color = {
            rgb: ntcResponse[0],
            name: ntcResponse[1],
            exactmatch: ntcResponse[2]
        }

        return color.name.replace(' ', '-').toLowerCase();
    }

    handleOnSubmit(e) {
        e.preventDefault();

        const lessPrefix = '@';
        const sassPrefix = '$';
        const format = $('[name="format"]:checked') ? $('[name="format"]:checked').value : null;
        const hexaCode = $('#hexa-code') ? $('#hexa-code').value : null;
        const customCode = $('#custom-code') ? $('#custom-code').value : null;
        const colorCode = hashIfNeeded(hexaCode ? hexaCode : customCode);

        this.saveUserPreferences({
            format: format
        });

        let colorName;

        if(colorCode && validateCode(colorCode)) {
            colorName = this.getColorName(colorCode);

            if(format) {
                if(format === 'less'){
                    colorName = lessPrefix + colorName + '-color: ' + colorCode + ';';
                } else if(format === 'sass') {
                    colorName = sassPrefix + colorName + '-color: ' + colorCode + ';';
                }
            }

            $('#colorName').innerHTML = colorName;

            this.showSuccessMessage();

            document.execCommand('copy');
        } else {
            this.showErrorMessage();
        }
    }

    render () {
        this.loadUserPreferences();
        this.addHandleOnCopy();

        return (
            <div>
                <header class="color-names__title text-center">
                    Name that color! LESS & SASS
                </header>
                <section class="color-names__content">
                    <form name="colorForm" id="colorForm" class="color-form" onSubmit={this.handleOnSubmit}>
                        <div class="color-form__input-group">
                            <label for="format">LESS like format?</label>
                            <input type="radio" name="format" value="less" />
                        </div>
                        <div class="color-form__input-group">
                            <label for="format">SASS like format?</label>
                            <input type="radio" name="format" value="sass" />
                        </div>
                        <div class="color-form__input-group">
                            <label for="format">Thanks, only the name</label>
                            <input type="radio" name="format" value="none" />
                        </div>
                        <div class="color-form__input-group">
                            <label for="hexa-code">Color code</label>
                            <input type="text" autofocus placeholder="#FFFFFF" name="hexa-code" id="hexa-code" />
                        </div>
                        <div class="color-form__input-group">
                            <label for="custom-code">Pick custom color</label>
                            <input type="color" name="custom-code" id="custom-code" />
                        </div>
                        <div class="color-form__message color-form__message--success" id="success">
                            <div>Color name <span id="colorName" class="color-form__color-name"></span> copied to clipboard.
                            <span class="color-form__message--tip">"Ctrl + v" and paste it anywhere!</span></div>
                        </div>
                        <div class="color-form__message color-form__message--error" id="error">
                            <b>Error</b> Please provide a valid color code.
                        </div>
                        <div class="text-center">
                            <button class="color-form__submit-button" type="submit">
                                Name that color!
                            </button>
                        </div>
                    </form>
                </section>
                <footer class="color-names__footer">
                    <div><a target="_blank" href="https://github.com/nicolasepiscopo/name-that-color-less-sass">Name that color! LESS & SASS on Github</a></div>
                    <div>Based on <a target="_blank" href="http://chir.ag/projects/ntc/">ntc js</a></div>
                </footer>
            </div>
        );
    }
}

module.exports = App;