require('./Input.scss');

const React = require('react');
const { PropTypes } = require('react');

const Input = (props) => {

    const { type, name, label, value, className, placeholder, onChange } = props;

    let classNames = 'color-form__input-group';
    if(className) {
        classNames = `${classNames} ${className}`
    }

    function handleOnChange(e) {
        if(onChange)
            onChange(e.target.value);
    }

    return (
        <div className={classNames}>
            <label for={name}>{label}</label>
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={handleOnChange} />
        </div>
    );
}

Input.PropTypes = {
    type: PropTypes.str,
    name: PropTypes.str,
    label: PropTypes.str,
    value: PropTypes.str,
    className: PropTypes.str,
    placeholder: PropTypes.str,
    onChange: PropTypes.func
}

module.exports = Input;