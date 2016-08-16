require('./SuccessMessage.scss');

const React = require('react');
const { PropTypes } = require('react');

const SuccessMessage = (props) => {
    return (
        <div className="success-message" id="success">
            {props.children}
        </div>
    );
};

SuccessMessage.propTypes = {
    children: PropTypes.any.isRequired
};

module.exports = SuccessMessage;
