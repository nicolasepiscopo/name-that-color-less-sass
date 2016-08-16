require('./App.scss');

const React = require('react');

const Header = require('../Header/Header');
const Footer = require('../Footer/Footer');
const Form = require('../Form/Form');

const App = () => (
    <div className="app">
        <Header />
        <section className="app__content">
            <Form />
        </section>
        <Footer />
    </div>
);

module.exports = App;
