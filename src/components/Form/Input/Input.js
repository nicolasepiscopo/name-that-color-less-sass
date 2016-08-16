require('./Input.scss');

const React = require('react');
const { PropTypes } = require('react');

class Input extends React.Component {
    render() {
        const {type, name, label, value, className, checked, placeholder, onChange, onKeyUp} = this.props;

        let classNames = 'input-group';
        if (className) {
            classNames = `${classNames} ${className}`;
        }

        return (
            <div className={classNames}>
                <label htmlFor={name} className="input-group__label">{label}</label>
                <input className="input-group__input" type={type} name={name} checked={checked} value={value} placeholder={placeholder} onChange={onChange} onKeyUp={onKeyUp} />
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};

module.exports = Input;
