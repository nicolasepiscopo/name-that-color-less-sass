require('./Footer.scss');

const React = require('react');

const Footer = () => {
    return (
        <footer className="footer">
            <div><a className="footer__link" target="_blank" href="https://github.com/nicolasepiscopo/name-that-color-less-sass">Name that color! LESS & SASS on Github</a></div>
            <div>Based on <a className="footer__link" target="_blank" href="http://chir.ag/projects/ntc/">ntc js</a></div>
        </footer>
    );
};

module.exports = Footer;
