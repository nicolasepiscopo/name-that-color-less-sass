require('./Header.scss');

const React = require('react');

const Header = (props) => {
    return (
        <header className="color-names__title text-center">
            Name that color! LESS & SASS
        </header>
    );
}

module.exports = Header;