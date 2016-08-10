require('./Form.scss');

const React = require('react');

const ntc = require('../../vendor/ntc/ntc');

const SuccessMessage = require('../Message/SuccessMessage/SuccessMessage');
const ErrorMessage = require('../Message/ErrorMessage/ErrorMessage');
const Input = require('./Input/Input');

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colorForm: {
                format: '',
                hexaCode: '',
                customCode: '',
                status: {
                    wasSent: false,
                    hasErrors: false
                }

            }
        }

        this.buildMessage = this.buildMessage.bind(this);
    }

    buildMessage() {
        if(this.state.colorForm.status.hasErrors) {
            return (
                <ErrorMessage>
                    <b>Error</b> Please provide a valid color code.
                </ErrorMessage>
            );
        } else if(this.state.colorForm.status.wasSent) {
            return (
                <SuccessMessage>
                    <div>Color name <span id="colorName" className="color-form__color-name"></span> copied to clipboard.
                    <span className="color-form__message--tip">"Ctrl + v" and paste it anywhere!</span></div>
                </SuccessMessage>
            );
        }
    }

    /*
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
    */

    render() {

        return (
            <form name="colorForm" className="color-form" onSubmit={this.handleOnSubmit}>

                <Input type='radio' name='format' value='less' label='LESS like format?' />
                <Input type='radio' name='format' value='sass' label='SASS like format?' />
                <Input type='radio' name='format' value='none' label='Thanks, only the name' />

                <Input type='text' name='color-code' placeholder='#FFFFFF' label='Color code' />
                <Input type='color' name='custom-code' label='Pick custom color' />

                {this.buildMessage}

                <div className="text-center">
                    <button className="color-form__submit-button" type="submit">
                        Name that color!
                    </button>
                </div>
            </form>
        );
    }
}

module.exports = Form;