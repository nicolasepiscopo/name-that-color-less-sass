require('./ErrorMessage.scss');

const React = require('react');
const { PropTypes } = require('react');

const ErrorMessage = (props) => {
    return (
        <div className="color-form__message color-form__message--error" id="error">
            {props.children}
        </div>
    );
}

ErrorMessage.PropTypes = {
    children: PropTypes.any.isRequired
}

module.exports = ErrorMessage;