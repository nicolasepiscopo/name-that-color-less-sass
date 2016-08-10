require('./SuccessMessage.scss');

const React = require('react');
const { PropTypes } = require('react');

const SuccessMessage = (props) => {
    return (
        <div className="color-form__message color-form__message--error" id="error">
            {props.children}
        </div>
    );
}

SuccessMessage.PropTypes = {
    children: PropTypes.any.isRequired
}

module.exports = SuccessMessage;