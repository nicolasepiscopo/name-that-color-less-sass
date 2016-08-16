require('./ErrorMessage.scss');

const React = require('react');
const { PropTypes } = require('react');

const ErrorMessage = (props) => {
    return (
        <div className="error-message" id="error">
            {props.children}
        </div>
    );
};

ErrorMessage.propTypes = {
    children: PropTypes.any.isRequired
};

module.exports = ErrorMessage;
