require('./Form.scss');

const React = require('react');
const copyToClipboard = require('../../helpers/copyToClipboardHelper');
const {hashIfNeeded, saveUserPreferences, loadUserPreferences, validateCode} = require('../../helpers/appHelpers');
const Input = require('./Input/Input');
const ErrorMessage = require('../Message/ErrorMessage/ErrorMessage');
const SuccessMessage = require('../Message/SuccessMessage/SuccessMessage');

class Form extends React.Component {

    constructor(props) {
        super(props);

        const {format} = loadUserPreferences();

        this.state = {
            format: format || 'none',
            hexaCode: '',
            customCode: '#000000',
            colorName: '',
            status: {
                wasSent: false,
                hasErrors: false
            }
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnFormatChange = this.handleOnFormatChange.bind(this);
        this.handleOnColorCodeChange = this.handleOnColorCodeChange.bind(this);
        this.handleOnCustomCodeChange = this.handleOnCustomCodeChange.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.showSuccessMessage = this.showSuccessMessage.bind(this);
    }

    getColorName(code) {
        const ntc = window.ntc;
        const ntcResponse = ntc.name(code);
        const color = {
            rgb: ntcResponse[0],
            name: ntcResponse[1],
            exactmatch: ntcResponse[2]
        };

        return color.name.replace(' ', '-').toLowerCase();
    }

    showErrorMessage() {
        this.setState({
            status: {
                wasSent: true,
                hasErrors: true
            }
        });
    }

    showSuccessMessage() {
        this.setState({
            status: {
                wasSent: true,
                hasErrors: false
            }
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const lessPrefix = '@';
        const sassPrefix = '$';
        const {format, hexaCode, customCode} = this.state;
        const colorCode = hashIfNeeded(hexaCode ? hexaCode : customCode);

        saveUserPreferences({
            format
        });

        let colorName;

        if (colorCode && validateCode(colorCode)) {
            colorName = this.getColorName(colorCode);

            if (format) {
                if (format === 'less') {
                    colorName = lessPrefix + colorName + '-color: ' + colorCode + ';';
                } else if (format === 'sass') {
                    colorName = sassPrefix + colorName + '-color: ' + colorCode + ';';
                }
            }

            this.setState({
                colorName
            }, () => {
                copyToClipboard(this.state.colorName);
            });

            this.showSuccessMessage();
        } else {
            this.showErrorMessage();
        }
    }

    handleOnFormatChange(e) {
        const element = e.target;
        const {value: format} = element;

        this.setState({
            format
        });
    }

    handleOnColorCodeChange(e) {
        const {value: hexaCode} = e.target;

        this.setState({
            hexaCode
        });
    }

    handleOnCustomCodeChange(e) {
        const {value: customCode} = e.target;

        this.setState({
            customCode,
            hexaCode: customCode
        });
    }

    render() {
        const {status, colorName} = this.state;

        let message;

        if (status.hasErrors) {
            message = (
                <ErrorMessage>
                    <b>Error</b> Please provide a valid color code.
                </ErrorMessage>
            );
        } else if (status.wasSent) {
            message = (
                <SuccessMessage>
                    <div>Color name <span className="form__tip">{colorName}</span> copied to clipboard.
                    <span className="form__tip">"Ctrl + v" and paste it anywhere!</span></div>
                </SuccessMessage>
            );
        }

        return (
            <form name="colorForm" className="form" onSubmit={this.handleOnSubmit}>

                <Input type="radio" name="format" value="less" checked={this.state.format === 'less'} label="LESS like format?" onChange={this.handleOnFormatChange} />
                <Input type="radio" name="format" value="sass" checked={this.state.format === 'sass'} label="SASS like format?" onChange={this.handleOnFormatChange} />
                <Input type="radio" name="format" value="none" checked={this.state.format === 'none'} label="Thanks, only the name" onChange={this.handleOnFormatChange} />

                <Input type="text" name="color-code" value={this.state.hexaCode} placeholder="#FFFFFF" label="Color code" onKeyUp={this.handleOnColorCodeChange} />
                <Input type="color" name="custom-code" label="Pick custom color" onChange={this.handleOnCustomCodeChange} />

                {message}

                <div className="text-center">
                    <button className="form__submit-button" type="submit">
                        Name that color!
                    </button>
                </div>
            </form>
        );
    }
}

module.exports = Form;
